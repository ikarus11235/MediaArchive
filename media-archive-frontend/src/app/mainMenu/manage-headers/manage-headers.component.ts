import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MediaDataServiceService } from '../../services/media-data-service.service';
import { forkJoin, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

interface TreeNode {
  id: number;
  name: string;
  type: 'header' | 'season' | 'episode' | 'picture';
  thumbNailPath?: string;
  logo?: string;
  children?: TreeNode[];
}

@Component({
  selector: 'app-manage-headers',
  standalone: false,
  templateUrl: './manage-headers.component.html',
  styleUrl: './manage-headers.component.scss'
})
export class ManageHeadersComponent implements OnInit {
  renameFormOpenNode: TreeNode | null = null;
  newName: string = '';

  private readonly mediaDataService = inject(MediaDataServiceService);
  router = inject(Router);

  dataSource: TreeNode[] = [];
  selectedNodeKeys = new Set<string>();

  ngOnInit(): void {
    this.loadTree();
  }

  switchRenameForm(node: TreeNode): void {
    if (this.renameFormOpenNode === node) {
      this.renameFormOpenNode = null;
      this.newName = '';
      return;
    }

    this.renameFormOpenNode = node;
    this.newName = node.name;
  }

  backToHeaders(): void {
    this.router.navigate(['/headers']);
  }

  deleteNode(node: TreeNode): void {
    //console.log(node);
    this.mediaDataService.deleteApiNode(node.type, node.id).subscribe({
      next: () => {
        this.loadTree();
      },
      error: (error) => {
        console.error(`Failed to delete ${node.type}`, error);
      }
    });
  }

  isNodeSelected(node: TreeNode): boolean {
    return this.selectedNodeKeys.has(this.nodeKey(node));
  }

  toggleNodeSelection(node: TreeNode): void {
    const key = this.nodeKey(node);
    if (this.selectedNodeKeys.has(key)) {
      this.selectedNodeKeys.delete(key);
    } else {
      this.selectedNodeKeys.add(key);
    }
  }

  deleteSelectedNodes(): void {
    const nodesToDelete = this.getSelectedNodesWithoutSelectedAncestors();
    if (nodesToDelete.length === 0) {
      return;
    }

    forkJoin(nodesToDelete.map(node =>
      this.mediaDataService.deleteApiNode(node.type, node.id).pipe(
        map(() => ({ node, success: true })),
        catchError(error => {
          console.error(`Failed to delete ${node.type}`, error);
          return of({ node, success: false });
        })
      )
    )).subscribe(results => {
      results
        .filter(result => result.success)
        .forEach(result => this.clearSelectionForSubtree(result.node));
      this.loadTree();
    });
  }

  private clearSelectionForSubtree(node: TreeNode): void {
    this.selectedNodeKeys.delete(this.nodeKey(node));
    node.children?.forEach(child => this.clearSelectionForSubtree(child));
  }

  private getSelectedNodesWithoutSelectedAncestors(): TreeNode[] {
    const selectedNodes: TreeNode[] = [];
    const visit = (nodes: TreeNode[], selectedAncestor = false): void => {
      nodes.forEach(node => {
        const selected = this.isNodeSelected(node);
        if (selected && !selectedAncestor) {
          selectedNodes.push(node);
        }
        visit(node.children ?? [], selectedAncestor || selected);
      });
    };

    visit(this.dataSource);
    return selectedNodes;
  }

  private nodeKey(node: TreeNode): string {
    return `${node.type}:${node.id}`;
  }

  renameNode(node: TreeNode, newName: string): void {
    console.log(node, newName);
    const renameRequest = node.type === 'header'
      ? this.mediaDataService.renameApiHeader({
        id: node.id,
        title: newName,
        thumbNailPath: node.thumbNailPath ?? '',
        logo: node.logo ?? ''
      })
      : this.mediaDataService.renameApiNode(node.type, node.id, newName);

    renameRequest.subscribe({
      next: () => {
        this.loadTree();
      },
      error: (error) => {
        console.error(`Failed to rename ${node.type}`, error);
      }
    });
    this.renameFormOpenNode = null;
    this.newName = '';
  }

  childrenAccessor = (node: TreeNode) => node.children ?? [];

  hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;

  expansionKey = (node: TreeNode) => this.nodeKey(node);

  private loadTree(): void {
    this.mediaDataService.getApiHeader().pipe(
      switchMap(headers => {
        if (headers.length === 0) {
          return of([] as TreeNode[]);
        }

        return forkJoin(
          headers.map(header =>
            this.mediaDataService.getApiSeason(header.id).pipe(
              switchMap(seasons => {
                if (seasons.length === 0) {
                  return of({
                    id: header.id,
                    name: header.title,
                    type: 'header' as const,
                    thumbNailPath: header.thumbNailPath,
                    logo: header.logo,
                    children: []
                  });
                }

                return forkJoin(
                  seasons.map(season =>
                    this.mediaDataService.getApiEpisodes(season.id).pipe(
                      switchMap(episodes => {
                        if (episodes.length === 0) {
                          return of({
                            id: season.id,
                            name: season.title,
                            type: 'season' as const,
                            children: []
                          });
                        }

                        return forkJoin(
                          episodes.map(episode =>
                            this.mediaDataService.getApiPicturesByEpisodesId(episode.id).pipe(
                              map(pictures => ({
                                id: episode.id,
                                name: `${episode.episodeSign} - ${episode.title}`,
                                type: 'episode' as const,
                                children: pictures.map(picture => ({
                                  id: picture.id,
                                  name: picture.imagePath.split('/').pop() ?? picture.imagePath,
                                  type: 'picture' as const
                                }))
                              }))
                            )
                          )
                        ).pipe(
                          map(episodeNodes => ({
                            id: season.id,
                            name: season.title,
                            type: 'season' as const,
                            children: episodeNodes
                          }))
                        );
                      })
                    )
                  )
                ).pipe(
                  map(seasonNodes => ({
                    id: header.id,
                    name: header.title,
                    type: 'header' as const,
                    thumbNailPath: header.thumbNailPath,
                    logo: header.logo,
                    children: seasonNodes
                  }))
                );
              })
            )
          )
        );
      })
    ).subscribe(tree => {
      this.dataSource = tree;
    });
  }
}
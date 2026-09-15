import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MediaDataServiceService } from '../../services/media-data-service.service';
import { forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

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
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MediaDataServiceService } from '../../services/media-data-service.service';
import { forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

interface TreeNode {
  id: number;
  name: string;
  type: 'header' | 'season' | 'episode' | 'picture';
  children?: TreeNode[];
}

@Component({
  selector: 'app-manage-headers',
  standalone: false,
  templateUrl: './manage-headers.component.html',
  styleUrl: './manage-headers.component.scss'
})
export class ManageHeadersComponent implements OnInit {
  private readonly mediaDataService = inject(MediaDataServiceService);
  router = inject(Router);

  dataSource: TreeNode[] = [];

  ngOnInit(): void {
    this.loadTree();
  }

  backToHeaders(): void {
    this.router.navigate(['/headers']);
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
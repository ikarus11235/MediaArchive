import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaDataServiceService } from '../../services/media-data-service.service';
import { Episode } from '../../interface/episode';
import { Picture } from '../../interface/picture';

@Component({
  selector: 'app-show-video',
  standalone: false,
  templateUrl: './show-video.component.html',
  styleUrl: './show-video.component.scss'
})
export class ShowVideoComponent implements OnInit {
  displayedEpisode: Episode | any;
  dispayedPictures: Picture[] | any;
  private route = inject(ActivatedRoute); 
  private router = inject(Router);

  episodeId = signal('');
  private activatedRoute = inject(ActivatedRoute);

  constructor(private mediaService: MediaDataServiceService) {
    this.activatedRoute.params.subscribe((params) => {
      this.episodeId.set(params['id']);
    })
  }

  normalizePublicPath(path: string): string {
    if (!path) {
      return '';
    }

    const normalized = path.replace(/\\/g, '/').trim().replace(/\/\/+/, '/');

    if (normalized.startsWith('/personal/')) {
      return normalized.replace(/\/\/+/, '/');
    }

    return `/${normalized.replace(/^\/+/, '')}`;
  }

  ngOnInit(): void {
    let initId = parseInt(this.episodeId())
    this.mediaService.getApiEpisodeById(initId).subscribe(episode => {
      this.displayedEpisode = {
        ...episode,
        videoPath: this.normalizePublicPath(episode.videoPath)
      };
    });

    this.mediaService.getApiPicturesByEpisodesId(initId).subscribe(pictures => {
      this.dispayedPictures = (pictures ?? []).map((picture) => ({
        ...picture,
        imagePath: this.normalizePublicPath(picture.imagePath)
      }));
    });

  }

  navigateToSeasons(id: number){
    this.mediaService.getApiHeaderBySeasonId(id).subscribe(header => {
      this.router.navigate(['/season', header.id]);
      console.log('Back to header ', header);
    });

  }

  navigateToGallery(id: number){
    this.router.navigate(['/gallery', id])
  }

  showImagesDialog = false;

openImagesDialog(): void {
  this.showImagesDialog = true;
}

closeImagesDialog(): void {
  this.showImagesDialog = false;
}

saveImages(files: File[]): void {

  console.log(files);
  let pictureArray: Picture[] = [];
  
  files.forEach(element => {
    const fileName = element.name;
    pictureArray.push({
      id: 0,
      imagePath: fileName,
      episode: this.displayedEpisode.id
    });
  });
  
  console.log(pictureArray);

  this.mediaService.postApiPictures(pictureArray).subscribe({
    next: (createdPicture) => {
      console.log('Pictures created', createdPicture);
    },
    error: (err) => {
      console.error(err);
    }
  })

  this.showImagesDialog = false;
}

}

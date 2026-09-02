import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaDataServiceService } from '../../services/media-data-service.service';

@Component({
  selector: 'app-show-gallery',
  standalone: false,
  templateUrl: './show-gallery.component.html',
  styleUrl: './show-gallery.component.scss',
})
export class ShowGalleryComponent {
  displayedPictures: any[] = [];
  pictureIndex: number = 0;

  episodeId = signal('');
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  constructor(private mediaService: MediaDataServiceService){
    this.activatedRoute.params.subscribe((params) => {
      this.episodeId.set(params['id']);
    })
  }

  ngOnInit(): void {
    let initId = parseInt(this.episodeId());

    this.mediaService.getApiPicturesByEpisodesId(initId).subscribe(pictures => {
      this.displayedPictures = (pictures ?? []).map((picture) => ({
        ...picture,
        imagePath: this.normalizeImagePath(picture.imagePath)
      }));
      this.pictureIndex = this.displayedPictures.length ? 0 : 0;
    });

  }

  normalizeImagePath(path: string): string {
    if (!path) {
      return '';
    }

    const normalized = path.replace(/\\/g, '/').trim();
    return normalized.startsWith('/') ? normalized : `/${normalized}`;
  }

  navigateToEpisode(){
    let initId = parseInt(this.episodeId());
    this.router.navigate(['/episode', initId]);
  }

  incrementPictureIndex(): void {
    if (!this.displayedPictures.length) {
      return;
    }

    if (this.pictureIndex >= this.displayedPictures.length - 1) {
      this.pictureIndex = 0;
    } else {
      this.pictureIndex = this.pictureIndex + 1;
    }
  }

  decrementPictureIndex(): void {
    if (!this.displayedPictures.length) {
      return;
    }

    if (this.pictureIndex <= 0) {
      this.pictureIndex = this.displayedPictures.length - 1;
    } else {
      this.pictureIndex = this.pictureIndex - 1;
    }
  }

}

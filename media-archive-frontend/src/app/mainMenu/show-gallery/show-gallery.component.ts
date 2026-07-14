import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaDataServiceService } from '../../services/media-data-service.service';

@Component({
  selector: 'app-show-gallery',
  standalone: false,
  templateUrl: './show-gallery.component.html',
  styleUrl: './show-gallery.component.scss'
})
export class ShowGalleryComponent {
  displayedPictures: Headers[] | any;

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
      this.displayedPictures = pictures;
    });

  }

  navigateToEpisode(){
    let initId = parseInt(this.episodeId());
    this.router.navigate(['/episode', initId]);
  }

}

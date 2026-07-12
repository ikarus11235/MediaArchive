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

  ngOnInit(): void {
    let initId = parseInt(this.episodeId())
    this.mediaService.getApiEpisodeById(initId).subscribe(episode => {
      this.displayedEpisode = episode;
    });

    this.mediaService.getApiPicturesByEpisodesId(initId).subscribe(pictures => {
      this.dispayedPictures = pictures;
    });

  }

  navigateToSeasons(id: number){
    this.router.navigate(['/season', id]);
  }

}

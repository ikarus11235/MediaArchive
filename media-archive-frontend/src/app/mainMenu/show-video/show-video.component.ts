import { Component, inject, Input, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MediaDataServiceService } from '../../services/media-data-service.service';

@Component({
  selector: 'app-show-video',
  standalone: false,
  templateUrl: './show-video.component.html',
  styleUrl: './show-video.component.scss'
})
export class ShowVideoComponent {
  @Input() id: number = 0;
  @Input() episodeSign: string = '';
  @Input() seasonId: number = 0;
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() videoPath: string = '';

  episodeId = signal('');
  private activatedRoute = inject(ActivatedRoute);

  constructor(private mediaService: MediaDataServiceService) {
    this.activatedRoute.params.subscribe((params) => {
      this.episodeId.set(params['id']);
    })
  }



}

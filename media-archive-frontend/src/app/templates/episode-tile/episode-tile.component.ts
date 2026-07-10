import { Component, inject, Input, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-episode-tile',
  standalone: false,
  templateUrl: './episode-tile.component.html',
  styleUrl: './episode-tile.component.scss'
})
export class EpisodeTileComponent {
  @Input() id: number = 0;
  @Input() episodeSign: string = '';
  @Input() title: string  = '';

  headerId = signal('');
  private activatedRoute = inject(ActivatedRoute);

  private route = inject(ActivatedRoute); 
  private router = inject(Router);


    navigateToEpisode(id: number){
    this.router.navigate(['/episode', id]);
  }

  
}

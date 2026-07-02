import { Component, Input } from '@angular/core';

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


  greet(): void {
    console.log('Greet...');
  }

  
}

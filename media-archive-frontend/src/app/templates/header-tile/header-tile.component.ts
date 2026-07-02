import { Component, inject, Input } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-header-tile',
  standalone: false,
  templateUrl: './header-tile.component.html',
  styleUrl: './header-tile.component.scss'
})
export class HeaderTileComponent {
  @Input() title: string  = '';
  @Input() thumbNailPath: string  = '';
  @Input() headerId: number = 0;

  private route = inject(ActivatedRoute); 
  private router = inject(Router);


  pickTile(id: number) {
    console.log('Tile clicked: ' + id)
  }

  navigateToSeasons(id: number){
    this.router.navigate(['/season', id]);
  }
}

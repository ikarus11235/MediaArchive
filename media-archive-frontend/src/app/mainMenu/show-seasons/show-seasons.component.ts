import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaDataServiceService } from '../../services/media-data-service.service';
import { Season } from '../../interface/season';
import { Episode } from '../../interface/episode';

@Component({
  selector: 'app-show-seasons',
  standalone: false,
  templateUrl: './show-seasons.component.html',
  styleUrl: './show-seasons.component.scss'
})
export class ShowSeasonsComponent implements OnInit{
  headerId = signal('');
  displayedTitle: string = 'My Title...';
  displayedSeasons: Season[] | any;
  displayedEpisodes: Episode[] | any;
  private activatedRoute = inject(ActivatedRoute);

  private route = inject(ActivatedRoute); 
  private router = inject(Router);

  showSeasonDialog = false;

  constructor(private mediaService: MediaDataServiceService) {
    this.activatedRoute.params.subscribe((params) => {
      this.headerId.set(params['id']);
    })
  }
  
  ngOnInit(): void {
    let searchedHeaderId = parseInt(this.headerId());
    this.mediaService.getApiSeason(searchedHeaderId).subscribe(seasons => {
      this.displayedSeasons = seasons;
    });

    this.mediaService.getApiEpisodes(1).subscribe(episodes => {
      this.displayedEpisodes = episodes;
    });

    this.mediaService.getApiHeader().subscribe(headers => {
      headers.forEach(header => {
        if (header.id === searchedHeaderId) {
          this.displayedTitle = header.title;
          
        }
      });
    });
  }

  renderEpisodes(seasonId: number): void{
    this.mediaService.getApiEpisodes(seasonId).subscribe(episodes => {
      this.displayedEpisodes = episodes;
    });
  }

  navigateToHeaders(){
    this.router.navigate(['/headers']);
  }

  openSeasonDialog() {
  this.showSeasonDialog = true;
}

closeSeasonDialog() {
  this.showSeasonDialog = false;
}

createSeason(data: any) {

  console.log(data);

  // Hier Season speichern

  this.showSeasonDialog = false;
}


  greet(id: number): void {
    console.log(id);
  }

  getFakeTitle(): string {
    return 'The Title ...';
  }

  getFakeSeason(): Season[]{
    return this.mediaService.getTestSeason();
  }

  getFakeEpisodes(): Episode[]{
    return this.mediaService.getTestEpisodes();
  }

  getHeaderId(){
    console.log(this.headerId());
  }



}

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
  displayedSeasons: Season[] = [];
  selectedSeasonId: number = 1;
  displayedEpisodes: Episode[] = [];
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
      console.log(this.displayedSeasons);
      if (this.displayedSeasons.length != 0 && this.displayedSeasons[0].episodes != null) {
        this.displayedEpisodes = this.displayedSeasons[0].episodes;
      }
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
    this.selectedSeasonId = seasonId;
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

createSeason(event: { title: string; episodes: File[] }) {
  let searchedHeaderId = parseInt(this.headerId());
  console.log(event);

  let episodeArray: Episode[] = [];
  event.episodes.forEach(element => {
    episodeArray.push({
      id: 0,
      description: '',
      episodeSign: '',
      seasonId: this.selectedSeasonId,
      title: element.name,
      videoPath: element.name
    });
  });

  // Hier Season speichern
  const newSeason: Season = {
      id: 0,
      title: event.title,
      headerId: searchedHeaderId,
      episodes: episodeArray
    };

  this.mediaService.postApiSeason(newSeason).subscribe({
    next: (createdSeason) => {
      console.log('Header erstellt', createdSeason);

      let searchedHeaderId = parseInt(this.headerId());
      this.mediaService.getApiSeason(searchedHeaderId).subscribe(seasons => {
        this.displayedSeasons = seasons;
        console.log(this.displayedSeasons);
        if (this.displayedSeasons.length != 0 && this.displayedSeasons[0].episodes != null) {
          this.displayedEpisodes = this.displayedSeasons[0].episodes;
        }
      });

    },
    error: (err) => {
      console.error(err);
    }
  });

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

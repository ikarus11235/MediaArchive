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
  isSeasonDropdownOpen = false;
  private activatedRoute = inject(ActivatedRoute);

  private route = inject(ActivatedRoute); 
  private router = inject(Router);

  showSeasonDialog = false;

  constructor(private mediaService: MediaDataServiceService) {
    this.activatedRoute.params.subscribe((params) => {
      this.headerId.set(params['id']);
      this.loadHeaderAndSeasons();
    })
  }
  
  ngOnInit(): void {
    this.loadHeaderAndSeasons();
  }

  private loadHeaderAndSeasons(): void {
    const searchedHeaderId = parseInt(this.headerId(), 10);

    this.mediaService.getApiSeason(searchedHeaderId).subscribe(seasons => {
      this.displayedSeasons = seasons;
      console.log(this.displayedSeasons);
      const requestedSeasonId = Number(this.route.snapshot.queryParamMap.get('seasonId'));
      const selectedSeason = this.displayedSeasons.find(season => season.id === requestedSeasonId)
        ?? this.displayedSeasons[0];

      if (selectedSeason) {
        this.renderEpisodes(selectedSeason.id);
      } else {
        this.selectedSeasonId = 1;
        this.displayedEpisodes = [];
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
    this.isSeasonDropdownOpen = false;
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
    const fileName = element.name;
    const extensionIndex = fileName.lastIndexOf('.');
    const episodeTitle = extensionIndex > 0
      ? fileName.slice(0, extensionIndex)
      : fileName;
    episodeArray.push({
      id: 0,
      description: '',
      episodeSign: '',
      seasonId: this.selectedSeasonId,
      title: episodeTitle,
      videoPath: fileName
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
      this.loadHeaderAndSeasons();
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

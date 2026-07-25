import { inject, Injectable } from '@angular/core';
import { Header } from '../interface/header';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Season } from '../interface/season';
import { Episode } from '../interface/episode';
import { Picture } from '../interface/picture';

interface User {
  firstname: string;
  lastname: string;
  birthday: string;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class MediaDataServiceService {
  
  private http = inject(HttpClient);

  testHeader : Header[] = [{
    id: 1,
    title: 'TestTitle',
    thumbNailPath: 'images/closeup-open-textbook.jpg',
    logo: 'TestLogo'
  },
  {
    id: 2,
    title: 'FakeTitle',
    thumbNailPath: 'images/closeup-open-textbook.jpg',
    logo: 'FakeLogo'
  },
  {
    id: 3,
    title: 'DummyTitle',
    thumbNailPath: 'images/closeup-open-textbook.jpg',
    logo: 'DummyLogo'
  }];

  testSeasons: Season[] = [
    {
      id: 1,
      headerId: 2,
      title: 'Season 1',
      episodes: null
    },
    {
      id: 2,
      headerId: 2,
      title: 'Season 2',
      episodes: null
    },
    {
      id: 3,
      headerId: 2,
      title: 'Season 3',
      episodes: null
    },
    {
      id: 4,
      headerId: 2,
      title: 'Season 4',
      episodes: null
    },
    {
      id: 5,
      headerId: 2,
      title: 'Season 5',
      episodes: null
    }
  ];

  testEpisodes: Episode[] = [
    {
      id: 1,
      seasonId: 2,
      description: '',
      episodeSign: 'S2E1',
      title: 'Title 01',
      videoPath: ''
    },
    {
      id: 2,
      seasonId: 2,
      description: '',
      episodeSign: 'S2E2',
      title: 'Title 02',
      videoPath: ''
    },
    {
      id: 3,
      seasonId: 2,
      description: '',
      episodeSign: 'S2E3',
      title: 'Title 03',
      videoPath: ''
    }
  ];

  constructor() { }

   getTestHeader(): Header[] {
    return this.testHeader;
   }

   getApiHeader(): Observable<Header[]> {
    return this.http.get<Header[]>('http://localhost:5203/api/headers');
   }

   getApiSeason(headerId: number): Observable<Season[]> {
    return this.http.get<Season[]>('http://localhost:5203/api/seasons/' + headerId);
   }

   postApiSeason(season: Season): Observable<Header> {
    return this.http.post<Header>('http://localhost:5203/api/seasons', season);
   }

   getApiEpisodes(seasonId: number): Observable<Episode[]> {
    return this.http.get<Episode[]>('http://localhost:5203/api/episodes/' + seasonId);
   }

   getApiEpisodeById(episodeId: number): Observable<Episode> {
    return this.http.get<Episode>('http://localhost:5203/api/singleEpisodes/' + episodeId);
   }

   getApiPicturesByEpisodesId(episodeId: number): Observable<Picture[]> {
    return this.http.get<Picture[]>('http://localhost:5203/api/pictures/' + episodeId);
   }

   postApiHeaders(header: Header): Observable<Header> {
    return this.http.post<Header>('http://localhost:5203/api/headers', header);
   }

   postApiEpisodes(episodes: Episode[]): Observable<Episode> {
    return this.http.post<Episode>('http://localhost:5203/api/episodes', episodes);
   }

   postApiPictures(pictures: Picture[]): Observable<Picture> {
    return this.http.post<Picture>('http://localhost:5203/api/pictures', pictures);
   }

   getFakeApiHeader(): Observable<Header> {
    return this.http.get<Header>('http://localhost:5203/api/fakeHeaders');
   }

   getFakeApiSeason(headerId: number): Observable<Season> {
    return this.http.get<Season>('http://localhost:5203/api/fakeSeasons/' + headerId);
   }

   getFakeApiEpisodes(seasonId: number): Observable<Episode> {
    return this.http.get<Episode>('http://localhost:5203/api/fakeEpisode/' + seasonId);
   }

   getTestSeason(): Season[] {
    return this.testSeasons;
   }

   getTestEpisodes(): Episode[] {
    return this.testEpisodes;
   }

  getMockData(): Observable<User>{
    return this.http.get<User>('https://6561036783aba11d99d1cff0.mockapi.io/api/test');
  }
   
}

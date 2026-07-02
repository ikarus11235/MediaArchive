import { inject, Injectable } from '@angular/core';
import { Header } from '../interface/header';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Season } from '../interface/season';
import { Episode } from '../interface/episode';

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
    thumbNail: 'images/closeup-open-textbook.jpg',
    logo: 'TestLogo'
  },
  {
    id: 2,
    title: 'FakeTitle',
    thumbNail: 'images/closeup-open-textbook.jpg',
    logo: 'FakeLogo'
  },
  {
    id: 3,
    title: 'DummyTitle',
    thumbNail: 'images/closeup-open-textbook.jpg',
    logo: 'DummyLogo'
  }];

  testSeasons: Season[] = [
    {
      id: 1,
      headerId: 2,
      title: 'Season 1'
    },
    {
      id: 2,
      headerId: 2,
      title: 'Season 2'
    },
    {
      id: 3,
      headerId: 2,
      title: 'Season 3'
    },
    {
      id: 4,
      headerId: 2,
      title: 'Season 4'
    },
    {
      id: 5,
      headerId: 2,
      title: 'Season 5'
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

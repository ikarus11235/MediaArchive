import { inject, Injectable } from '@angular/core';
import { Header } from '../interface/header';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Season } from '../interface/season';
import { Episode } from '../interface/episode';
import { Picture } from '../interface/picture';


@Injectable({
  providedIn: 'root'
})
export class MediaDataServiceService {

  private readonly apiUrl = 'http://localhost:5203/api';
  private http = inject(HttpClient);

  testHeader: Header[] = [{
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
    return this.http.get<Header[]>(`${this.apiUrl}/headers`);
  }

  getApiHeaderBySeasonId(seasonId: number): Observable<Header> {
    return this.http.get<Header>(`${this.apiUrl}/header/episodes/${seasonId}`);
  }

  getApiSeason(headerId: number): Observable<Season[]> {
    return this.http.get<Season[]>(`${this.apiUrl}/seasons/${headerId}`);
  }

  postApiSeason(season: Season): Observable<Header> {
    return this.http.post<Header>(`${this.apiUrl}/seasons`, season);
  }

  getApiEpisodes(seasonId: number): Observable<Episode[]> {
    return this.http.get<Episode[]>(`${this.apiUrl}/episodes/${seasonId}`);
  }

  getApiEpisodeById(episodeId: number): Observable<Episode> {
    return this.http.get<Episode>(`${this.apiUrl}/singleEpisodes/${episodeId}`);
  }

  getApiPicturesByEpisodesId(episodeId: number): Observable<Picture[]> {
    return this.http.get<Picture[]>(`${this.apiUrl}/pictures/${episodeId}`);
  }

  postApiHeaders(header: Header): Observable<Header> {
    return this.http.post<Header>(`${this.apiUrl}/headers`, header);
  }

  postApiEpisodes(episodes: Episode[]): Observable<Episode> {
    return this.http.post<Episode>(`${this.apiUrl}/episodes`, episodes);
  }

  postApiPictures(pictures: Picture[]): Observable<Picture> {
    return this.http.post<Picture>(`${this.apiUrl}/pictures`, pictures);
  }

  getFakeApiHeader(): Observable<Header> {
    return this.http.get<Header>(`${this.apiUrl}/fakeHeaders`);
  }

  getFakeApiSeason(headerId: number): Observable<Season> {
    return this.http.get<Season>(`${this.apiUrl}/fakeSeasons/${headerId}`);
  }

  getFakeApiEpisodes(seasonId: number): Observable<Episode> {
    return this.http.get<Episode>(`${this.apiUrl}/fakeEpisode/${seasonId}`);
  }

  getTestSeason(): Season[] {
    return this.testSeasons;
  }

  getTestEpisodes(): Episode[] {
    return this.testEpisodes;
  }

}

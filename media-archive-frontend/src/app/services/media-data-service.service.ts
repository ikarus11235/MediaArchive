import { inject, Injectable } from '@angular/core';
import { Header } from '../interface/header';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { Season } from '../interface/season';
import { Episode } from '../interface/episode';
import { Picture } from '../interface/picture';

// TODO: Split service into 4 different services for better separation of concerns and maintainability.
/**
 * Services:
 * 1. HeaderService: Handles operations related to headers.
 * 2. SeasonService: Manages operations related to seasons.
 * 3. EpisodeService: Responsible for operations related to episodes.
 * 4. PictureService: Handles operations related to pictures.
 */


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
    return this.http.get<Header[]>(`${this.apiUrl}/headers`).pipe(
      map((headers) => headers.map((header) => ({
        ...header,
        thumbNailPath: this.normalizeMediaPath(header.thumbNailPath, 'images')
      })))
    );
  }

  getApiHeaderBySeasonId(seasonId: number): Observable<Header> {
    return this.http.get<Header>(`${this.apiUrl}/header/episodes/${seasonId}`);
  }

  getApiSeason(headerId: number): Observable<Season[]> {
    return this.http.get<Season[]>(`${this.apiUrl}/seasons/${headerId}`).pipe(
      catchError((error) => {
        if (error.status === 404) {
          return of([]);
        }

        return throwError(() => error);
      }),
      map((seasons) => seasons.map((season) => ({
        ...season,
        episodes: season.episodes?.map((episode) => ({
          ...episode,
          videoPath: this.normalizeMediaPath(episode.videoPath, 'videos')
        })) ?? null
      })))
    );
  }

  postApiSeason(season: Season): Observable<Header> {
    const normalizedSeason = {
      ...season,
      episodes: season.episodes?.map((episode) => ({
        ...episode,
        videoPath: this.getMediaFileName(episode.videoPath)
      })) ?? null
    };

    return this.http.post<Header>(`${this.apiUrl}/seasons`, normalizedSeason);
  }

  getApiEpisodes(seasonId: number): Observable<Episode[]> {
    return this.http.get<Episode[]>(`${this.apiUrl}/episodes/${seasonId}`).pipe(
      catchError((error) => {
        if (error.status === 404) {
          return of([]);
        }

        return throwError(() => error);
      }),
      map((episodes) => episodes.map((episode) => ({
        ...episode,
        videoPath: this.normalizeMediaPath(episode.videoPath, 'videos')
      })))
    );
  }

  getApiEpisodeById(episodeId: number): Observable<Episode> {
    return this.http.get<Episode>(`${this.apiUrl}/singleEpisodes/${episodeId}`).pipe(
      map((episode) => ({
        ...episode,
        videoPath: this.normalizeMediaPath(episode.videoPath, 'videos')
      }))
    );
  }

  getApiPicturesByEpisodesId(episodeId: number): Observable<Picture[]> {
    return this.http.get<Picture[]>(`${this.apiUrl}/pictures/${episodeId}`).pipe(
      catchError((error) => {
        if (error.status === 404) {
          return of([]);
        }

        return throwError(() => error);
      }),
      map((pictures) => pictures.map((picture) => ({
        ...picture,
        imagePath: this.normalizeMediaPath(picture.imagePath, 'images')
      })))
    );
  }

  postApiHeaders(header: Header): Observable<Header> {
    const normalizedHeader = {
      ...header,
      thumbNailPath: this.getMediaFileName(header.thumbNailPath)
    };

    return this.http.post<Header>(`${this.apiUrl}/headers`, normalizedHeader);
  }

  deleteApiNode(type: 'header' | 'season' | 'episode' | 'picture', id: number): Observable<unknown> {
    const resourceMap = {
      header: 'headers',
      season: 'seasons',
      episode: 'episodes',
      picture: 'pictures'
    };

    return this.http.delete<unknown>(`${this.apiUrl}/${resourceMap[type]}/${id}`);
  }

  deleteApiHeader(id: number): Observable<unknown> {
    return this.deleteApiNode('header', id);
  }

  renameApiHeader(header: Header): Observable<Header> {
    return this.http.put<Header>(`${this.apiUrl}/headers/${header.id}`, header);
  }

  renameApiNode(type: 'header' | 'season' | 'episode' | 'picture', id: number, newName: string): Observable<unknown> {
    const resourceMap = {
      header: 'headers',
      season: 'seasons',
      episode: 'episodes',
      picture: 'pictures'
    };

    return this.http.put<unknown>(`${this.apiUrl}/${resourceMap[type]}/${id}`, { title: newName });
  }

  postApiEpisodes(episodes: Episode[]): Observable<Episode> {
    return this.http.post<Episode>(`${this.apiUrl}/episodes`, episodes);
  }

  postApiPictures(pictures: Picture[]): Observable<Picture> {
    const normalizedPictures = pictures.map((picture) => ({
      ...picture,
      imagePath: this.getMediaFileName(picture.imagePath)
    }));

    return this.http.post<Picture>(`${this.apiUrl}/pictures`, normalizedPictures);
  }

  private normalizeMediaPath(path: string, folder: 'images' | 'videos'): string {
    const normalized = (path ?? '').replace(/\\/g, '/').trim();
    const marker = `personal/${folder}/`;
    const markerIndex = normalized.lastIndexOf(marker);

    if (markerIndex >= 0) {
      const fileName = normalized.slice(markerIndex + marker.length)
        .replace(/^\/+/, '')
        .split('/')
        .pop() ?? '';

      return fileName ? `/${marker}${fileName}` : `/${marker.slice(0, -1)}`;
    }

    const fileName = normalized.replace(/^\/+/, '').split('/').pop() ?? '';
    return fileName ? `/${marker}${fileName}` : '';
  }

  private getMediaFileName(path: string): string {
    return (path ?? '')
      .replace(/\\/g, '/')
      .trim()
      .split('/')
      .pop() ?? '';
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

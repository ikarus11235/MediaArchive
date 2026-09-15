import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, afterEach } from 'vitest';

import { Header } from '../interface/header';
import { Season } from '../interface/season';
import { MediaDataServiceService } from './media-data-service.service';

describe('MediaDataServiceService', () => {
  let service: MediaDataServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    service = TestBed.inject(MediaDataServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('returns test headers from getTestHeader', () => {
    const result = service.getTestHeader();

    expect(result).toHaveLength(3);
    expect(result[0].title).toBe('TestTitle');
  });

  it('fetches headers from the API', () => {
    const mockHeaders: Header[] = [{
      id: 1,
      title: 'Header 1',
      thumbNailPath: 'images/a.jpg',
      logo: 'logo.png'
    }];

    let result: Header[] | undefined;
    service.getApiHeader().subscribe((headers) => {
      result = headers;
    });

    const req = httpMock.expectOne('http://localhost:5203/api/headers');
    expect(req.request.method).toBe('GET');
    req.flush(mockHeaders);

    expect(result).toEqual(mockHeaders);
  });

  it('returns an empty list when the season endpoint returns 404', () => {
    let result: Season[] | undefined;
    service.getApiSeason(42).subscribe((seasons) => {
      result = seasons;
    });

    const req = httpMock.expectOne('http://localhost:5203/api/seasons/42');
    expect(req.request.method).toBe('GET');
    req.flush('Not found', { status: 404, statusText: 'Not Found' });

    expect(result).toEqual([]);
  });

  it('returns an empty list when the episode endpoint returns 404', () => {
    let result: unknown[] | undefined;
    service.getApiEpisodes(77).subscribe((episodes) => {
      result = episodes;
    });

    const req = httpMock.expectOne('http://localhost:5203/api/episodes/77');
    expect(req.request.method).toBe('GET');
    req.flush('Not found', { status: 404, statusText: 'Not Found' });

    expect(result).toEqual([]);
  });

  it('returns an empty list when the picture endpoint returns 404', () => {
    let result: unknown[] | undefined;
    service.getApiPicturesByEpisodesId(99).subscribe((pictures) => {
      result = pictures;
    });

    const req = httpMock.expectOne('http://localhost:5203/api/pictures/99');
    expect(req.request.method).toBe('GET');
    req.flush('Not found', { status: 404, statusText: 'Not Found' });

    expect(result).toEqual([]);
  });

  it('posts a season to the API', () => {
    const season = {
      id: 1,
      headerId: 2,
      title: 'Season 1',
      episodes: null
    };

    let result: unknown;
    service.postApiSeason(season).subscribe((response) => {
      result = response;
    });

    const req = httpMock.expectOne('http://localhost:5203/api/seasons');
    expect(req.request.method).toBe('POST');
    req.flush({ ok: true });

    expect(result).toEqual({ ok: true });
  });

  it('deletes a header from the API', () => {
    let result: unknown;
    service.deleteApiHeader(7).subscribe((response) => {
      result = response;
    });

    const req = httpMock.expectOne('http://localhost:5203/api/headers/7');
    expect(req.request.method).toBe('DELETE');
    req.flush({ ok: true });

    expect(result).toEqual({ ok: true });
  });

  it('renames a header with the complete header DTO', () => {
    const header = {
      id: 7,
      title: 'Renamed Header',
      thumbNailPath: '/personal/images/header.jpg',
      logo: 'Header Logo'
    };
    let result: unknown;

    service.renameApiHeader(header).subscribe((response) => {
      result = response;
    });

    const req = httpMock.expectOne('http://localhost:5203/api/headers/7');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(header);
    req.flush(header);

    expect(result).toEqual(header);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { describe, beforeEach, it, expect, vi } from 'vitest';

import { MediaDataServiceService } from '../../services/media-data-service.service';
import { ShowSeasonsComponent } from './show-seasons.component';

describe('ShowSeasonsComponent', () => {
  let component: ShowSeasonsComponent;
  let fixture: ComponentFixture<ShowSeasonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowSeasonsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '1' })
          }
        },
        { provide: Router, useValue: { navigate: vi.fn() } },
        {
          provide: MediaDataServiceService,
          useValue: {
            getApiSeason: () => of([]),
            getApiHeader: () => of([]),
            getApiEpisodes: () => of([]),
            postApiSeason: vi.fn(() => of({}))
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowSeasonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the season dropdown after selecting a season', () => {
    component.isSeasonDropdownOpen = true;

    component.renderEpisodes(2);

    expect(component.isSeasonDropdownOpen).toBe(false);
  });

  it('should remove the video extension from the episode title but keep it in the path', () => {
    const mediaService = TestBed.inject(MediaDataServiceService);
    const postApiSeason = vi.spyOn(mediaService, 'postApiSeason');

    component.createSeason({
      title: 'Season 1',
      episodes: [new File([], 'ComputerSmash.mp4')]
    });

    expect(postApiSeason).toHaveBeenCalledWith(expect.objectContaining({
      episodes: [expect.objectContaining({
        title: 'ComputerSmash',
        videoPath: 'ComputerSmash.mp4'
      })]
    }));
  });
});

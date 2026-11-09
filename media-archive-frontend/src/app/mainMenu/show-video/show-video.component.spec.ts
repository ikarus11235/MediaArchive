import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { describe, beforeEach, it, expect, vi } from 'vitest';

import { MediaDataServiceService } from '../../services/media-data-service.service';
import { ShowVideoComponent } from './show-video.component';

describe('ShowVideoComponent', () => {
  let component: ShowVideoComponent;
  let fixture: ComponentFixture<ShowVideoComponent>;
  let router: { navigate: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowVideoComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '1' })
          }
        },
        { provide: Router, useValue: router = { navigate: vi.fn() } },
        {
          provide: MediaDataServiceService,
          useValue: {
            getApiEpisodeById: () => of({ id: 1, title: 'Test', description: '', videoPath: '', episodeSign: 'S1E1', seasonId: 1 }),
            getApiPicturesByEpisodesId: () => of([]),
            getApiHeaderBySeasonId: () => of({ id: 1 })
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate back to the episode season', () => {
    component.navigateToSeasons(7);

    expect(router.navigate).toHaveBeenCalledWith(['/season', 1], {
      queryParams: { seasonId: 7 }
    });
  });
});

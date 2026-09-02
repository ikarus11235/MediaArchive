import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { describe, beforeEach, it, expect } from 'vitest';

import { MediaDataServiceService } from '../../services/media-data-service.service';
import { ShowVideoComponent } from './show-video.component';

describe('ShowVideoComponent', () => {
  let component: ShowVideoComponent;
  let fixture: ComponentFixture<ShowVideoComponent>;

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
        { provide: Router, useValue: { navigate: vi.fn() } },
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
});

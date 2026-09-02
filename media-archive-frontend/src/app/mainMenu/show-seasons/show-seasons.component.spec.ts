import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { describe, beforeEach, it, expect } from 'vitest';

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
            postApiSeason: () => of({})
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
});

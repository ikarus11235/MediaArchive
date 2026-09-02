import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { describe, beforeEach, it, expect } from 'vitest';

import { MediaDataServiceService } from '../../services/media-data-service.service';
import { ShowGalleryComponent } from './show-gallery.component';

describe('ShowGalleryComponent', () => {
  let component: ShowGalleryComponent;
  let fixture: ComponentFixture<ShowGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowGalleryComponent],
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
            getApiPicturesByEpisodesId: () => of([])
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

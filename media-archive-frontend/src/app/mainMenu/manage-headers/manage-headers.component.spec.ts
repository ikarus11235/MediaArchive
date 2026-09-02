import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { ManageHeadersComponent } from './manage-headers.component';
import { MediaDataServiceService } from '../../services/media-data-service.service';

describe('ManageHeadersComponent', () => {
  let component: ManageHeadersComponent;
  let fixture: ComponentFixture<ManageHeadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageHeadersComponent],
      providers: [
        { provide: Router, useValue: { navigate: vi.fn() } },
        {
          provide: MediaDataServiceService,
          useValue: {
            getApiHeader: () => of([]),
            getApiSeason: () => of([]),
            getApiEpisodes: () => of([]),
            getApiPicturesByEpisodesId: () => of([])
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageHeadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

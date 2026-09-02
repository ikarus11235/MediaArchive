import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { describe, beforeEach, it, expect } from 'vitest';

import { MediaDataServiceService } from '../../services/media-data-service.service';
import { ShowHeadersComponent } from './show-headers.component';

describe('ShowHeadersComponent', () => {
  let component: ShowHeadersComponent;
  let fixture: ComponentFixture<ShowHeadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowHeadersComponent],
      providers: [
        { provide: Router, useValue: { navigate: vi.fn() } },
        {
          provide: MediaDataServiceService,
          useValue: {
            getApiHeader: () => of([]),
            getTestHeader: () => [],
            postApiHeaders: () => of({})
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowHeadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

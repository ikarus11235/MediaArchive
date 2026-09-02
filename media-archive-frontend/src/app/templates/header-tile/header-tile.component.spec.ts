import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { describe, beforeEach, it, expect } from 'vitest';

import { HeaderTileComponent } from './header-tile.component';

describe('HeaderTileComponent', () => {
  let component: HeaderTileComponent;
  let fixture: ComponentFixture<HeaderTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderTileComponent],
      providers: [
        { provide: ActivatedRoute, useValue: {} },
        { provide: Router, useValue: { navigate: vi.fn() } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

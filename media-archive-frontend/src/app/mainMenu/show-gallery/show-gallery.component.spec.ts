import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, beforeEach, it, expect } from 'vitest';

import { ShowGalleryComponent } from './show-gallery.component';

describe('ShowGalleryComponent', () => {
  let component: ShowGalleryComponent;
  let fixture: ComponentFixture<ShowGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowGalleryComponent]
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

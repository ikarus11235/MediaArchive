import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, beforeEach, it, expect } from 'vitest';

import { EpisodeImagesDialogComponent } from './episode-images-dialog.component';

describe('EpisodeImagesDialogComponent', () => {
  let component: EpisodeImagesDialogComponent;
  let fixture: ComponentFixture<EpisodeImagesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EpisodeImagesDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpisodeImagesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

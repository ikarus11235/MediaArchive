import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, beforeEach, it, expect } from 'vitest';

import { EpisodeTileComponent } from './episode-tile.component';

describe('EpisodeTileComponent', () => {
  let component: EpisodeTileComponent;
  let fixture: ComponentFixture<EpisodeTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EpisodeTileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpisodeTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

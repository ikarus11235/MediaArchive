import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTileComponent } from './header-tile.component';

describe('HeaderTileComponent', () => {
  let component: HeaderTileComponent;
  let fixture: ComponentFixture<HeaderTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderTileComponent]
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

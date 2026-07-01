import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowHeadersComponent } from './show-headers.component';

describe('ShowHeadersComponent', () => {
  let component: ShowHeadersComponent;
  let fixture: ComponentFixture<ShowHeadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowHeadersComponent]
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

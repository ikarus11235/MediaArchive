import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHeadersComponent } from './manage-headers.component';

describe('ManageHeadersComponent', () => {
  let component: ManageHeadersComponent;
  let fixture: ComponentFixture<ManageHeadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageHeadersComponent]
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

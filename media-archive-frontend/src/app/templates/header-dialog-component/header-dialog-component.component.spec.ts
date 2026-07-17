import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDialogComponentComponent } from './header-dialog-component.component';

describe('HeaderDialogComponentComponent', () => {
  let component: HeaderDialogComponentComponent;
  let fixture: ComponentFixture<HeaderDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderDialogComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

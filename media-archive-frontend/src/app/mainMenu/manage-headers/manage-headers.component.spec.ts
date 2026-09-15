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

  it('should open and close the rename form per node', () => {
    const nodeA = { id: 1, name: 'Header 1', type: 'header' as const };
    const nodeB = { id: 2, name: 'Header 2', type: 'header' as const };

    component.switchRenameForm(nodeA);
    expect(component.renameFormOpenNode).toBe(nodeA);
    expect(component.newName).toBe('Header 1');

    component.switchRenameForm(nodeB);
    expect(component.renameFormOpenNode).toBe(nodeB);

    component.switchRenameForm(nodeB);
    expect(component.renameFormOpenNode).toBeNull();
  });
});

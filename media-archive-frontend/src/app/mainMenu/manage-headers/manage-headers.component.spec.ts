import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';

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
            getApiPicturesByEpisodesId: () => of([]),
            deleteApiNode: vi.fn(() => of({}))
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

  it('should delete multiple selected nodes', () => {
    const deleteApiNode = vi.spyOn(
      TestBed.inject(MediaDataServiceService),
      'deleteApiNode'
    );
    const pictureA = { id: 1, name: 'Picture 1', type: 'picture' as const };
    const pictureB = { id: 2, name: 'Picture 2', type: 'picture' as const };
    component.dataSource = [pictureA, pictureB];
    component.toggleNodeSelection(pictureA);
    component.toggleNodeSelection(pictureB);

    component.deleteSelectedNodes();

    expect(deleteApiNode).toHaveBeenCalledTimes(2);
    expect(deleteApiNode).toHaveBeenCalledWith('picture', 1);
    expect(deleteApiNode).toHaveBeenCalledWith('picture', 2);
    expect(component.selectedNodeKeys.size).toBe(0);
  });

  it('should only delete a selected parent when its child is also selected', () => {
    const deleteApiNode = vi.spyOn(
      TestBed.inject(MediaDataServiceService),
      'deleteApiNode'
    );
    const picture = { id: 3, name: 'Picture', type: 'picture' as const };
    const episode = {
      id: 2,
      name: 'Episode',
      type: 'episode' as const,
      children: [picture]
    };
    component.dataSource = [episode];
    component.toggleNodeSelection(episode);
    component.toggleNodeSelection(picture);

    component.deleteSelectedNodes();

    expect(deleteApiNode).toHaveBeenCalledTimes(1);
    expect(deleteApiNode).toHaveBeenCalledWith('episode', 2);
    expect(component.selectedNodeKeys.size).toBe(0);
  });
});

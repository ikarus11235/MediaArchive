import { TestBed } from '@angular/core/testing';
import { describe, beforeEach, it, expect } from 'vitest';

import { MediaDataServiceService } from './media-data-service.service';

describe('MediaDataServiceService', () => {
  let service: MediaDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediaDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

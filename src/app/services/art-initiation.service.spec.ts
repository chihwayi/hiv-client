import { TestBed } from '@angular/core/testing';

import { ArtInitiationService } from './art-initiation.service';

describe('ArtInitiationService', () => {
  let service: ArtInitiationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtInitiationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

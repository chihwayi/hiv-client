import { TestBed } from '@angular/core/testing';

import { ArtCurrentStatusService } from './art-current-status.service';

describe('ArtCurrentStatusService', () => {
  let service: ArtCurrentStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtCurrentStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

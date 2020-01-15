import { TestBed } from '@angular/core/testing';

import { PathFinderAlgorithmsService } from './path-finder-algorithms.service';

describe('PathFinderAlgorithmsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PathFinderAlgorithmsService = TestBed.get(PathFinderAlgorithmsService);
    expect(service).toBeTruthy();
  });
});

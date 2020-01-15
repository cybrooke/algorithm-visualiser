import { TestBed } from '@angular/core/testing';

import { SortingAlgorithmsService } from './sorting-algorithms.service';

describe('SortingAlgorithmsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SortingAlgorithmsService = TestBed.get(SortingAlgorithmsService);
    expect(service).toBeTruthy();
  });
});

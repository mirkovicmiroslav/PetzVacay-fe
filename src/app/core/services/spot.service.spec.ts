import { TestBed } from '@angular/core/testing';

import { SpotService } from './spot.service';

describe('SpotService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpotService = TestBed.get(SpotService);
    expect(service).toBeTruthy();
  });
});

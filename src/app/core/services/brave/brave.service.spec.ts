import { TestBed } from '@angular/core/testing';

import { BraveService } from './brave.service';

describe('BraveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BraveService = TestBed.get(BraveService);
    expect(service).toBeTruthy();
  });
});

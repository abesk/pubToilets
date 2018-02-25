import { TestBed, inject } from '@angular/core/testing';

import { ToiletService } from './toilet.service';

describe('ToiletService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToiletService]
    });
  });

  it('should be created', inject([ToiletService], (service: ToiletService) => {
    expect(service).toBeTruthy();
  }));
});

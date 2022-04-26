import { TestBed } from '@angular/core/testing';

import { BusstopService } from './busstop.service';

describe('BusstopService', () => {
  let service: BusstopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusstopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { RoutebusstopService } from './routebusstop.service';

describe('RoutebusstopService', () => {
  let service: RoutebusstopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutebusstopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

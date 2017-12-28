import { TestBed, inject } from '@angular/core/testing';

import { NavRouterActivatorService } from './nav-router-activator.service';

describe('NavRouterActivatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavRouterActivatorService]
    });
  });

  it('should be created', inject([NavRouterActivatorService], (service: NavRouterActivatorService) => {
    expect(service).toBeTruthy();
  }));
});

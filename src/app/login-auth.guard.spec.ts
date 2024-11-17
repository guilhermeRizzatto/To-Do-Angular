import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loginAuthGuard } from './loginauth.guard';

describe('loginAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loginAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
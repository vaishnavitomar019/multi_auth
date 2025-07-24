import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';

import { authGuard } from './auth.guard';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));
  let route: ActivatedRouteSnapshot;
  let state: RouterStateSnapshot;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    route = {} as ActivatedRouteSnapshot;
    state = { url: '/dashboard' } as RouterStateSnapshot;
    localStorage.clear();

  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('it should allow navigation if tooken exists', () => {
    localStorage.setItem('token', 'fake-token');
    const result = executeGuard(route, state);
    expect(result).toBeTrue();
  });

  it('it should block navigation if tooken does not exist', () => {
    const result = executeGuard(route, state);
    expect(result).toBeFalse();
  })
});

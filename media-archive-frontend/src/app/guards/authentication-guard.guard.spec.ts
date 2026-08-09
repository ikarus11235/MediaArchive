import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AuthService } from '../services/auth.service';
import { authenticationGuardGuard } from './authentication-guard.guard';

describe('authenticationGuardGuard', () => {
  let authService: { isLoggedIn: ReturnType<typeof vi.fn> };
  let router: { createUrlTree: ReturnType<typeof vi.fn> };

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authenticationGuardGuard(...guardParameters));

  beforeEach(() => {
    authService = {
      isLoggedIn: vi.fn()
    };

    router = {
      createUrlTree: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router }
      ]
    });
  });

  it('allows activation when the user is logged in', () => {
    authService.isLoggedIn.mockReturnValue(true);

    const result = executeGuard({} as ActivatedRouteSnapshot, { url: '/dashboard' } as RouterStateSnapshot);

    expect(result).toBe(true);
    expect(router.createUrlTree).not.toHaveBeenCalled();
  });

  it('redirects to login when the user is not logged in', () => {
    const expectedTree = {} as UrlTree;
    authService.isLoggedIn.mockReturnValue(false);
    router.createUrlTree.mockReturnValue(expectedTree);

    const result = executeGuard({} as ActivatedRouteSnapshot, { url: '/protected' } as RouterStateSnapshot);

    expect(router.createUrlTree).toHaveBeenCalledWith(['/login'], {
      queryParams: { returnUrl: '/protected' }
    });
    expect(result).toBe(expectedTree);
  });
});

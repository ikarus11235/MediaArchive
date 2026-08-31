import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { describe, beforeEach, it, expect, vi } from 'vitest';
import { of, throwError } from 'rxjs';

import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from '../services/auth.service';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;
  let authServiceMock: { getToken: ReturnType<typeof vi.fn> };
  let nextHandler: { handle: ReturnType<typeof vi.fn> };
  let routerMock: { navigate: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    authServiceMock = {
      getToken: vi.fn().mockReturnValue('my-fake-token')
    };

    nextHandler = {
      handle: vi.fn(() => of(new HttpResponse({ status: 200 })))
    };
    routerMock = {
      navigate: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        AuthInterceptor,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    interceptor = TestBed.inject(AuthInterceptor);
  });

  it('adds the auth token header when a token exists', () => {
    // Arrange
    const req = new HttpRequest('GET', '/test');

    // Act
    interceptor.intercept(req, nextHandler as any).subscribe();

    // Assert
    expect(nextHandler.handle).toHaveBeenCalledTimes(1);
    expect(nextHandler.handle.mock.calls[0][0].headers.get('Authorization')).toBe('Bearer my-fake-token');
  });

  it('does not add an auth header when no token exists', () => {
    // Arrange
    authServiceMock.getToken.mockReturnValue(null);
    const req = new HttpRequest('GET', '/test');

    // Act
    interceptor.intercept(req, nextHandler as any).subscribe();

    // Assert
    expect(nextHandler.handle).toHaveBeenCalledTimes(1);
    expect(nextHandler.handle.mock.calls[0][0].headers.get('Authorization')).toBeNull();
  });

  it('routes to login when the request returns 401', () => {
    nextHandler.handle.mockReturnValue(
      throwError(() => new HttpErrorResponse({ status: 401 }))
    );

    interceptor.intercept(new HttpRequest('GET', '/test'), nextHandler as any).subscribe({
      error: () => undefined
    });

    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });
});

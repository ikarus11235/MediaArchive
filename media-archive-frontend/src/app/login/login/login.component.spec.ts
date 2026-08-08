import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { LoginComponent } from './login.component';
import { describe, beforeEach, it, expect, vi } from 'vitest';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: {
    login: ReturnType<typeof vi.fn>;
    saveToken: ReturnType<typeof vi.fn>;
    getToken: ReturnType<typeof vi.fn>;
    isLoggedIn: ReturnType<typeof vi.fn>;
  };
  let routerMock: { navigate: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    authServiceMock = {
      login: vi.fn().mockReturnValue(of({ token: 'my-fake-token' })),
      saveToken: vi.fn(),
      getToken: vi.fn(),
      isLoggedIn: vi.fn()
    };

    routerMock = {
      navigate: vi.fn().mockResolvedValue(true)
    };

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders the title and subtitle', () => {
    // Arrange
    const h1 = fixture.nativeElement.querySelector('h1');
    const h2 = fixture.nativeElement.querySelector('h2');

    // Act
    // No action required for this render test.

    // Assert
    expect(h1.textContent).toBe('MediaArchive');
    expect(h2.textContent).toBe('Login');
  });

  it('updates the user model when the form inputs change', () => {
    // Arrange
    const emailInput = fixture.nativeElement.querySelector('#email') as HTMLInputElement;
    const passwordInput = fixture.nativeElement.querySelector('#password') as HTMLInputElement;

    // Act
    emailInput.value = 'test@example.com';
    emailInput.dispatchEvent(new Event('input'));

    passwordInput.value = 'secret123';
    passwordInput.dispatchEvent(new Event('input'));

    // Assert
    expect(component.user.email).toBe('test@example.com');
    expect(component.user.password).toBe('secret123');
  });

  it('calls authService.login when login is triggered', () => {
    // Arrange
    component.user = { email: 'test@example.com', password: 'secret123' };

    // Act
    component.login();

    // Asserts
    expect(authServiceMock.login).toHaveBeenCalledWith(component.user);
  });

  it('shows a success message and navigates to headers on successful login', () => {
    // Arrange
    component.user = { email: 'test@example.com', password: 'secret123' };
    authServiceMock.login.mockReturnValue(of({ token: 'abc123' }));

    // Act
    component.login();

    // Assert
    expect(authServiceMock.saveToken).toHaveBeenCalledTimes(1);
    expect(authServiceMock.saveToken).toHaveBeenCalledWith('abc123');
    expect(component.message).toBe('Login successful');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/headers']);
  });

  it('shows an error message on failed login', () => {
    // Arrange
    component.user = { email: 'test@example.com', password: 'wrong-password' };
    authServiceMock.login.mockReturnValue(throwError(() => new Error('bad credentials')));

    // Act
    component.login();

    // Assert
    expect(component.message).toBe('Invalid email or password');
    expect(authServiceMock.saveToken).not.toHaveBeenCalled();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
});

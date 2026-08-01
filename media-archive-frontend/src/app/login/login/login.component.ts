import { Component, Output, EventEmitter, Input, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  message = "";

  user = {
    email: "",
    password: ""
  };

  private readonly router = inject(Router);

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.user).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);
        this.message = "Login successful";
        return this.router.navigate(['/headers']);
      },
      error: () => {
        this.message = "Invalid email or password";
      }
    });
  }
}

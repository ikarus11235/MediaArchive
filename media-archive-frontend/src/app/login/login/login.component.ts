import { Component, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';

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

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.user).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);
        this.message = "Login successful";
      },
      error: () => {
        this.message = "Invalid email or password";
      }
    });
  }
}

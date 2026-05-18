import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email = '';
  password = '';
  error = '';
  loading = false;

  constructor(private http: HttpClient, private router: Router) {}

  login(): void {
    if (!this.email || !this.password) {
      this.error = 'נא למלא אימייל וסיסמה';
      return;
    }
    this.loading = true;
    this.error = '';
    this.http.post<any>('http://localhost:5001/api/users/login', { email: this.email, password: this.password }).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigate([res.user.role === 'admin' ? '/admin' : '/dashboard']);
      },
      error: () => {
        this.error = 'אימייל או סיסמה שגויים';
        this.loading = false;
      }
    });
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  name = '';
  phone = '';
  email = '';
  password = '';
  error = '';
  success = '';
  loading = false;

  constructor(private http: HttpClient, private router: Router) {}

  register(): void {
    if (!this.name || !this.email || !this.password) {
      this.error = 'נא למלא את כל השדות החובה';
      return;
    }
    this.loading = true;
    this.error = '';
    this.http.post<any>('http://localhost:5001/api/users/register', {
      name: this.name, phone: this.phone, email: this.email, password: this.password
    }).subscribe({
      next: () => {
        this.success = 'נרשמת בהצלחה! מעביר אותך להתחברות...';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.error = err.error?.message || 'שגיאה בהרשמה, נסה שנית';
        this.loading = false;
      }
    });
  }
}

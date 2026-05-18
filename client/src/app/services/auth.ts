import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Auth {
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.getUser()?.role === 'admin';
  }

  logout(): void {
    localStorage.clear();
  }
}

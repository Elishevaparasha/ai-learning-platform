import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = 'http://localhost:5001/api';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categories`);
  }

  getSubCategories(categoryId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categories/${categoryId}/subcategories`);
  }

  generateLesson(prompt: string, subCategoryId: number, userId: number = 1): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/prompts/generate`, { prompt, subCategoryId, userId });
  }

  getHistory(userId: number = 1): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/prompts/history/${userId}`);
  }

  getAdminData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/prompts/admin/all`);
  }
}

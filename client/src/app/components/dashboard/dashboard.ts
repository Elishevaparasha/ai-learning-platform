import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
  categories: any[] = [];
  subCategories: any[] = [];
  history: any[] = [];

  selectedCategoryId = '';
  selectedSubCategoryId = '';
  userPrompt = '';
  aiResponse = '';
  loading = false;
  user: any = null;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!this.user?.id) { this.router.navigate(['/login']); return; }
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.apiService.getCategories().subscribe({
      next: (data) => { this.categories = data; },
      error: (err) => console.error(err)
    });
    this.apiService.getHistory(this.user.id).subscribe({
      next: (data) => { this.history = data; },
      error: (err) => console.error(err)
    });
  }

  onCategoryChange(): void {
    this.selectedSubCategoryId = '';
    this.subCategories = [];
    if (this.selectedCategoryId) {
      this.apiService.getSubCategories(this.selectedCategoryId).subscribe({
        next: (data) => { this.subCategories = data; },
        error: (err) => console.error(err)
      });
    }
  }

  submitPrompt(): void {
    if (!this.selectedSubCategoryId || !this.userPrompt) return;
    this.loading = true;
    this.aiResponse = '';
    this.apiService.generateLesson(this.userPrompt, +this.selectedSubCategoryId, this.user.id).subscribe({
      next: (res) => {
        this.aiResponse = res.prompt?.response || res.response;
        this.loading = false;
        this.userPrompt = '';
        this.apiService.getHistory(this.user.id).subscribe({ next: (d) => { this.history = d; } });
      },
      error: () => {
        this.loading = false;
        this.aiResponse = 'אופס! אירעה שגיאה. נסה שנית.';
      }
    });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}


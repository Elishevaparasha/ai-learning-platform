import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin implements OnInit {
  allPrompts: any[] = [];
  filtered: any[] = [];
  paginated: any[] = [];
  searchTerm = '';
  currentPage = 1;
  pageSize = 10;
  totalPages = 1;
  loading = true;
  user: any = null;

  uniqueUsers = 0;
  uniqueTopics = 0;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    if (this.user?.role !== 'admin') {
      this.router.navigate(['/dashboard']);
      return;
    }
    this.apiService.getAdminData().subscribe({
      next: (data) => {
        this.allPrompts = data;
        this.uniqueUsers = new Set(data.map((p: any) => p.User?.id).filter(Boolean)).size;
        this.uniqueTopics = new Set(data.map((p: any) => p.SubCategory?.name).filter(Boolean)).size;
        this.applyFilter();
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  applyFilter(): void {
    const term = this.searchTerm.toLowerCase();
    this.filtered = term
      ? this.allPrompts.filter(p =>
          p.User?.name?.toLowerCase().includes(term) ||
          p.title?.toLowerCase().includes(term) ||
          p.SubCategory?.name?.toLowerCase().includes(term)
        )
      : [...this.allPrompts];
    this.currentPage = 1;
    this.updatePage();
  }

  updatePage(): void {
    this.totalPages = Math.max(1, Math.ceil(this.filtered.length / this.pageSize));
    const start = (this.currentPage - 1) * this.pageSize;
    this.paginated = this.filtered.slice(start, start + this.pageSize);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePage();
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

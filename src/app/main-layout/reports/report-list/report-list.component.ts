import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Report {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
}

@Component({
  selector: 'app-report-list',
  template: `
    <div class="report-list">
      <div class="header">
        <h2>Reports</h2>
        <button mat-raised-button color="primary" (click)="createNew()">
          <mat-icon>add</mat-icon>
          Create New Report
        </button>
      </div>
      <div class="reports">
        <mat-card *ngFor="let report of reports" class="report-card" (click)="editReport(report.id)">
          <mat-card-header>
            <mat-card-title>{{ report.title }}</mat-card-title>
            <mat-card-subtitle>Created: {{ report.createdAt | date }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>{{ report.description }}</p>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .report-list {
      padding: 20px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .reports {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }
    .report-card {
      cursor: pointer;
      transition: transform 0.2s;
    }
    .report-card:hover {
      transform: translateY(-2px);
    }
  `]
})
export class ReportListComponent implements OnInit {
  reports: Report[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    const storedReports = localStorage.getItem('reports');
    if (storedReports) {
      this.reports = JSON.parse(storedReports);
    } else {
      // Mock data
      this.reports = [
        {
          id: 1,
          title: 'Monthly Sales Report',
          description: 'Overview of sales performance for the current month',
          createdAt: new Date()
        },
        {
          id: 2,
          title: 'Customer Feedback Analysis',
          description: 'Analysis of customer feedback and satisfaction metrics',
          createdAt: new Date()
        }
      ];
      localStorage.setItem('reports', JSON.stringify(this.reports));
    }
  }

  createNew() {
    this.router.navigate(['/reports/new']);
  }

  editReport(id: number) {
    this.router.navigate(['/reports', id]);
  }
} 
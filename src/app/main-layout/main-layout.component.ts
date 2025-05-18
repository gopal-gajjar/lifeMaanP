import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { AccessService } from '../core/services/access.service';

@Component({
  selector: 'app-main-layout',
  template: `
    <mat-sidenav-container class="main-layout">
      <mat-sidenav #sidenav mode="side" opened class="sidebar">
        <mat-toolbar color="primary">Dashboard</mat-toolbar>
        <mat-nav-list>
          <a mat-list-item *ngFor="let module of modules" 
             [routerLink]="['/', module.toLowerCase()]"
             routerLinkActive="active">
            <mat-icon matListItemIcon>{{getModuleIcon(module)}}</mat-icon>
            <span matListItemTitle>{{ module }}</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content class="content">
        <mat-toolbar color="primary">
          <button mat-icon-button (click)="sidenav.toggle()">
            <mat-icon>menu</mat-icon>
          </button>
          <span>LifeMaan</span>
        </mat-toolbar>
        <div class="content-wrapper">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .main-layout {
      height: 100vh;
      display: flex;
    }
    .sidebar {
      width: 250px;
      background-color: #fafafa;
    }
    .content {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    .content-wrapper {
      padding: 20px;
      flex: 1;
      overflow: auto;
    }
    .active {
      background-color: rgba(0, 0, 0, 0.04);
    }
    mat-toolbar {
      position: sticky;
      top: 0;
      z-index: 1;
    }
  `]
})
export class MainLayoutComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  modules: string[] = [];

  private readonly moduleIcons: { [key: string]: string } = {
    Reports: 'assessment',
    Files: 'folder',
    Users: 'people',
    Projects: 'work',
    Settings: 'settings',
  };

  constructor(
    private accessService: AccessService,
    private router: Router
  ) {}

  ngOnInit() {
    this.accessService.getAccessibleModules().subscribe({
      next: (moduleNames) => {
        this.modules = moduleNames;
        if (this.modules.length === 0) {
          console.warn('No modules available for the current user');
        }
      },
      error: (error) => {
        console.error('Error loading modules:', error);
      }
    });
  }

  ngAfterViewInit() {
    this.sidenav.open();
  }

  getModuleIcon(moduleName: string): string {
    return this.moduleIcons[moduleName] || 'extension';
  }
} 
import { Component } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  template: `
    <mat-sidenav-container class="main-layout">
      <mat-sidenav mode="side" opened class="sidebar">
        <mat-toolbar color="primary">Dashboard</mat-toolbar>
        <mat-nav-list>
          <a mat-list-item routerLink="/reports" routerLinkActive="active">
            <mat-icon matListItemIcon>assessment</mat-icon>
            <span matListItemTitle>Reports</span>
          </a>
          <a mat-list-item routerLink="/users" routerLinkActive="active">
            <mat-icon matListItemIcon>people</mat-icon>
            <span matListItemTitle>Users</span>
          </a>
          <a mat-list-item routerLink="/files" routerLinkActive="active">
            <mat-icon matListItemIcon>folder</mat-icon>
            <span matListItemTitle>Files</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content class="content">
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .main-layout {
      height: 100vh;
    }
    .sidebar {
      width: 250px;
    }
    .content {
      padding: 20px;
    }
    .active {
      background-color: rgba(0, 0, 0, 0.04);
    }
  `]
})
export class MainLayoutComponent {} 
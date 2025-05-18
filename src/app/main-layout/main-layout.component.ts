import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { ModuleService } from '../core/services/module.service';

@Component({
  selector: 'app-main-layout',
  template: `
    <mat-sidenav-container class="main-layout">
      <mat-sidenav #sidenav mode="side" opened class="sidebar">
        <mat-toolbar color="primary">Dashboard</mat-toolbar>
        <mat-nav-list>
          <a mat-list-item *ngFor="let module of modules" 
             [routerLink]="[module.toLowerCase()]" 
             routerLinkActive="active"
             (click)="onModuleClick(module)">
            <mat-icon matListItemIcon>{{getModuleIcon(module)}}</mat-icon>
            <span matListItemTitle>{{module}}</span>
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
    Users: 'people',
    Files: 'folder'
  };

  constructor(
    @Inject(ModuleService) private moduleService: ModuleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log('Initializing MainLayoutComponent');
    this.moduleService.getAvailableModules().subscribe({
      next: (moduleNames) => {
        console.log('Received modules:', moduleNames);
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
    console.log('AfterViewInit - Opening sidenav');
    setTimeout(() => {
      if (this.sidenav) {
        this.sidenav.open();
      }
    });
  }

  onModuleClick(module: string) {
    console.log('Module clicked:', module);
    this.router.navigate([module.toLowerCase()]);
  }

  getModuleIcon(moduleName: string): string {
    return this.moduleIcons[moduleName] || 'extension';
  }
} 
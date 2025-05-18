import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface ModuleAccess {
  moduleName: string;
  allowedActions: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AccessService {
  private moduleCache: string[] = [];
  private actionCache: { [key: string]: string[] } = {};

  constructor() {
    // Initialize with the provided permissions
    this.moduleCache = ['Reports', 'Files', 'Users', 'Projects', 'Settings'];
    this.actionCache = {
      'Reports': [
        // 'Reports.ListReports',
        'Reports.GetReports',
        'Reports.CreateReports',
        'Reports.DeleteReports',
        'Reports.UpdateReports'
      ],
      'Files': [
        'Files.ListFiles',
        'Files.GetFiles',
        'Files.UploadFiles',
        'Files.DeleteFiles',
        'Files.DownloadFiles',
        'Files.ShareFiles'
      ],
      'Users': [
        'Users.ListUsers',
        'Users.GetUsers',
        'Users.CreateUsers',
        'Users.UpdateUsers',
        'Users.DeleteUsers',
        'Users.AssignRoles'
      ],
      'Projects': [
        'Projects.ListProjects',
        'Projects.GetProjects',
        'Projects.CreateProjects',
        'Projects.UpdateProjects',
        'Projects.DeleteProjects',
        'Projects.AssignTeam'
      ],
      'Settings': [
        'Settings.ListSettings',
        'Settings.GetSettings',
        'Settings.UpdateSettings',
        'Settings.ManageRoles',
        'Settings.ManagePermissions'
      ]
    };

  }

  getAccessibleModules(): Observable<string[]> {
    return of(this.moduleCache);
  }

  getAccessibleComponents(moduleName: string): Observable<string[]> {
    return of(this.actionCache[moduleName] || []);
  }

  hasAccess(moduleName: string, action: string): boolean {
    const actions = this.actionCache[moduleName] || [];
    return actions.includes(action);
  }

  clearCache(): void {
    this.moduleCache = [];
    this.actionCache = {};
  }
} 
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { GrantService } from './grant.service';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private modulesCache: string[] | null = null;
  private availableModules = new BehaviorSubject<string[]>([]);

  // Available modules based on the provided permissions
  private readonly mockModules = ['Reports', 'Files'];

  constructor(private grantService: GrantService) {
    // Initialize with mock data
    this.availableModules.next(this.mockModules);
    this.modulesCache = this.mockModules;
    // Fetch grants for available modules
    this.fetchGrants(this.mockModules);
  }

  getAvailableModules(): Observable<string[]> {
    if (this.modulesCache) {
      return of(this.modulesCache);
    }

    return of(this.mockModules).pipe(
      tap(modules => {
        this.modulesCache = modules;
        this.availableModules.next(modules);
        // Fetch grants for new modules
        this.fetchGrants(modules);
      })
    );
  }

  private fetchGrants(modules: string[]) {
    this.grantService.getGrants(modules).subscribe();
  }

  getFirstAvailableModule(): string {
    return this.modulesCache?.[0] || this.mockModules[0];
  }

  hasAccess(moduleName: string): boolean {
    return this.modulesCache?.includes(moduleName) ?? false;
  }

  clearCache() {
    this.modulesCache = null;
    this.availableModules.next([]);
    this.grantService.clearCache();
  }
}
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private modulesCache: string[] | null = null;
  private availableModules = new BehaviorSubject<string[]>([]);

  // Mock modules data - just module names in title case
  private readonly mockModules = ['Reports', 'Users', 'Files'];

  constructor() {
    // Initialize with mock data
    this.availableModules.next(this.mockModules);
    this.modulesCache = this.mockModules;
  }

  getAvailableModules(): Observable<string[]> {
    if (this.modulesCache) {
      return of(this.modulesCache);
    }

    // Simulate API call
    return of(this.mockModules).pipe(
      tap(modules => {
        this.modulesCache = modules;
        this.availableModules.next(modules);
      })
    );
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
  }
}
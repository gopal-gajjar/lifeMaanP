import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface ModuleGrant {
  moduleName: string;
  allowedActions: string[];
}

@Injectable({
  providedIn: 'root'
})
export class GrantService {
  private grantsCache: Map<string, ModuleGrant> = new Map();

  constructor() {}

  getGrants(moduleNames: string[]): Observable<ModuleGrant[]> {
    // In real implementation, this would fetch from API
    return of<ModuleGrant[]>([]).pipe(
      tap((grants: ModuleGrant[]) => {
        grants.forEach(grant => {
          this.grantsCache.set(grant.moduleName, grant);
        });
      })
    );
  }

  hasGrant(moduleName: string, action: string): boolean {
    const grant = this.grantsCache.get(moduleName);
    return grant?.allowedActions.includes(action) ?? false;
  }

  clearCache() {
    this.grantsCache.clear();
  }
} 
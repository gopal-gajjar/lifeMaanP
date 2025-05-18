import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AccessService } from '../services/access.service';

@Injectable({
  providedIn: 'root'
})
export class AccessGuard implements CanActivate {
  constructor(
    private accessService: AccessService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const moduleName = route.data['module'];
    const action = route.data['action'];

    if (!moduleName || !action) {
      return false;
    }

    const hasAccess = this.accessService.hasAccess(moduleName, action);
    
    if (!hasAccess) {
      // Get the current module path from the URL
      const urlParts = state.url.split('/');
      const modulePath = urlParts[1]; // e.g., 'reports' from '/reports/list'
      
      // Redirect to the module-specific access-denied route
      this.router.navigate([`/${modulePath}/access-denied`]);
      return false;
    }

    return true;
  }
} 
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';

@Injectable()
export class IsAdminGuard implements CanActivate {
  constructor(private authenticationService: AuthentificationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.authenticationService.isAdmin()) {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}

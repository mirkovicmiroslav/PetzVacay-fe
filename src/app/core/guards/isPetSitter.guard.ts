import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';

@Injectable()
export class IsPetSitterGuard implements CanActivate {
  constructor(private authenticationService: AuthentificationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (!this.authenticationService.isPetSitter()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}

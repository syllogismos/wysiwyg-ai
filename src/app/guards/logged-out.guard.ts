import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from "app/services/auth.service";

// this guard protects from not going to register page when the user is already
// logged in

@Injectable()
export class LoggedOutGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isLoggedOut().then(isLoggedOut => {
      console.log(isLoggedOut)
      if (isLoggedOut) {
        return true
      } else {
        this.router.navigate(['/'])
        return false
      }
    })
  }
}

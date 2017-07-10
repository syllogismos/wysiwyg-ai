import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from "app/services/auth.service";


// this guard only allows pages when user is logged in.

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isLoggedOut().then(isLoggedOut => {
      console.log(isLoggedOut)
      if (isLoggedOut) {
        this.router.navigate(['/pages/login'], {queryParams: {returnUrl: state.url}})
        return false
      } else {
        return true
      }
    })
      
  }
}

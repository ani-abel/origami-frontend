import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class StudentAuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private readonly authService: AuthServiceService,
    private router: Router
  ){  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const isAuth: boolean = this.authService.isUserAStudent();
        if(!isAuth) {
          this.router.navigate(["/login"]);
        }

      return isAuth;
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const isAuth: boolean = this.authService.isUserAStudent();
      if(!isAuth) {
          this.router.navigate(["/login"]);
      }
    return isAuth;
  }

}

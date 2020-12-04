import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from './auth/auth.service';

@Injectable( { providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {

    let isAuthenticated = this.authService.isAuthenticated();
    // console.log(isAuthenticated);
    if (isAuthenticated) {
      console.log(route.url.toString());
      if (route.url.toString() == 'auth') {
        this.router.navigateByUrl('/');
        // return false;
      } else {
        console.log(route.url.toString());
        return true;
      }
      // return true;
    } else {
      if (route.url.toString() == 'auth') {
        return true;
      }
      this.router.navigateByUrl('/auth');
    }
  }

}

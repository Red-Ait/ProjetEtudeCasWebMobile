import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {


  constructor(
    public auth: AuthService,
    public router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log(this.auth.isAuthenticated());
    if (this.auth.isAuthenticated()) {
      this.router.navigate(['/location/map']);
      return false;
    }
    return true;
  }

}

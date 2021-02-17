import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {ERole} from '../@entities/ERole';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {


  constructor(private router: Router) {
  }

  isUserRole() {
    return localStorage.getItem('role') === ERole.ROLE_USER;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.isUserRole()) { return true; }
    this.router.navigate(['/main']);
  }

}

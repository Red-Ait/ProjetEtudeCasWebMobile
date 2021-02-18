import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {IUser} from '../../@entities/IUser';
import {Observable} from 'rxjs';
import {ERole} from '../../@entities/ERole';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userUrl = environment.apiUrl + environment.resourceUri.user;

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService
  ) {
  }

  addUser(user: IUser): Observable<any> {
    return this.http.post(this.userUrl , user);
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  isUserRole() {
    return localStorage.getItem('role') === ERole.ROLE_USER;
  }

}

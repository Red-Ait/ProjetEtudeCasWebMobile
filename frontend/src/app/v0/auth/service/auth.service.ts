import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {IUser} from '../../@entities/IUser';
import {Observable} from 'rxjs';
import {ERole} from '../../@entities/ERole';
import {ILogin} from '../../@entities/ILogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  registerUrl = environment.backendApiUrl + environment.resourceUri.register;
  loginUrl = environment.backendApiUrl + environment.resourceUri.authenticate;

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService
  ) {
  }

  addUser(user: IUser): Observable<any> {
    return this.http.post(this.registerUrl , user);
  }

  login(loginData: ILogin): Observable<any> {
    return this.http.post(this.loginUrl, loginData);
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  isUserRole() {
    return localStorage.getItem('role') === ERole.ROLE_USER;
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  logout() {
    localStorage.clear();
  }
}

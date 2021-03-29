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


  registerUrl = '';
  loginUrl = '';

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService
  ) {
    this.inutUri();
  }

  private inutUri() {
    const uri = localStorage.getItem('uri');
    this.registerUrl = uri + environment.resourceUri.register;
    this.loginUrl = uri + environment.resourceUri.authenticate;
  }
  addUser(user: IUser): Observable<any> {
    this.inutUri();
    return this.http.post(this.registerUrl , user);
  }

  login(loginData: ILogin): Observable<any> {
    this.inutUri();
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
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }
}

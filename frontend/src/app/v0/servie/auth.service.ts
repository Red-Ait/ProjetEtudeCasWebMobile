import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {IUser} from '../@entities/IUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userUrl = environment.apiUrl + environment.resourceUri.user;

  constructor(private http: HttpClient) {
  }

  addUser(user: IUser): Observable<any> {
    return this.http.post(this.userUrl , user);
  }

}

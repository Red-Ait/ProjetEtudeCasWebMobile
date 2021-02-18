import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class LocationApi {


  private apiUrl = environment.backendApiUrl;

  constructor(private http: HttpClient) {
  }

  getUserMapPoint(): Observable<any> {
    return this.http.get(this.apiUrl + '');
  }
}

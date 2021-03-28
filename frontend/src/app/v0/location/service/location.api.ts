import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable, of} from 'rxjs';
import {ITag} from '../../@entities/ITag';
import {ILocation} from '../../@entities/ILocation';

@Injectable()
export class LocationApi {

  locationUri = environment.backendApiUrl + environment.apiUrl + environment.resourceUri.location;

  constructor(private http: HttpClient) {
  }

  getUserMapPoint(): Observable<any> {
    return this.http.get(this.locationUri);
  }

  deleteMapPoint(locationId: number): Observable<any> {
    return this.http.delete(this.locationUri + '/' + locationId);
  }

  saveMapPoint(point: ILocation): Observable<any> {
    return this.http.post(this.locationUri, point);
  }
  updateMapPoint(point: ILocation): Observable<any> {
    return this.http.put(this.locationUri + '/' + point.id, point);
  }
  searchByTags(tags: Array<ITag>): Observable<any> {
    return this.http.post(this.locationUri + '/tags', tags);
  }
}

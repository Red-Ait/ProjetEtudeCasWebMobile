import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable, of} from 'rxjs';
import {ITag} from '../../@entities/ITag';
import {ILocation} from '../../@entities/ILocation';

@Injectable()
export class LocationApi {

  locationUri = '';

  constructor(private http: HttpClient) {
  }

  private unitUri() {
    const uri = localStorage.getItem('uri');
    this.locationUri = uri + environment.apiUrl + environment.resourceUri.location;
  }
  getUserMapPoint(): Observable<any> {
    this.unitUri();
    return this.http.get(this.locationUri);
  }

  deleteMapPoint(locationId: number): Observable<any> {
    this.unitUri();
    return this.http.delete(this.locationUri + '/' + locationId);
  }

  saveMapPoint(point: ILocation): Observable<any> {
    this.unitUri();
    return this.http.post(this.locationUri, point);
  }
  updateMapPoint(point: ILocation): Observable<any> {
    this.unitUri();
    return this.http.put(this.locationUri + '/' + point.id, point);
  }
  searchByTags(tags: Array<ITag>): Observable<any> {
    this.unitUri();
    return this.http.post(this.locationUri + '/tags', tags);
  }
  getSharedWithMeLocation(): Observable<any> {
    this.unitUri();
    return this.http.get(this.locationUri + '/shared');
  }
}

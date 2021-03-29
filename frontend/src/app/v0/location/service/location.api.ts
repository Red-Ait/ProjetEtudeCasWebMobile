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
  getSharedWithMeLocation(): Observable<any> {
    const mapPoints: Array<ILocation> = [
      {id: null, label: 'Marseille', latitude: 43.2964, longitude: 5.3700, tags: [{id: 1, label: 'UCA'}, {id: 1, label: 'Etude Sup'}]},
      {id: null, label: 'Rennes', latitude: 48.2247, longitude: -2.6794, tags: [{id: 2, label: 'UCA'}, {id: 2, label: 'Etude Sup'}]},
      {id: null, label: 'Grenoble', latitude: 45.2725, longitude: 5.7224, tags: [{id: 2, label: 'UCA'}, {id: 2, label: 'Etude Sup'}]},
      {id: null, label: 'Nantes', latitude: 47.2282, longitude: -2.5528, tags: [{id: 2, label: 'UCA'}, {id: 2, label: 'Etude Sup'}]},
      {id: null, label: 'Montpellier', latitude: 43.6229, longitude: 3.8772, tags: [{id: 2, label: 'UCA'}, {id: 2, label: 'Etude Sup'}]},
      {id: null, label: 'Lyon', latitude: 45.7600, longitude: 4.8400, tags: [{id: 2, label: 'UCA'}, {id: 2, label: 'Etude Sup'}]},
      {id: null, label: 'Rouen', latitude: 49.4428, longitude: 2.0886, tags: [{id: 2, label: 'UCA'}, {id: 2, label: 'Etude Sup'}]},
      {id: null, label: 'Strasbourg', latitude: 48.5833, longitude: 7.7458, tags: [{id: 2, label: 'UCA'}, {id: 2, label: 'Etude Sup'}]},
      {id: null, label: 'Nancy', latitude: 48.6936, longitude: 6.2846, tags: [{id: 2, label: 'UCA'}, {id: 2, label: 'Etude Sup'}]},
      {id: null, label: 'Metz', latitude: 49.2203, longitude: 6.2778, tags: [{id: 2, label: 'UCA'}, {id: 2, label: 'Etude Sup'}]},
    ];
    return of(mapPoints);
//    return this.http.get(this.locationUri);
  }
}

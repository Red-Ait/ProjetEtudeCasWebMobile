import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable, of} from 'rxjs';
import {IMapPoint} from '../../@entities/IMapPoint';
import {ITag} from '../../@entities/ITag';

@Injectable()
export class LocationApi {


  mapPoints: Array<IMapPoint> = [
    {id: 0, label: 'LIMOS', latitude: 45.76631844659534, longitude: 3.1004569123615515, tags: [{label: 'UCA'}, {label: 'Etude Sup'}, {label: 'Etude Sup'}, {label: 'Etude Sup'}, {label: 'Etude Sup'}, {label: 'Etude Sup'}, {label: 'Etude Sup'}, {label: 'Etude Sup'}]},
    {id: 1, label: 'Paris', latitude: 48.8566, longitude: 2.3522, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {id: 2, label: 'Nice', latitude: 43.7034, longitude: 7.2663, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {id: 3, label: 'Toulouse', latitude: 43.6045, longitude: 1.4440, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {id: 4, label: 'Marseille', latitude: 43.2964, longitude: 5.3700, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {id: 5, label: 'Rennes', latitude: 48.1147, longitude: -1.6794, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {id: 6, label: 'Grenoble', latitude: 45.1715, longitude: 5.7224, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {id: 7, label: 'Nantes', latitude: 47.2181, longitude: -1.5528, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {id: 8, label: 'Montpellier', latitude: 43.6119, longitude: 3.8772, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {id: 9, label: 'Lyon', latitude: 45.7600, longitude: 4.8400, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {id: 10, label: 'Rouen', latitude: 49.4428, longitude: 1.0886, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {id: 11, label: 'Strasbourg', latitude: 48.5833, longitude: 7.7458, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {id: 12, label: 'Nancy', latitude: 48.6936, longitude: 6.1846, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
    {id: 14, label: 'Metz', latitude: 49.1203, longitude: 6.1778, tags: [{label: 'UCA'}, {label: 'Etude Sup'}]},
  ];

  private apiUrl = environment.backendApiUrl;

  constructor(private http: HttpClient) {
  }

  getUserMapPoint(): Observable<Array<IMapPoint>> {
//    return this.http.get(this.apiUrl + '');
    return of(this.mapPoints);
  }

  deleteMapPoint(point: IMapPoint): Observable<boolean> {
    return of(true);
  }

  saveMapPoint(point: IMapPoint): Observable<IMapPoint> {
    point.id = 0;
    return of(point);
  }
  updateMapPoint(point: IMapPoint): Observable<IMapPoint> {
    return of(point);
  }
  searchByTags(point: Array<ITag>): Observable<Array<IMapPoint>> {
    return of(this.mapPoints.slice(2, 7));
  }
}

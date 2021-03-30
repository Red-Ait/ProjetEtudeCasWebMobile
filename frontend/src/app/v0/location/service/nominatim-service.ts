import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {NominatimResponse} from '../models/nominatim-response.model';

@Injectable()
export class NominatimService {

  DEFAULT_LATITUDE = 51.4820845;
  DEFAULT_LONGITUDE = 0;

  BASE_NOMINATIM_URL = 'nominatim.openstreetmap.org';
  DEFAULT_VIEW_BOX = 'viewbox=-25.0000%2C70.0000%2C50.0000%2C40.0000';

  constructor(private http: HttpClient) {
  }

  addressLookup(req?: any): Observable<NominatimResponse[]> {
    const url = `https://${this.BASE_NOMINATIM_URL}/search?format=json&q=${req}&${this.DEFAULT_VIEW_BOX}&bounded=1`;
    return this.http
      .get(url).pipe(
        map((data: any[]) => data.map((item: any) => new NominatimResponse(
          item.lat,
          item.lon,
          item.display_name
          ))
        )
      );
  }

}

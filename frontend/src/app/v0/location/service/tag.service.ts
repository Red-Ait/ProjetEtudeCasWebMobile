import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  tagUri = environment.backendApiUrl + environment.apiUrl + environment.resourceUri.tag;

  constructor(private http: HttpClient) { }

  addTag(tag){
    return this.http.post(this.tagUri, tag).pipe(map(resp => resp));
  }

  getAllTag(): Observable<any> {
    return this.http.get(this.tagUri);
  }

  deleteTag(idTag: number){
    return this.http.delete(this.tagUri + idTag).pipe(map(resp => resp));
  }

  updateTag(tag){
    return this.http.put(this.tagUri, tag).pipe(map(resp => resp));

  }


  getTagBylabel(label){
    return this.http.get(this.tagUri, label).pipe(map(resp => resp));

  }
}

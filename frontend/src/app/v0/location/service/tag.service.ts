import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagService {


  tagUri = '';

  constructor(private http: HttpClient) {
  }

  private initUri() {
    const uri = localStorage.getItem('uri');
    this.tagUri = uri + environment.apiUrl + environment.resourceUri.tag;
  }
  addTag(tag){
    this.initUri();
    return this.http.post(this.tagUri, tag).pipe(map(resp => resp));
  }

  getAllTag(): Observable<any> {
    this.initUri();
    return this.http.get(this.tagUri);
  }

  deleteTag(idTag: number){
    this.initUri();
    return this.http.delete(this.tagUri + idTag).pipe(map(resp => resp));
  }

  updateTag(tag){
    this.initUri();
    return this.http.put(this.tagUri, tag).pipe(map(resp => resp));
  }


  getTagBylabel(label){
    this.initUri();
    return this.http.get(this.tagUri, label).pipe(map(resp => resp));
  }
}

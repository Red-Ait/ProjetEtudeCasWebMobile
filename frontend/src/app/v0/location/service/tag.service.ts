import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  addTag(tag){
    return this.http.post('http://localhost:8080/tag/', tag).pipe(map(resp => resp));
  }

  getAllTag(): Observable<any> {
    return this.http.get('http://localhost:8080/tags/').pipe(map(resp => resp));
  }

  deleteTag(idTag: number){
    return this.http.delete('http://localhost:8080/tag/' + idTag).pipe(map(resp => resp));
  }

  updateTag(tag){
    return this.http.put('http://localhost:8080/tag/', tag).pipe(map(resp => resp));

  }


  getTagBylabel(label){
    return this.http.get('http://localhost:8080/tag/', label).pipe(map(resp => resp));

  }
}

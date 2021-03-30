import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {ITag} from "../../@entities/ITag";

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }
  Uri = environment.backendApiUrl + environment.apiUrl;
  tagUri = environment.backendApiUrl + environment.apiUrl + environment.resourceUri.tag;
  locationUri = environment.backendApiUrl + environment.apiUrl + environment.resourceUri.location;



  addTag(tag){
    return this.http.post(this.tagUri, tag);
  }

  getAllTag(): Observable<any> {
    return this.http.get(this.tagUri);
  }

  deleteTag(idTag: number){
    return this.http.delete(this.tagUri + '/' +  idTag);
  }

  updateTag(id, tag){
    return this.http.put(this.tagUri + '/' + id, tag);

  }

  getTagBylabel(label){
    return this.http.get(this.tagUri, label);

  }

  shareLocationsWithAnotherUserByTagTitles(otherUsername: string, tagTitles: string[]){
  // @ts-ignore
    return  this.http.put(this.locationUri + '/other_user' + '/' + otherUsername + '/tags/' + tagTitles);
}

  getUserNames(){
    return this.http.get(this.Uri + '/userNames' );
  }

}

import {Component, OnInit} from '@angular/core';
import {ICollection} from '../../../@entities/iCollection';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent implements OnInit {

  collections = [] as Array<ICollection>;
  collection = {} as ICollection;

  constructor() { }

  ngOnInit() {
    this.initCollections();
  }

  initCollections() {
    this.collections = [
      {id: 1, name: 'collection 1'},
      {id: 2, name: 'collection 2'},
      {id: 3, name: 'collection 3'}
    ];
  }

  addCollection(collection: ICollection) {
    this.collections.push(collection);
    this.collection = {} as ICollection;
  }

  removeCollection(collection: ICollection) {
    this.collections.splice(
      this.collections.map(
        (
          n) => n.id).indexOf(collection.id),
        1
    )
    ;
  }

  editCollection(collection: ICollection) {
    this.removeCollection(collection);
    this.collection = collection;
  }

  isButtonDisabled() {
    return this.collection.name == null;
  }

}

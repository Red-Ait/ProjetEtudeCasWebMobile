import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TagsComponent} from './containers/tags/tags.component';
import {CollectionComponent} from "./containers/collection/collection.component";

const routes: Routes = [
  { path: 'tags', component: TagsComponent },
  { path: 'collections', component: CollectionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }

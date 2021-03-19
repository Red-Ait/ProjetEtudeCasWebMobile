import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TagsComponent} from './containers/tags/tags.component';
import {MapComponent} from "./containers/map/map.component";

const routes: Routes = [
  { path: 'tags', component: TagsComponent },
  { path: 'map', component: MapComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }

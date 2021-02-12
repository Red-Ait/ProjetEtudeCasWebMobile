import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TagsComponent} from './containers/tags/tags.component';

const routes: Routes = [
  { path: 'tags', component: TagsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }

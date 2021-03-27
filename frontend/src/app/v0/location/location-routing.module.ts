import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TagsComponent} from './containers/tags/tags.component';
import {MainLocationComponent} from './containers/main-location/main-location.component';
import {MapComponent} from './containers/map/map.component';
import {CollectionComponent} from './containers/collection/collection.component';
import {UserGuard} from '../interceptors/user.guard';
import {AuthGuard} from '../interceptors/auth.guard';

const routes: Routes = [
  { path: '', component: MainLocationComponent, children: [
      {path: 'tags', component: TagsComponent},
      {path: 'map', component: MapComponent},
      { path: 'collections', component: CollectionComponent }
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }

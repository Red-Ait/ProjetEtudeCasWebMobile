import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TagsComponent} from './containers/tags/tags.component';
import {MainLocationComponent} from './containers/main-location/main-location.component';
import {MapComponent} from './containers/map/map.component';
import {AuthGuard} from '../interceptors/auth.guard';
import {SettingComponent} from './containers/setting/setting.component';

const routes: Routes = [
  { path: '', component: MainLocationComponent, children: [
      {path: 'tags', component: TagsComponent},
      {path: 'map', component: MapComponent},
      {path: 'setting', component: SettingComponent},
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }

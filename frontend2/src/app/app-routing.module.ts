import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./v0/auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: 'location',
    loadChildren: () => import('./v0/location/location.module').then( m => m.LocationModule)
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

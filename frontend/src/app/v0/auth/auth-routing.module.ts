import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './component';
import {RegisterComponent} from './component/register/register.component';
import {AuthContainerComponent} from './container/auth-container/auth-container.component';

const routes: Routes = [
  { path: '', component: AuthContainerComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {components} from './component';
import {containers} from './container';
import {IonicModule} from '@ionic/angular';


@NgModule({
  declarations: [...components, ...containers],
  imports: [
    CommonModule,
    AuthRoutingModule,
    IonicModule
  ]
})
export class AuthModule { }

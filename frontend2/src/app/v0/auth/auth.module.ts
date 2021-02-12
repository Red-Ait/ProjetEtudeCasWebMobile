import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import {components} from './component';


@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }

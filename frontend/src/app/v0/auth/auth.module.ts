import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {components} from './component';
import {containers} from './container';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [...components, ...containers],
    imports: [
        CommonModule,
        AuthRoutingModule,
        IonicModule,
        FormsModule
    ]
})
export class AuthModule { }

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthRoutingModule} from './auth-routing.module';
import {components} from './component';
import {containers} from './container';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';
import {NgxsModule} from '@ngxs/store';
import {AppState} from './state/app.state';

@NgModule({
  declarations: [...components, ...containers],
    imports: [
        NgxsModule.forFeature([AppState]),
        CommonModule,
        AuthRoutingModule,
        IonicModule,
        FormsModule
    ],
    providers: [
      { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
      JwtHelperService
    ]
})
export class AuthModule { }

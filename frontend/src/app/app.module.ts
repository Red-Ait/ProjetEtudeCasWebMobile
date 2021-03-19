import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {NgxsLoggerPluginModule} from '@ngxs/logger-plugin';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {StoreModule} from '@ngrx/store';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthModule} from './v0/auth/auth.module';
import {NgxsModule} from '@ngxs/store';
import {AuthGuard} from './v0/interceptors/auth.guard';
import {UserGuard} from './v0/interceptors/user.guard';
import {HttpListenerService, HTTPStatus} from './v0/interceptors/http-listener.service';
import {InsertAuthTokenInterceptorService} from './v0/interceptors/insert-auth-token-interceptor.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    AuthModule,
    HttpClientModule,
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {}),
    NgxsModule.forRoot([]),
    BrowserAnimationsModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthGuard,
    UserGuard,
    HttpListenerService,
    HTTPStatus,
    { provide: HTTP_INTERCEPTORS, useClass: InsertAuthTokenInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpListenerService, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

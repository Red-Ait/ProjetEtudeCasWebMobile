import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LocationRoutingModule} from './location-routing.module';
import {containers} from './containers';
import {IonicModule} from '@ionic/angular';
import {components} from './components';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipsModule} from '@angular/material/chips';
import {CollectionComponent} from './containers/collection/collection.component';
import {MatIconModule} from '@angular/material/icon';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxsModule} from '@ngxs/store';
import {LocationState} from './state/location.state';
import {LeafletMarkerClusterModule} from '@asymmetrik/ngx-leaflet-markercluster';
import {services} from './service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {pipes} from './pipes';


@NgModule({
  declarations: [...containers, ...components, ...pipes],
  imports: [
    CommonModule,
    LocationRoutingModule,
    IonicModule,
    FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    LocationRoutingModule,
    FormsModule,
    MatIconModule,
    NgbModule,
    NgxsModule.forFeature([LocationState]),
    LeafletMarkerClusterModule,
    LeafletModule
  ],
  providers: [...services, Geolocation],
  exports: [CollectionComponent]
})
export class LocationModule { }

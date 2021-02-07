import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LocationRoutingModule} from './location-routing.module';
import {CollectionComponent} from "./containers/collection/collection.component";
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [CollectionComponent],
  imports: [
    CommonModule,
    LocationRoutingModule,
    FormsModule,
    MatIconModule
  ],
  exports: [CollectionComponent]
})
export class LocationModule { }

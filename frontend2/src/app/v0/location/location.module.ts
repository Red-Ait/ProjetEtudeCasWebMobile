import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationRoutingModule } from './location-routing.module';
import {containers} from './containers';
import {IonicModule} from '@ionic/angular';
import {components} from './components';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatChipsModule} from "@angular/material/chips";


@NgModule({
  declarations: [...containers, ...components],
  imports: [
    CommonModule,
    LocationRoutingModule,
    IonicModule,
    FormsModule,
    MatFormFieldModule,
    MatChipsModule,
  ]
})
export class LocationModule { }

import { Component, OnInit } from '@angular/core';
import {Store} from '@ngxs/store';
import {SetBackendUri} from '../../state/location.action';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {

  uri: string;
  constructor(private store: Store) { }

  ngOnInit() {
    this.uri = localStorage.getItem('uri');
  }

  save() {
    this.store.dispatch(new SetBackendUri(this.uri));
  }
}

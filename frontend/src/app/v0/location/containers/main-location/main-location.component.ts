import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {Logout} from '../../../auth/state/auth.action';
import {ToggleSideMenu} from '../../state/location.action';

@Component({
  selector: 'app-main-location',
  templateUrl: './main-location.component.html',
  styleUrls: ['./main-location.component.scss'],
})
export class MainLocationComponent implements OnInit {

  public appPages = [
    { title: 'Maps', url: '/location/map', icon: 'map' },
    { title: 'Tags', url: '/location/tags', icon: 'pricetags' },
    { title: 'Shared', url: '/folder/Trash', icon: 'share-social' },
    { title: 'Log out', url: '/auth/login', icon: 'log-out' },
  ];
  public labels = [];

  constructor(private store: Store) { }

  ngOnInit() {
  }
  logout(p: any) {
    if (p.title === 'Log out') {
      this.store.dispatch(new Logout());
    }
  }
  toggleMenu(t: boolean) {
    this.store.dispatch(new ToggleSideMenu(t));
  }
}

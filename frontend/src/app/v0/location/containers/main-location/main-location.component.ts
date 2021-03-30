import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {GetCurrentUser, Logout} from '../../../auth/state/auth.action';
import {ToggleSideMenu} from '../../state/location.action';
import {IUser} from '../../../@entities/IUser';
import {ERole} from '../../../@entities/ERole';
import {LocationState} from '../../state/location.state';
import {AppState} from '../../../auth/state/app.state';

@Component({
  selector: 'app-main-location',
  templateUrl: './main-location.component.html',
  styleUrls: ['./main-location.component.scss'],
})
export class MainLocationComponent implements OnInit {

  public appPages = [
    { title: 'Maps', url: '/location/map', icon: 'map' },
    { title: 'Tags', url: '/location/tags', icon: 'pricetags' },
    { title: 'Setting', url: '/location/setting', icon: 'settings' },
    { title: 'Log out', url: '/auth/login', icon: 'log-out' },
  ];
  public labels = [];
  currentUser: IUser = {
    email: '',
    firstName: '',
    id: 0,
    lastName: '',
    password: '',
    roles: new Array<ERole>(),
    username: ''
  };
  @Select(AppState.getCurrentUser) $currentUser;

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new GetCurrentUser());
    this.$currentUser.subscribe(u => {
      if (u !== null) {
        this.currentUser = u;
      }
    });
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

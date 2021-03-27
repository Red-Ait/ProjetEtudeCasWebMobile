import {Component, OnInit} from '@angular/core';
import {ILogin} from '../../../@entities/ILogin';
import {Store} from '@ngxs/store';
import {Login} from '../../state/auth.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginData: ILogin = {
    username: '',
    password: ''
  };
  constructor(private store: Store) { }

  ngOnInit() {}
  login() {
    this.store.dispatch(new Login(this.loginData));
  }
}

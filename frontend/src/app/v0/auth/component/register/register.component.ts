import {Component, OnDestroy, OnInit} from '@angular/core';
import {IUser} from '../../../@entities/IUser';
import {Store} from '@ngxs/store';
import {Register} from '../../state/auth.action';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {

  user = {} as IUser;

  constructor(
    private store: Store
  ) {  }

  ngOnInit() {}

  ngOnDestroy(): void {
  }

  submit() {
    this.store.dispatch(new Register(this.user));
  }
}

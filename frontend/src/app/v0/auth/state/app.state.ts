import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {IUser} from '../../@entities/IUser';
import * as authAction from './auth.action';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

export class AppStateModel {
  currentUser: IUser;
  alertError: string;
}

@State<AppStateModel>({
  name: 'AppState',
  defaults: {
    currentUser: null,
    alertError: null,
  }
})

@Injectable()
export class AppState {

  constructor(
    private authService: AuthService,
    public alertController: AlertController,
    private router: Router
  ) {
  }

  /************       App Selectors           ********************/

  @Selector()
  static getCurrentUser(state: AppStateModel) {
    return state.currentUser;
  }

  @Selector()
  static getAlertError(state: AppStateModel) {
    return state.alertError;
  }

  /************       App Reducers           ********************/

  @Action(authAction.Register)
  register(ctx: StateContext<AppState>, {payload}: authAction.Register) {
    this.authService.addUser(payload)
      .subscribe(result => {
        console.log(result);
        ctx.dispatch(new authAction.RegisterSuccess());
      });
  }

  @Action(authAction.RegisterSuccess)
  registerSuccess(ctx: StateContext<AppState>) {
    this.router.navigate(['/auth/login']);
  }

  @Action(authAction.RegisterFailed)
  async registerFail(ctx: StateContext<AppState>) {
  }
}

import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {IUser} from '../../@entities/IUser';
import * as authAction from './auth.action';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {GetCurrentUserSuccess} from './auth.action';

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
  register(ctx: StateContext<AppStateModel>, {payload}: authAction.Register) {
    this.authService.addUser(payload)
      .subscribe(result => {
        ctx.dispatch(new authAction.LoginSuccess(result));
      });
  }

  @Action(authAction.Login)
  login(ctx: StateContext<AppStateModel>, {payload}: authAction.Login) {
    this.authService.login(payload)
      .subscribe(result => {
        ctx.dispatch(new authAction.LoginSuccess(result));
      });
  }

  @Action(authAction.LoginSuccess)
  registerSuccess(ctx: StateContext<AppStateModel>, {payload}: authAction.LoginSuccess) {
    this.authService.setToken(payload.jwttoken);
    this.router.navigate(['/location/map']);
  }

  @Action(authAction.Logout)
  logout(ctx: StateContext<AppStateModel>) {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  @Action(authAction.GetCurrentUser)
  currentUser(ctx: StateContext<AppStateModel>) {
    this.authService.currentUser().subscribe(u => {
      console.log(u);
      ctx.dispatch(new GetCurrentUserSuccess(u));
    });
  }

  @Action(authAction.GetCurrentUserSuccess)
  getCurrentUserSuccess(ctx: StateContext<AppStateModel>, {payload}: authAction.GetCurrentUserSuccess) {
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      currentUser: payload
    });
  }


}

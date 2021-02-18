import {Injectable} from '@angular/core';
import {Selector, State} from '@ngxs/store';
import {IUser} from '../@entities/IUser';

export class AppStateModel {
  currentUser: IUser;
  connexionFail: string;
}

@State<AppStateModel>({
  name: 'AppState',
  defaults: {
    currentUser: null,
    connexionFail: null,
  }
})

@Injectable()
export class AppState {

  constructor() {
  }

  /************       App Selectors           ********************/

  @Selector()
  static getCurrentUser(state: AppStateModel) {
    return state.currentUser;
  }

  /************       App Reducers           ********************/

}

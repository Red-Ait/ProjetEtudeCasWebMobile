import {IUser} from '../../@entities/IUser';
import {ILogin} from '../../@entities/ILogin';

export class Register {

  static readonly type = '[auth/register] register';

  constructor(public payload: IUser) {
  }
}


export class RegisterFailed {

  static readonly type = '[auth/register] register Failed';

  constructor(public payload: string) {
  }
}

export class Login {

  static readonly type = '[auth/login] login';

  constructor(public payload: ILogin) {
  }
}

export class LoginSuccess {

  static readonly type = '[auth/login] login Success';

  constructor(public payload: any) {
  }
}

export class LoginFailed {

  static readonly type = '[auth/login] login Failed';

  constructor(public payload: string) {
  }
}
export class Logout {

  static readonly type = '[auth/logout] logout';

  constructor() {
  }
}

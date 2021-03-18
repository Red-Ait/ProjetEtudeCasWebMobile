import {IUser} from '../../@entities/IUser';

export class Register {

  static readonly type = '[auth/register] register';

  constructor(public payload: IUser) {
  }
}

export class RegisterSuccess {

  static readonly type = '[auth/register] register success';

  constructor() {
  }
}

export class RegisterFailed {

  static readonly type = '[auth/register] register Failed';

  constructor(public payload: string) {
  }
}

export class Login {

  static readonly type = '[auth/login] login';

  constructor(public payload: { username: string, password: string }) {
  }
}

export class LoginSuccess {

  static readonly type = '[auth/login] login Success';

  constructor(public payload: IUser) {
  }
}

export class LoginFailed {

  static readonly type = '[auth/login] login Failed';

  constructor(public payload: string) {
  }
}

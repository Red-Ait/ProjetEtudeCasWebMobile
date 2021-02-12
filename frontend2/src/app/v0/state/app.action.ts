export class Register {

  static readonly type = '[auth/register] register';

  constructor(public payload: any) {
  }
}

export class Login {

  static readonly type = '[auth/login] login';

  constructor(public payload: any) {
  }
}

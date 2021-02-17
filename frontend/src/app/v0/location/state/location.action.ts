import {IMapPoint} from '../../@entities/IMapPoint';

export class GetUserMapPoint {
  static readonly type = '[location/map] get user map point';
  constructor() {
  }
}

export class GetUserMapPointSuccess {
  static readonly type = '[location/map] get user map point success';
  constructor(public payload: Array<IMapPoint>) {
  }
}

export class GetUserMapPointFail {
  static readonly type = '[location/map] get user map point fail';
  constructor(public payload: string) {
  }
}

export class GetUserMapPointByTag {
  static readonly type = '[location/map] get user map point by tag';
  constructor() {
  }
}

export class GetUserMapPointByTagSuccess {
  static readonly type = '[location/map] get user map point by tag success';
  constructor(public payload: Array<IMapPoint>) {
  }
}
export class GetUserMapPointByTagFail {
  static readonly type = '[location/map] get user map point by tag fail';
  constructor(public payload: string) {
  }
}


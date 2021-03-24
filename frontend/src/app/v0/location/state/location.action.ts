import {ILocation} from '../../@entities/ILocation';
import {ITag} from '../../@entities/ITag';

export class GetUserMapPoint {
  static readonly type = '[location/map] get user map point';
  constructor() {
  }
}

export class GetUserMapPointSuccess {
  static readonly type = '[location/map] get user map point success';
  constructor(public payload: Array<ILocation>) {
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
  constructor(public payload: Array<ILocation>) {
  }
}
export class GetUserMapPointByTagFail {
  static readonly type = '[location/map] get user map point by tag fail';
  constructor(public payload: string) {
  }
}

export class SavePosition {
  static readonly type = '[location/map] save position';
  constructor(public payload: ILocation) {
  }
}

export class SavePositionSuccess {
  static readonly type = '[location/map] save position success';
  constructor(public payload: ILocation) {
  }
}
export class SavePositionFail {
  static readonly type = '[location/map] save position fail';
  constructor(public payload: string) {
  }
}

export class UpdatePosition {
  static readonly type = '[location/map] update position';
  constructor(public payload: ILocation) {
  }
}

export class UpdatePositionSuccess {
  static readonly type = '[location/map] update position success';
  constructor(public payload: ILocation) {
  }
}
export class UpdatePositionFail {
  static readonly type = '[location/map] update position fail';
  constructor(public payload: string) {
  }
}

export class DeletePosition {
  static readonly type = '[location/map] delete position';
  constructor(public payload: ILocation) {
  }
}

export class DeletePositionSuccess {
  static readonly type = '[location/map] delete position success';
  constructor(public payload: ILocation) {
  }
}
export class DeletePositionFail {
  static readonly type = '[location/map] delete position fail';
  constructor(public payload: string) {
  }
}
export class SearchByTags {
  static readonly type = '[location/map] search by tags';
  constructor(public payload: Array<string>) {
  }
}

export class SearchByTagsSuccess {
  static readonly type = '[location/map] Search By Tags success';
  constructor(public payload: Array<ILocation>) {
  }
}

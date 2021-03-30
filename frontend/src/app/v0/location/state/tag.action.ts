import {ITag} from '../../@entities/ITag';
import {ILocation} from '../../@entities/ILocation';

export class GetTags {
  static readonly type = '[tags] get tags';
  constructor() {
  }
}

export class GetTagsSuccess {
  static readonly type = '[tags] get tags success';
  constructor(public payload: Array<ITag>) {
  }
}

export class GetTagsFail {
  static readonly type = '[tags] get tags fail';
  constructor(public payload: string) {
  }
}

export class AddTag {
  static readonly type = '[Tag] Add  tag';

  constructor(public payload: ITag) {
  }
}

export class AddTagSuccess {
  static readonly type = '[Tag] Add tag success';
  constructor(public payload: any) {
  }
}
export class AddTagFail {
  static readonly type = '[Tag] Add tag fail';

  constructor(public payload: string) {
  }
}

export class UpdateTag {
  static readonly type = '[Tag] Update tag';
  constructor(public id: number, public payload: ITag) {
  }
}

export class UpdateTagSuccess {
  static readonly type = '[Tag] Update tag success';
  constructor(public id: any, public payload: any) {
  }
}

export class UpdateTagFail {
  static readonly type = '[Tag] Update tag fail';
  constructor(public payload: string) {
  }
}

export class DeleteTag {
  static readonly type = '[Tag] Delete tag';
  constructor(public payload: number) {
  }
}

export class DeleteTagSuccess {
  static readonly type = '[Tag] Delete tag success';
  constructor(public payload: any) {
  }
}

export class DeleteTagFail {
  static readonly type = '[Tag] Delete tag fail';
  constructor(public payload: string) {
  }
}

export class GetTagByLabel {
  static readonly type = '[tag] get tag  by label';
  constructor(public payload: string) {
  }
}

export class  GetTagByLabelSuccess {
  static readonly type = '[tag] get tag  by label success';
  constructor(public payload: any) {
  }
}
export class  GetTagByLabelFail {
  static readonly type = '[tag] get tag  by label fail';
  constructor(public payload: string) {
  }
}
export class ShareLocationsWithAnotherUserByTagTitles {
  static readonly type = '[tag] share location';

  constructor(public username, public payload: string[]) {
  }
}

export class  ShareLocationsWithAnotherUserByTagTitlesSuccess {
  static readonly type = '[tag] share location success';
  constructor(public payload: any) {
  }
}
export class  ShareLocationsWithAnotherUserByTagTitlesFail {
  static readonly type = '[tag] share location fail';
  constructor(public payload: string) {
  }
}

export class GetUserNames {
  static readonly type = '[tag] get Usernames';
  constructor() {
  }
}
export class GetUserNamesSuccess {
  static readonly type = '[tag] get Usernames';
  constructor(public payload: any) {
  }
}
export class GetUserNamesFail {
  static readonly type = '[tag] get Usernames';
  constructor(public payload: string) {
  }
}





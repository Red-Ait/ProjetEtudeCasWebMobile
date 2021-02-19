import {ITag} from '../../@entities/ITag';

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
  constructor(public payload: string) {
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
  constructor(public payload: string) {
  }
}

export class UpdateTagSuccess {
  static readonly type = '[Tag] Update tag success';
  constructor(public payload: any) {
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







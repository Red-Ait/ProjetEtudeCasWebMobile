import {ITag} from '../../@entities/ITag';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import * as tagAction from './tag.action';
import {
  AddTagFail,
  AddTagSuccess,
  DeleteTagSuccess,
  GetTagByLabelFail,
  GetTagByLabelSuccess, GetTags, GetTagsFail, GetTagsSuccess,
  UpdateTagFail,
  UpdateTagSuccess
} from './tag.action';
import {TagService} from '../service/tag.service';

export class TagStateModel {
  tags: Array<ITag>;
  searchedtags: Array<ITag>;
  tag: {
    id: number,
    label: string
  };
}

@State<TagStateModel>({
  name: 'tagState',
  defaults: {
    tags: [],
    searchedtags: [],
    tag : null
  }
})

@Injectable()
export class TagState {
  constructor(private tagApi: TagService) {
  }

  /************       App Selectors           ********************/


  @Selector()
  static getTags(state: TagStateModel) {
    return state.tags;
  }



  @Action(tagAction.GetTags)
  getTags(ctx: StateContext<TagStateModel>) {
    this.tagApi.getAllTag().subscribe(data => {
      ctx.dispatch(new GetTagsSuccess(data));
    }, error => {
      ctx.dispatch(new GetTagsFail(error));
    });
  }

  @Action(tagAction.GetTagsSuccess)
  getTagSuccess(ctx: StateContext<TagStateModel>, {payload}: tagAction.GetTagsSuccess) {
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      tags: payload
    });
  }

  @Action(tagAction.AddTag)
  addTag(ctx: StateContext<TagStateModel>, {payload}: tagAction.AddTag) {
    this.tagApi.addTag(payload).subscribe(data => {
      ctx.dispatch(new AddTagSuccess(data));
    }, error => {
      ctx.dispatch(new AddTagFail(error));
    });
  }

  @Action(tagAction.AddTagSuccess)
  addTagSuccess(ctx: StateContext<TagStateModel>, {payload}: tagAction.AddTagSuccess) {
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      tag: payload
    });
  }

  @Action(tagAction.DeleteTag)
  deleteTag(ctx: StateContext<TagStateModel>, {payload}: tagAction.DeleteTag) {
    this.tagApi.deleteTag(payload)
      .subscribe(r => {
        ctx.dispatch(new DeleteTagSuccess({ deletedTag: payload}));
      });
  }

  @Action(tagAction.DeleteTagSuccess)
  deleteTagSuccess(ctx: StateContext<TagStateModel>, {payload}: tagAction.DeleteTagSuccess) {
    const state = ctx.getState();
    ctx.patchState({
      ...state,
    });
  }

  @Action(tagAction.UpdateTag)
  updateTag(ctx: StateContext<TagStateModel>, {payload}: tagAction.UpdateTag) {
    this.tagApi.updateTag(payload.id, payload).subscribe(data => {
      ctx.dispatch(new UpdateTagSuccess(payload.id, payload));
    }, error => {
      ctx.dispatch(new UpdateTagFail(error));
    });
  }


  @Action(tagAction.UpdateTagSuccess)
  updateTagSuccess(ctx: StateContext<TagStateModel>, {payload}: tagAction.UpdateTagSuccess) {
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      tags: state.tags.map(p => p.id === payload.id ? payload : p)
    });
  }

  @Action(tagAction.GetTagByLabel)
  getTagByLabel(ctx: StateContext<TagStateModel>, {payload}: tagAction.GetTagByLabel) {
    this.tagApi.getTagBylabel(payload).subscribe(data => {
      ctx.dispatch(new GetTagByLabelSuccess(data));
    }, error => {
      ctx.dispatch(new GetTagByLabelFail(error));
    });
  }

  @Action(tagAction.GetTagByLabelSuccess)
  getTagByLabelSuccess(ctx: StateContext<TagStateModel>, {payload}: tagAction.GetTagByLabelSuccess) {
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      tag: payload
    });
  }





}

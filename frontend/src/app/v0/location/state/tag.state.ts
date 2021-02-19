import {IMapPoint} from "../../@entities/IMapPoint";
import {ITag} from "../../@entities/ITag";
import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import * as tagAction from "./tag.action";
import {TagService} from "../service/tag.service";
import {
  AddTagFail,
  AddTagSuccess,
  DeleteTagSuccess, GetTagByLabelFail,
  GetTagByLabelSuccess,
  UpdateTagFail,
  UpdateTagSuccess
} from "./tag.action";

export class TagStateModel {
  tags: Array<ITag>;
  tag:{
    idTag:number,
    label:string
  }
}

@State<TagStateModel>({
  name: 'tagState',
  defaults: {
    tags: [],
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
  deleteFile(ctx: StateContext<TagStateModel>, {payload}: tagAction.DeleteTag) {
    this.tagApi.deleteTag(payload)
      .subscribe(r => {
        ctx.dispatch(new DeleteTagSuccess({ deletedTag: payload}));
      });
  }

  @Action(tagAction.DeleteTagSuccess)
  deleteFileSuccess(ctx: StateContext<TagStateModel>, {payload}: tagAction.DeleteTagSuccess) {
    const state = ctx.getState();
    ctx.patchState({
      ...state,
    });
  }

  @Action(tagAction.UpdateTag)
  updateUploadProgress(ctx: StateContext<TagStateModel>, {payload}: tagAction.UpdateTag) {
      this.tagApi.updateTag(payload).subscribe(data => {
        ctx.dispatch(new UpdateTagSuccess(data));
      }, error => {
        ctx.dispatch(new UpdateTagFail(error));
      });
    }


  @Action(tagAction.UpdateTagSuccess)
  updateUploadStatus(ctx: StateContext<TagStateModel>, {payload}: tagAction.UpdateTagSuccess) {

    const state = ctx.getState();
    ctx.patchState({
      ...state,
      tag: payload
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

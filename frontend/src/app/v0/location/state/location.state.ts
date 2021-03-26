import {ILocation} from '../../@entities/ILocation';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {ITag} from '../../@entities/ITag';
import * as locationAction from './location.action';
import {
  DeletePositionSuccess,
  GetUserMapPointFail,
  GetUserMapPointSuccess,
  SavePositionFail,
  SavePositionSuccess, SearchByTagsSuccess, UpdatePosition, UpdatePositionSuccess
} from './location.action';
import {LocationApi} from '../service/location.api';

export class LocationStateModel {
  mapPoints: Array<ILocation>;
  pointsSearchedByTags: Array<ILocation>;
  tags: Array<ITag>;
}

@State<LocationStateModel>({
  name: 'locationState',
  defaults: {
    mapPoints: [],
    pointsSearchedByTags: [],
    tags: []
  }
})

@Injectable()
export class LocationState {
  constructor(private locationApi: LocationApi) {
  }

  /************       App Selectors           ********************/

  @Selector()
  static getMapPoints(state: LocationStateModel) {
    return state.mapPoints;
  }

  @Selector()
  static getTags(state: LocationStateModel) {
    return state.tags;
  }

  @Selector()
  static getPointsSearchedByTags(state: LocationStateModel) {
    return state.pointsSearchedByTags;
  }
  @Selector()
  static searchPositionByName(state: LocationStateModel) {
    return (query: string) =>
      state.mapPoints.filter(pt => pt.label.trim().toLowerCase().includes(query.trim().toLowerCase()));
  }
  @Action(locationAction.GetUserMapPoint)
  getUserMapPoint(ctx: StateContext<LocationStateModel>) {
    this.locationApi.getUserMapPoint().subscribe(data => {
      console.log(data);
      ctx.dispatch(new GetUserMapPointSuccess(data));
    }, error => {
      ctx.dispatch(new GetUserMapPointFail(error));
    });
  }

  @Action(locationAction.GetUserMapPointSuccess)
  getUserMapPointSuccess(ctx: StateContext<LocationStateModel>, {payload}: locationAction.GetUserMapPointSuccess) {
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      mapPoints: payload
    });
  }
  @Action(locationAction.SavePosition)
  saveMapPoint(ctx: StateContext<LocationStateModel>, {payload}: locationAction.SavePosition) {
    this.locationApi.saveMapPoint(payload).subscribe(data => {
      ctx.dispatch(new SavePositionSuccess(data));
    }, error => {
      ctx.dispatch(new SavePositionFail(error));
    });
  }

  @Action(locationAction.SavePositionSuccess)
  saveMapPointSuccess(ctx: StateContext<LocationStateModel>, {payload}: locationAction.SavePositionSuccess) {
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      mapPoints: [
        ...state.mapPoints,
        payload
      ]
    });
  }
  @Action(locationAction.DeletePosition)
  deleteMapPoint(ctx: StateContext<LocationStateModel>, {payload}: locationAction.DeletePosition) {
    this.locationApi.deleteMapPoint(payload).subscribe(data => {
      if (data) {
        ctx.dispatch(new DeletePositionSuccess(payload));
      }
    }, error => {
    });
  }

  @Action(locationAction.DeletePositionSuccess)
  deleteMapPointSuccess(ctx: StateContext<LocationStateModel>, {payload}: locationAction.DeletePositionSuccess) {
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      mapPoints: state.mapPoints.filter(p => p.id !== payload)
    });
  }
  @Action(locationAction.UpdatePosition)
  updateMapPoint(ctx: StateContext<LocationStateModel>, {payload}: locationAction.UpdatePosition) {
    this.locationApi.updateMapPoint(payload).subscribe(data => {
      ctx.dispatch(new UpdatePositionSuccess(payload));
    }, error => {
    });
  }

  @Action(locationAction.UpdatePositionSuccess)
  UpdateMapPointSuccess(ctx: StateContext<LocationStateModel>, {payload}: locationAction.UpdatePositionSuccess) {
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      mapPoints: state.mapPoints.map(p => p.id === payload.id ? payload : p)
    });
  }
  @Action(locationAction.SearchByTags)
  searchByTags(ctx: StateContext<LocationStateModel>, {payload}: locationAction.SearchByTags) {
    this.locationApi.searchByTags(payload).subscribe(data => {
      ctx.dispatch(new SearchByTagsSuccess(data));
    }, error => {
    });
  }

  @Action(locationAction.SearchByTagsSuccess)
  searchByTagsSuccess(ctx: StateContext<LocationStateModel>, {payload}: locationAction.SearchByTagsSuccess) {
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      pointsSearchedByTags: payload
    });
  }
}

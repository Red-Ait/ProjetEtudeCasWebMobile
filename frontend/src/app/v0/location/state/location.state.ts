import {IMapPoint} from '../../@entities/IMapPoint';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {ITag} from '../../@entities/ITag';
import * as locationAction from './location.action';
import {LocationApi} from '../service/location.api';
import {GetUserMapPointFail, GetUserMapPointSuccess} from "./location.action";

export class LocationStateModel {
  mapPoints: Array<IMapPoint>;
  tags: Array<ITag>;
}

@State<LocationStateModel>({
  name: 'locationState',
  defaults: {
    mapPoints: [],
    tags: []
  }
})

@Injectable()
export class LocationState {
  constructor(private locationApi: LocationApi) {
  }

  /************       App Selectors           ********************/

  @Selector()
  static getMapPoint(state: LocationStateModel) {
    return state.mapPoints;
  }

  @Selector()
  static getTags(state: LocationStateModel) {
    return state.tags;
  }

  @Action(locationAction.GetUserMapPoint)
  getUserMapPoint(ctx: StateContext<LocationStateModel>) {
    this.locationApi.getUserMapPoint().subscribe(data => {
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
}

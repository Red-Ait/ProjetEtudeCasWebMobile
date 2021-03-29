import {ILocation} from '../../@entities/ILocation';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {ITag} from '../../@entities/ITag';
import * as locationAction from './location.action';
import {
  DeletePositionSuccess, GetSharedWithMeLocation, GetSharedWithMeLocationSuccess,
  GetUserMapPointFail,
  GetUserMapPointSuccess,
  SavePositionFail,
  SavePositionSuccess, SearchByTagsAndModeSuccess, SearchByTagsOrModeSuccess, UpdatePosition, UpdatePositionSuccess
} from './location.action';
import {LocationApi} from '../service/location.api';
import {GetTags} from './tag.action';

export class LocationStateModel {
  mapPoints: Array<ILocation>;
  sharedWithMePoints: Array<ILocation>;
  pointsSearchedByTags: Array<ILocation>;
  tags: Array<ITag>;
}

@State<LocationStateModel>({
  name: 'locationState',
  defaults: {
    mapPoints: [],
    sharedWithMePoints: [],
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
  static getSharedWithMeLocations(state: LocationStateModel) {
    return state.sharedWithMePoints;
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


  /************       Handling actions         ********************/


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
      mapPoints: payload === null ? [] : payload
    });
  }

  @Action(locationAction.GetSharedWithMeLocation)
  getSharedWithMeLocation(ctx: StateContext<LocationStateModel>) {
    this.locationApi.getSharedWithMeLocation().subscribe(data => {
      ctx.dispatch(new GetSharedWithMeLocationSuccess(data));
    });
  }

  @Action(locationAction.GetSharedWithMeLocationSuccess)
  getSharedWithMeLocationSuccess(ctx: StateContext<LocationStateModel>, {payload}: locationAction.GetSharedWithMeLocationSuccess) {
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      sharedWithMePoints: payload === null ? [] : payload
    });
  }

  @Action(locationAction.SavePosition)
  saveMapPoint(ctx: StateContext<LocationStateModel>, {payload}: locationAction.SavePosition) {
    this.locationApi.saveMapPoint(payload).subscribe(data => {
      ctx.dispatch([new SavePositionSuccess(data), new GetTags()]);
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
    let aux = payload;
    if (payload.id === null) {
      for (const pt of ctx.getState().mapPoints) {
        if (pt.latitude === payload.latitude && pt.longitude === payload.longitude) {
          aux = pt;
        }
      }
    }
    this.locationApi.deleteMapPoint(aux.id).subscribe(data => {
      if (data) {
        ctx.dispatch(new DeletePositionSuccess(payload.id));
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
      ctx.dispatch([new UpdatePositionSuccess(payload), new GetTags()]);
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
  @Action(locationAction.SearchByTagsOrMode)
  searchByTagsOrMode(ctx: StateContext<LocationStateModel>, {payload}: locationAction.SearchByTagsOrMode) {
    this.locationApi.searchByTags(payload).subscribe(data => {
      const aux = new Array<ILocation>();
      const map = new Map();
      data.forEach(list => {
        list.forEach(l => {
          if (!map.has(l.id)) {
            map.set(l.id, true);
            aux.push(l);
          }
        });
      });
      ctx.dispatch(new SearchByTagsOrModeSuccess(aux));
    }, error => {
    });
  }

  @Action(locationAction.SearchByTagsOrModeSuccess)
  searchByTagsOrModeSuccess(ctx: StateContext<LocationStateModel>, {payload}: locationAction.SearchByTagsOrModeSuccess) {
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      pointsSearchedByTags: payload
    });
  }
  @Action(locationAction.SearchByTagsAndMode)
  searchByTagsAndMode(ctx: StateContext<LocationStateModel>, {payload}: locationAction.SearchByTagsAndMode) {
    const state = ctx.getState();
    let data = new Array<ILocation>();
    data = [...state.mapPoints];
    for (const tag of payload) {
      for (const pt of data) {
        let exist = false;
        for (const ptTag of pt.tags) {
          if (ptTag.label.toLowerCase().trim() === tag.label.trim().toLowerCase()) {
            exist = true;
          }
        }
        if (!exist) {
          const index = data.indexOf(pt);
          if (index >= 0) {
            data.splice(index, 1);
          }
        }
      }
    }
    ctx.dispatch(new SearchByTagsAndModeSuccess(data));
  }

  @Action(locationAction.SearchByTagsAndModeSuccess)
  searchByTagsAndModeSuccess(ctx: StateContext<LocationStateModel>, {payload}: locationAction.SearchByTagsAndModeSuccess) {
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      pointsSearchedByTags: payload
    });
  }
}

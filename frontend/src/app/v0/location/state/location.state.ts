import {IMapPoint} from '../../@entities/IMapPoint';
import {Selector, State} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {ITag} from '../../@entities/ITag';

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
  constructor() {
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

}

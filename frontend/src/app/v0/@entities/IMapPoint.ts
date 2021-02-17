import {ITag} from './ITag';

export interface IMapPoint {
  label: string;
  latitude: number;
  longitude: number;
  tags: Array<ITag>;
}

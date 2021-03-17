import {ITag} from './ITag';

export interface IMapPoint {
  id: number;
  label: string;
  latitude: number;
  longitude: number;
  tags: Array<ITag>;
}

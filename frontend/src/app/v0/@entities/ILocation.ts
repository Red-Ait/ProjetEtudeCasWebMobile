import {ITag} from './ITag';

export interface ILocation {
  id: number;
  label: string;
  latitude: number;
  longitude: number;
  tags: Array<ITag>;
}

import {ERole} from './ERole';

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  roles: Array<ERole>;
}

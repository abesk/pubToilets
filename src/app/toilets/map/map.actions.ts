import {Action} from '@ngrx/store';

export const UPDATE_GPS_POSITION = '[map] Update gps poistion';


export class UpdateGpsPosition implements Action {
  readonly type = UPDATE_GPS_POSITION;
  constructor(public payload: { position: number[] }) {}
}


export type MapAction =
  | UpdateGpsPosition;



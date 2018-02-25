
import {UPDATE_GPS_POSITION} from './map.actions';
import {AppState} from '../../app-state';
import { MapAction } from './map.actions';

export interface MapState {
  gpsPosition: number[];
}

export const initialState: MapState = {
  gpsPosition: null
};

export function mapReducer(state = initialState, action: MapAction): MapState {
  switch (action.type) {

    case UPDATE_GPS_POSITION:
      return {
        ...state,
        gpsPosition: action.payload.position
      };
    default:
      return state;
  }
}

export const getGpsPosition = (state: AppState) => state.map.gpsPosition;


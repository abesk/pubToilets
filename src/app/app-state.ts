import {ToiletState} from './toilets/toilet-search.reducer';
import { MapState } from './toilets/map/map.reducer';

export interface AppState {
  toilets: ToiletState;
  map: MapState;
}

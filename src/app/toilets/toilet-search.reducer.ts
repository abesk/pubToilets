
import {Toilet} from './toilet';
import {TOILET_SEARCH, TOILET_SEARCH_RESULT, ToiletAction, TOILET_TOGGLE_NO_FEES} from './toilet.actions';
import {AppState} from '../app-state';

export interface ToiletState {
  searchArea: number[];
  searchResults: Toilet[];
  noFees: boolean;
}

export const initialState: ToiletState = {
  searchArea:  [16.5896, 49.2001, 16.6630, 49.1838],
  searchResults: [],
  noFees: false
};

export function toiletReducer(state = initialState, action: ToiletAction): ToiletState {
  switch (action.type) {

    case TOILET_SEARCH:
      return {
        ...state,
        searchArea: action.payload.bbox,
      };

    case TOILET_SEARCH_RESULT:
      return {
        ...state,
        searchResults: action.payload
      };
    case TOILET_TOGGLE_NO_FEES:
      return {
        ...state,
        noFees: !state.noFees
      };
    default:
      return state;
  }
}

export const getToiletSearchResults = (state: AppState) => state.toilets.searchResults;
export const getNoFeesToiletResult = (state: AppState) => state.toilets.noFees;

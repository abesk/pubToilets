import {Action} from '@ngrx/store';
import {Toilet} from './toilet';

export const TOILET_SEARCH = '[toilet] Search';
export const TOILET_SEARCH_RESULT = '[toilet] Search Result';
export const TOILET_TOGGLE_NO_FEES = '[toilet] Toggle no fees';

export class ToiletSearch implements Action {
  readonly type = TOILET_SEARCH;
  constructor(public payload: { bbox: number[] }) {}
}

export class ToiletSearchResult implements Action {
  readonly type = TOILET_SEARCH_RESULT;
  constructor(public payload: Toilet[]) {}
}

export class ToiletToggleNoFees implements Action {
    readonly type = TOILET_TOGGLE_NO_FEES;
    constructor() {}
}

export type ToiletAction =
  | ToiletSearch
  | ToiletSearchResult
  | ToiletToggleNoFees;


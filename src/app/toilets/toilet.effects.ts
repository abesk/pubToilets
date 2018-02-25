import { Injectable } from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {TOILET_SEARCH, TOILET_SEARCH_RESULT, ToiletSearchResult, ToiletSearch} from './toilet.actions';
import {ToiletService} from './toilet.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinctUntilChanged';


@Injectable()
export class ToiletEffects {

  @Effect()
  getToilets = this.actions
    .ofType<ToiletSearch>(TOILET_SEARCH)
    .map(action => action.payload.bbox)
    .distinctUntilChanged()
    .switchMap((bbox) => {
      return this.toiletService.getToilets(bbox);
    })
    .map((toilets) => new ToiletSearchResult(toilets));

  constructor(
    private actions: Actions,
  private toiletService: ToiletService,
  ) { }

}

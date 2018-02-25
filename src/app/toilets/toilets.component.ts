import { Component, OnInit } from '@angular/core';
import { ToiletService } from './toilet.service';
import { Toilet } from './toilet';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state';
import { getToiletSearchResults, getNoFeesToiletResult } from './toilet-search.reducer';
import { ToiletSearch, ToiletToggleNoFees } from './toilet.actions';
import { FormControl } from '@angular/forms';
import * as Rx from 'rx-dom';
import { UpdateGpsPosition } from './map/map.actions';
import { getGpsPosition } from './map/map.reducer';

@Component({
  selector: 'app-toilets',
  templateUrl: './toilets.component.html',
  styleUrls: ['./toilets.component.css']
})
export class ToiletsComponent implements OnInit {

  constructor(
    private store: Store<AppState>
  ) { }
  subscriptions: Subscription[];

  toggleFormControl = new FormControl();

  toilets = this.store.select(getToiletSearchResults);
  noFeesFilter = this.store.select(getNoFeesToiletResult);
  position = this.store.select(getGpsPosition);

  ngOnInit() {
    this.subscriptions = [
      this.toggleFormControl.valueChanges
        .subscribe((queryTitle) => {
          this.store.dispatch(new ToiletToggleNoFees());
        })
    ];
    const source = Rx.DOM.geolocation.getCurrentPosition();
    const subscription = source.subscribe(
      (function (pos) {
        this.store.dispatch(new UpdateGpsPosition({position: [pos.coords.longitude, pos.coords.latitude]}));
      }).bind(this),
      function (err) {
        let message = '';
        switch (err.code) {
          case err.PERMISSION_DENIED:
            message = 'Permission denied';
            break;
          case err.POSITION_UNAVAILABLE:
            message = 'Position unavailable';
            break;
          case err.PERMISSION_DENIED_TIMEOUT:
            message = 'Position timeout';
            break;
        }
        console.log('Error: ' + message);
      },
      function () {
        console.log('Completed');
      });

  }

}

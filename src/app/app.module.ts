import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ToiletsComponent } from './toilets/toilets.component';
import { ToiletService } from './toilets/toilet.service';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
// tslint:disable-next-line:max-line-length
import {MatListModule, MatIconModule, MatSidenavModule, MatToolbarModule, MatButtonModule, MatDividerModule, MatCheckboxModule, MatSliderModule, MatSlideToggleModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { MapComponent } from './toilets/map/map.component';
import { toiletReducer } from './toilets/toilet-search.reducer';
import { StoreModule } from '@ngrx/store';
import { ToiletEffects } from './toilets/toilet.effects';
import { EffectsModule } from '@ngrx/effects';
import { ToiletsListComponent } from './toilets/toilets-list/toilets-list.component';
import {ReactiveFormsModule} from '@angular/forms';
import { mapReducer } from './toilets/map/map.reducer';




@NgModule({
  declarations: [
    AppComponent,
    ToiletsComponent,
    MapComponent,
    ToiletsListComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
     // tslint:disable-next-line:max-line-length
    MatListModule, MatIconModule, MatSidenavModule, MatToolbarModule, MatButtonModule, MatDividerModule, MatCheckboxModule, MatSlideToggleModule,
    StoreModule.forRoot({
      toilets: toiletReducer,
      map: mapReducer
    }),
    EffectsModule.forRoot([
      ToiletEffects
    ]),
  ],
  providers: [ToiletService],
  bootstrap: [AppComponent]
})
export class AppModule { }

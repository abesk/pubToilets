import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import OlMap from 'ol/map';
import OlOSM from 'ol/source/osm';
import Point from 'ol/geom/point';
import Style from 'ol/style/style';
import Icon from 'ol/style/icon';
import Fill from 'ol/style/fill';
import Stroke from 'ol/style/stroke';
import Circle from 'ol/style/circle';
import VectorLayer from 'ol/layer/vector';
import VectorSource from 'ol/source/vector';
import OlTileLayer from 'ol/layer/tile';
import Feature from 'ol/feature';
import OlView from 'ol/view';
import OlProj from 'ol/proj';
import { Toilet } from '../toilet';
import { AppState } from '../../app-state';
import { Store } from '@ngrx/store';
import { ToiletSearch } from '../toilet.actions';
import { getToiletSearchResults, getNoFeesToiletResult } from '../toilet-search.reducer';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/filter';
import { getGpsPosition } from './map.reducer';



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit {

  map: OlMap;
  source: OlOSM;
  vectorSource: VectorSource;
  positionVectorSource: VectorSource;
  layer: OlTileLayer;
  view: OlView;
  toilets: Toilet[];

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.source = new OlOSM();

    this.layer = new OlTileLayer({
      source: this.source
    });

    this.view = new OlView({
      center: OlProj.fromLonLat([16.610961, 49.195788]),
      zoom: 18,
    });
    this.vectorSource = new VectorSource({
      features: []
    });
    this.positionVectorSource = new VectorSource({
      features: []
    });

    const positionLayer = new VectorLayer({
      source: this.positionVectorSource,
      style: new Style({
        image: new Circle({
          radius: 9,
          fill: new Fill({
            color: '#3f51b5'
          }),
          stroke: new Stroke({
            color: 'white',
            width: 4
          })
        })
      })
    });


    const vectorLayer = new VectorLayer({
      source: this.vectorSource,
      style: new Style({
        image: new Icon(({
          anchor: [0.5, 1],
          anchorXUnits: 'fraction',
          anchorYUnits: 'fraction',
          src: 'assets/toilet.png'
        }))
      })
    });

    this.map = new OlMap({
      target: 'map',
      layers: [this.layer, vectorLayer, positionLayer],
      view: this.view
    });
    this.map.on('moveend', (evt) => {
      const map = evt.map;
      const extent = map.getView().calculateExtent(map.getSize());

      this.store.dispatch(new ToiletSearch({ bbox: OlProj.transformExtent(extent, 'EPSG:3857', 'EPSG:4326') }));
    });
    this.store.dispatch(new ToiletSearch({ bbox: [16.5895, 49.2001, 16.6630, 49.1838] }));
    this.store.combineLatest(
      this.store.select(getToiletSearchResults),
      this.store.select(getNoFeesToiletResult),
      (store, toilets, noFees) => ({ toilets: toilets, noFees: noFees })).subscribe((state) => {
        this.vectorSource.clear();
        state.toilets.filter((toilet) => {
          if (state.noFees && toilet.extratags && toilet.extratags.fee === 'yes') {
            return false;
          }
          return true;
        }).forEach((toilet) => {
          const point = new Point(OlProj.fromLonLat([parseFloat(toilet.lon), parseFloat(toilet.lat)]));
          this.vectorSource.addFeature(new Feature({
            geometry: point
          }));
        });
      });

      this.store.select(getGpsPosition).subscribe((position) => {
        if (!position) {
          return;
        }
        position = OlProj.fromLonLat(position);
        this.view.setCenter(position);
        this.positionVectorSource.clear();
        const point = new Point(position);
        this.positionVectorSource.addFeature(new Feature({
          geometry: point
        }));
        console.log(this.positionVectorSource);
      });


    setTimeout(() => {
      this.map.updateSize();
    }, 200);
  }

}

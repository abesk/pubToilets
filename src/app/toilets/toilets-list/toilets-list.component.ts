import { Component, OnInit, Input } from '@angular/core';
import { Toilet } from '../toilet';
import Sphere from 'ol/sphere';

@Component({
  selector: 'app-toilets-list',
  templateUrl: './toilets-list.component.html',
  styleUrls: ['./toilets-list.component.css']
})
export class ToiletsListComponent implements OnInit {

  constructor() { }
  @Input()
  toilets: Toilet[];

  @Input()
  noFees: Boolean;

  @Input()
  position: number[];

  ngOnInit() {
  }
  getDistance(toilet: Toilet): String {
    if (this.position) {
      const toiletPostion = [toilet.lon, toilet.lat];
    }

    return '';
  }

  getFilteredToilets() {

    // tslint:disable-next-line:prefer-const
    let sphere = new Sphere(6378137);
    return this.toilets.filter((toilet) => {
      if (this.noFees && toilet.extratags && toilet.extratags.fee === 'yes') {
        return false;
      }
      return true;
    }).map((toilet) => {
      const toiletPostion = [toilet.lon, toilet.lat];
      let distance = null;
      if (this.position) {
        distance = sphere.haversineDistance(toiletPostion, this.position);
      }
      return {
        ...toilet,
        distance : distance
      };
    }).sort(function(a, b) {
      if (!a.distance || !b.distance) {
        return 0;
      }
      return a.distance - b.distance;
    });
  }

}

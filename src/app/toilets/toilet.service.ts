import { Injectable } from '@angular/core';
import {Toilet} from './toilet';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ToiletService {

  constructor(private http: HttpClient) { }

  API_URL = 'https://nominatim.openstreetmap.org/search.php?q=toilet&format=jsonv2&extratags=1&bounded=1&limit=100';

  getToilets(bbox?: number[]): Observable<Toilet[]> {
    bbox = bbox || [16.5896, 49.2001, 16.6630, 49.1838];
    return this.http
    .get(`${this.API_URL}&viewbox=${bbox[0]},${bbox[1]},${bbox[2]},${bbox[3]}`)
    .map((res: any) => res || []);
    }

  }

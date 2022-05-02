import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Busstop } from '../models/busstop.model';
import { Routebusstop } from '../models/routebusstop.model';

const API = 'http://localhost:8080/api/routebusstop/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class RoutebusstopService {

  allStops: Routebusstop[] = [];

  constructor(private http: HttpClient) { }

  getAllById(id: number): Observable<Routebusstop[]> {
    return this.http.get<Routebusstop[]>(API + 'get/all/' + id, httpOptions);
  }

  deleteAllById(id: number): Observable<Routebusstop[]> {
    return this.http.delete<Routebusstop[]>(API + 'delete/all/' + id, httpOptions);
  }

  updateById(id: number, routebusstops: any) {
    return this.http.put(API + 'update/' + id, routebusstops, httpOptions);
  }

  getRouteBusstopsByRouteId(): Observable<Routebusstop[]> {
    return of(this.allStops);
  }
}

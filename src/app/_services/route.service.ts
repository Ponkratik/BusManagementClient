import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Route } from '../models/route.model';

const API = 'http://localhost:8080/api/route/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Route[]> {
    return this.http.get<Route[]>(API + 'get/all', httpOptions);
  }

  getById(id: number): Observable<Route> {
    return this.http.get<Route>(API + 'get/' + id, httpOptions);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(API + 'delete/' + id, httpOptions);
  }

  add(route: Route): Observable<any> {
    return this.http.post(API + 'add', route, httpOptions);
  }

  update(id: number, route: Route) {
    return this.http.put(API + 'update/' + id, route, httpOptions);
  }
}

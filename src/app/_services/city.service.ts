import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../models/city.model';

const API = 'http://localhost:8080/api/city/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<City[]> {
    return this.http.get<City[]>(API + 'get/all', httpOptions);
  }

  getById(id: number): Observable<City> {
    return this.http.get<City>(API + 'get/' + id, httpOptions);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(API + 'delete/' + id, httpOptions);
  }

  add(city: City): Observable<any> {
    return this.http.post(API + 'add', city, httpOptions);
  }

  update(id: number, city: City) {
    return this.http.put(API + 'update/' + id, city, httpOptions);
  }
}

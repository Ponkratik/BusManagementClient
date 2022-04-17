import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bus } from '../models/bus.model';

const API = 'http://localhost:8080/api/bus/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class BusService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Bus[]> {
    return this.http.get<Bus[]>(API + 'get/all', httpOptions);
  }

  getById(id: number): Observable<Bus> {
    return this.http.get<Bus>(API + 'get/' + id, httpOptions);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(API + 'delete/' + id, httpOptions);
  }

  add(bus: Bus): Observable<any> {
    return this.http.post(API + 'add', bus, httpOptions);
  }

  update(id: number, bus: Bus) {
    return this.http.put(API + 'update/' + id, bus, httpOptions);
  }
}

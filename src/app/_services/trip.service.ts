import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip.model';
import { User } from '../models/user.model';

const API = 'http://localhost:8080/api/trip/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Trip[]> {
    return this.http.get<Trip[]>(API + 'get/all', httpOptions);
  }

  getById(id: number): Observable<Trip> {
    return this.http.get<Trip>(API + 'get/' + id, httpOptions);
  }

  getByDriver(id: number): Observable<Trip[]> {
    return this.http.get<Trip[]>(API + 'get/driver/' + id, httpOptions);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(API + 'delete/' + id, httpOptions);
  }

  add(trip: Trip): Observable<any> {
    return this.http.post(API + 'add', trip, httpOptions);
  }

  update(id: number, trip: Trip) {
    return this.http.put(API + 'update/' + id, trip, httpOptions);
  }
}

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Busstop } from '../models/busstop.model';

const API = 'http://localhost:8080/api/busstop/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class BusstopService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Busstop[]> {
    return this.http.get<Busstop[]>(API + 'get/all', httpOptions);
  }

  getById(id: number): Observable<Busstop> {
    return this.http.get<Busstop>(API + 'get/' + id, httpOptions);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(API + 'delete/' + id, httpOptions);
  }

  add(busstop: Busstop): Observable<any> {
    return this.http.post(API + 'add', busstop, httpOptions);
  }

  update(id: number, busstop: Busstop) {
    return this.http.put(API + 'update/' + id, busstop, httpOptions);
  }
}

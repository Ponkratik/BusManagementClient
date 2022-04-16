import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

const AUTH_API = 'http://localhost:8080/api/user/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(AUTH_API + 'get/all/', httpOptions);
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(AUTH_API + 'get/' + id, httpOptions);
  }

  update(id: number, user: User): Observable<any> {
    return this.http.put(AUTH_API + 'update/' + id, user, httpOptions); 
  }
}

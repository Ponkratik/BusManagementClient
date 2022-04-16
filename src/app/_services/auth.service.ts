import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(login: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      login,
      password
    }, httpOptions);
  }

  register(login: string, password: string, email: string, lastName: string, firstName: string, surName: string, phone: string, roles: string): Observable<any> {
    let role = [roles];
    return this.http.post(AUTH_API + 'signup', {
        login,
        password,
        email,
        lastName,
        firstName,
        surName,
        phone,
        role
      }, httpOptions);
  }
}

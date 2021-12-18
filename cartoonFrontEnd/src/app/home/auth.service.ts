import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin } from './user-login.model';
import * as moment from "moment";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private httpClient: HttpClient,
              private router: Router) {}

  private userLoginAPI = 'http://localhost:3000/auth'

  login(userName: string, userPassword: string):Observable<any> {
    const userLogin = new UserLogin(userName, userPassword);
    return this.httpClient.post<UserLogin>(`${this.userLoginAPI}/login`, userLogin);
  }

  logout(){
    localStorage.removeItem("id_token");
  }

  sessionLogin() {
    return this.httpClient.post<UserLogin>(`${this.userLoginAPI}/session`, 'Login');
  }

  setSession(token: string) {
    localStorage.setItem('id_token', token);
  }
}

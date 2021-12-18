import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmailCode } from './email.model';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  private userRegisterAPI = 'http://localhost:3000/user-register';

  email(poster: string){
    console.log(poster);
    return this.httpClient.post<string>(`${this.userRegisterAPI}/email`, poster);
  }

  checkName(name: string): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.userRegisterAPI}/solo`, name);
  }

  addUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.userRegisterAPI, user);
  }

  checkEmailCode(emailCode: EmailCode): Observable<any> {
    return this.httpClient.post<any>(
      `${this.userRegisterAPI}/check`, emailCode
    );
  }
}

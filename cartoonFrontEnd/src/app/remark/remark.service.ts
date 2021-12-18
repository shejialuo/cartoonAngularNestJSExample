import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Remark } from './user-remark/user-remark';

@Injectable({
  providedIn: 'root'
})
export class RemarkService {

  constructor(private httpClient: HttpClient) { }

  private remarkAPI = 'http://localhost:3000/user-remark';

  findAll(): Observable<Remark[]>{
    return this.httpClient.get<Remark[]>(this.remarkAPI); 
  }

  addOne(remark: string) {
    return this.httpClient.post<string>(this.remarkAPI, remark);
  }
}

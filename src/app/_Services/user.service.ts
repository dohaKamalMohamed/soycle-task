import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Observable, from} from 'rxjs';
import {User} from '../_models/user'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  Url:string='http://localhost:3000/users';
  headers:HttpHeaders =new HttpHeaders().set('Content-Type','application/json');
  constructor(private http: HttpClient) { }
  getUsers() {
    return this.http.get(`${this.Url}`);
}

getUserById(_id):Observable<any>{
  let url = `${this.Url}/read/${_id}`;
  return this.http.get(url,{headers:this.headers});
}

register(user:User):Observable<any>{
  let url = `${this.Url}/create`;
  return this.http.post(url,user);;
}

}


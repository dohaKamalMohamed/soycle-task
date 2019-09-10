import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Shops} from '../_models/shop'

@Injectable({
  providedIn: 'root'
})
export class ShopsService {
  Url:string='http://localhost:3000/shop';
  headers:HttpHeaders =new HttpHeaders().set('Content-Type','application/json');
  constructor(private http:HttpClient) { }

  createShop(shop:Shops): Observable<any> {
    let url = `${this.Url}/create`;
    return this.http.post(url, shop);
  }
  getShops():Observable<any> {
    return this.http.get(`${this.Url}`);
  }
  getShop(_id): Observable<any> {
    let url = `${this.Url}/read/${_id}`;
    return this.http.get(url, { headers: this.headers });
  }
  updateShop(_id, shop:Shops): Observable<any> {
    let url = `${this.Url}/update/${_id}`;
    return this.http.put(url, shop, { headers: this.headers });
  }
  deleteShop(_id): Observable<any> {
    let url = `${this.Url}/delete/${_id}`;
    return this.http.delete(url, { headers: this.headers });
  }

}

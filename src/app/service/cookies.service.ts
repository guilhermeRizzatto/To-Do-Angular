import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  private url:string = 'http://localhost:8080';

  constructor(private http:HttpClient) { }


  deleteCookie():Observable<any>{
    return this.http.delete<any>(this.url + "/cookies/deleteLoginCookie", {withCredentials: true});
  }
}

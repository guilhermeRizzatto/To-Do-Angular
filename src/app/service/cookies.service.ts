import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  private url:string = 'https://to-do-springboot-production.up.railway.app';

  constructor(private http:HttpClient) { }


  deleteCookie():Observable<any>{
    return this.http.delete<any>(this.url + "/cookies/deleteLoginCookie", {withCredentials: true});
  }
}

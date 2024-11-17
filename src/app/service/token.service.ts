import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private url:string = 'http://localhost:8080';

  constructor(private http:HttpClient) { }

  refresh():Observable<any>{
    return this.http.post<any>(this.url + "/tokens/refresh", {},{ withCredentials: true });
  }
}

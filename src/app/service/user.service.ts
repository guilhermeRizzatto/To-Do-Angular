import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User} from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url:string = 'http://localhost:8080';

  constructor(private http:HttpClient) { }


  post(obj:User):Observable<any>{
    return this.http.post<User>(this.url + "/login/create", obj);
  }
}

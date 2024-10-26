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


  create(obj:User):Observable<any>{
    return this.http.post<User>(this.url + "/login/create", obj);
  }

  enter(email:String, password:String):Observable<any>{
    return this.http.get<User>(this.url + "/login/enter?email=" + email + "&password=" + password, { withCredentials: true });
  }

  updatePassword(user:User):Observable<any>{
    return this.http.put<User>(this.url + "/users/put?id=" + user.id, user, { withCredentials: true});
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url:string = 'http://localhost:8080';

  constructor(private http:HttpClient) { }


  post(obj:Task):Observable<any>{
    return this.http.post<Task>(this.url + "/tasks/post", obj);
  }

  enter(email:String, password:String):Observable<any>{
    return this.http.get<User>(this.url + "/login/enter?email=" + email + "&password=" + password);
  }
}

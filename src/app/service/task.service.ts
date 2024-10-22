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


  post(obj:Task, user:User):Observable<any>{
    return this.http.post<Task>(this.url + "/tasks/post?userID=" + user.id, obj);
  }

  enter(email:String, password:String):Observable<any>{
    return this.http.get<User>(this.url + "/login/enter?email=" + email + "&password=" + password);
  }
  
  delete(obj:Task):Observable<any>{
    return this.http.delete<any>(this.url + "/tasks/delete?id=" + obj.id);
  }

  update(obj:Task):Observable<any>{
    return this.http.put<Task>(this.url + "/tasks/put?id=" + obj.id, obj);
  }
}

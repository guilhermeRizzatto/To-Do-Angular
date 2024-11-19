import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url:string = 'https://to-do-springboot-production.up.railway.app/';

  constructor(private http:HttpClient) { }


  post(obj:Task, user:User):Observable<any>{
    return this.http.post<Task>(this.url + "/tasks/post?userID=" + user.id, obj, { withCredentials: true });
  }
  
  delete(obj:Task):Observable<any>{
    return this.http.delete<any>(this.url + "/tasks/delete?id=" + obj.id, { withCredentials: true });
  }

  update(obj:Task):Observable<any>{
    return this.http.put<Task>(this.url + "/tasks/put?id=" + obj.id, obj, { withCredentials: true });
  }
}

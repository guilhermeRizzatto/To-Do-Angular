import { Component } from '@angular/core';
import { User } from './model/user';
import { LoadingService } from './service/loading.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'To-Do-Angular';

  user:User = new User();

  newPassword:string = '';
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { User } from '../model/user';
import { catchError, lastValueFrom, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  enterAccountActive:boolean = false;
  createAccountActive:boolean = false;

  displayButtonsInLogin:boolean = true;
  displayComebackButton:boolean = false;

  errorEmailExists:boolean = false;
  errorEmailNotExists:boolean = false;
  errorPass:boolean = false;
  clickCount:number = 0;

  enterSucess:boolean = false;

  user:User = new User();

  mensageError: any = null;

  constructor(private router: Router, private service:UserService) {}


  comeback():void{
    this.enterAccountActive = false;
    this.createAccountActive = false;
    this.displayButtonsInLogin = true;
    this.displayComebackButton = false;

    this.errorEmailExists = false;
    this.errorEmailNotExists = false;
    this.errorPass = false;
    this.clickCount = 0;

    this.user.email = '';
    this.user.password = '';
    this.user.name = '';
  }

  toggleEnterAccount():void{
    this.enterAccountActive = !this.enterAccountActive;
    this.displayButtonsInLogin = false;
    this.displayComebackButton = true;
    this.errorEmailExists = false;
    this.errorEmailNotExists = false;
    this.errorPass = false;
    this.clickCount = 0;
  }

  toggleCreateAccount():void{
    this.createAccountActive = !this.createAccountActive;
    this.displayButtonsInLogin = false;
    this.displayComebackButton = true;
    this.errorEmailExists = false;
    this.errorEmailNotExists = false;
    this.errorPass = false;
    this.clickCount = 0;
  }

  async toggleError():Promise<void>{
    //if(this.errorEmail === true){
      //this.errorEmail = false;
    //  this.errorPass = true;
   // } else {
     // this.errorEmail = true;
      this.errorPass = false;
   // }
    this.clickCount++;
    if(this.clickCount > 2){
     // this.errorEmail = false;
      this.errorPass = false;
      this.enterAccountActive = true;
      this.enterSucess = true;

      await this.sleep();

      this.router.navigate(['/main']);
    }
  }

  post():void{
    this.service.post(this.user).subscribe({
      next: (response) => {

      },
      error: async (error) => {
        this.mensageError = error;
        if(this.mensageError.status === 400){
          this.errorEmailExists = true;
          await this.sleep();
          this.errorEmailExists = false;
        }
      }
    });
  }

  private async sleep(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 2000));
  }

  private showError():void{
    console.log(this.mensageError);
  }

}

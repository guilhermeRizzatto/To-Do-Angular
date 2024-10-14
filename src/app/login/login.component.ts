import { Component, Injectable } from '@angular/core';
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
  inputEmpty:boolean = false;
  emailValid:boolean = false;
  clickCount:number = 0;

  enterSucess:boolean = false;
  createSucess:boolean = false;

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
    this.inputEmpty = false;
    this.emailValid = false;
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

  async create():Promise<void>{
    if(this.isEmpty() === false){
      this.inputEmpty = false;
      if(this.isEmailValid(this.user.email)){
        this.emailValid = false;
        this.service.create(this.user).subscribe({
          next: async(response) => {
            this.createSucess = true;
            await this.sleep();
            this.createSucess = false;
            this.enterAccountActive = true;
            this.createAccountActive = false;
  
            this.user.email = '';
            this.user.name = '';
            this.user.password = '';
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
      } else {
        this.emailValid = true;
        await this.sleep();
        this.emailValid = false;
      }
    } else {
      this.inputEmpty = true;
      await this.sleep();
      this.inputEmpty = false;
    }
  }

  isEmpty():boolean{
    if(this.enterAccountActive === true){
      return (this.user.email === '' || this.user.password === '');
    }
    return (this.user.email === '' || this.user.password === '' || this.user.name === '');
  }

  isEmailValid(email:String):boolean{
    return email.includes('@');
  }

  async enter():Promise<void>{
    if(this.isEmpty() === false){
      this.inputEmpty = false;
      if(this.isEmailValid(this.user.email)){
        this.emailValid = false;

        this.service.enter(this.user.email,this.user.password).subscribe({
          next: async(response) => {
            localStorage.setItem('isLogged', 'true');

            this.user = response;

            console.log(this.user);

            this.enterSucess = true;
            await this.sleep();
            this.createSucess = false;
    
            this.router.navigate(['/main']);
    
            this.enterAccountActive = true;
            this.createAccountActive = false;
          },
          error: async (error) => {
            this.mensageError = error.error;
            if(this.mensageError.includes('Dont exists any account with this email')){
              this.errorEmailNotExists = true;
              await this.sleep();
              this.errorEmailNotExists = false;
            }
            if(this.mensageError.includes('Wrong password')){
              this.errorPass = true;
              await this.sleep();
              this.errorPass = false;
            }
          }
        });
      } else {
        this.emailValid = true;
        await this.sleep();
        this.emailValid = false;
      }
    } else {
      this.inputEmpty = true;
      await this.sleep();
      this.inputEmpty = false;
    }
    
  }

  private async sleep(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 1500));
  }


}
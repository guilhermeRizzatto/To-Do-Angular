import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { AppComponent } from '../app.component';
import { LoadingService } from '../service/loading.service';


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
  errorBackend:boolean = false;
  errorPass:boolean = false;
  inputEmpty:boolean = false;
  emailValid:boolean = false;
  clickCount:number = 0;

  enterSucess:boolean = false;
  createSucess:boolean = false;

  mensageError: any = null;

  constructor(private router: Router, private service:UserService, public app:AppComponent, public loadingService: LoadingService) {}

  comeback():void{
    this.enterAccountActive = false;
    this.createAccountActive = false;
    this.displayButtonsInLogin = true;
    this.displayComebackButton = false;

    this.errorEmailExists = false;
    this.errorEmailNotExists = false;
    this.errorBackend = false;
    this.errorPass = false;
    this.inputEmpty = false;
    this.emailValid = false;
    this.clickCount = 0;

    this.app.user.email = '';
    this.app.user.password = '';
    this.app.user.name = '';
  }

  toggleEnterAccount():void{
    this.enterAccountActive = true;
    this.displayButtonsInLogin = false;
    this.displayComebackButton = true;
    this.errorEmailExists = false;
    this.errorEmailNotExists = false;
    this.errorBackend = false;
    this.errorPass = false;
    this.clickCount = 0;
  }

  toggleCreateAccount():void{
    this.createAccountActive = true;
    this.displayButtonsInLogin = false;
    this.displayComebackButton = true;
    this.errorEmailExists = false;
    this.errorEmailNotExists = false;
    this.errorBackend = false;
    this.errorPass = false;
    this.clickCount = 0;
  }

  async create():Promise<void>{
    if(this.isEmpty() === false){
      this.inputEmpty = false;
      if(this.isEmailValid(this.app.user.email)){
        this.emailValid = false;

        this.loadingService.show();
        this.service.create(this.app.user).subscribe({
          next: async(response) => {
            this.loadingService.hide();
            this.createSucess = true;
            await this.sleep();
            this.createSucess = false;
            this.enterAccountActive = true;
            this.createAccountActive = false;
  
            this.app.user.email = '';
            this.app.user.name = '';
            this.app.user.password = '';
          },
          error: async (error) => {
            this.loadingService.hide();
            this.mensageError = error.error;
            if (error.status === 0) {
              this.errorBackend = true;
              await this.sleep();
              this.errorBackend = false;
            } else {
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
      return (this.app.user.email === '' || this.app.user.password === '');
    }
    return (this.app.user.email === '' || this.app.user.password === '' || this.app.user.name === '');
  }

  isEmailValid(email:String):boolean{
    return email.includes('@');
  }

  async enter():Promise<void>{
    if(this.isEmpty() === false){
      this.inputEmpty = false;
      if(this.isEmailValid(this.app.user.email)){
        this.emailValid = false;

        this.loadingService.show();
        this.service.enter(this.app.user.email,this.app.user.password).subscribe({
          next: async(response) => {
            this.loadingService.hide();
            localStorage.setItem('isLogged', 'true');

            this.app.user.id = response.id;
            this.app.user.name = response.name;
            this.app.user.email = response.email;

            this.enterSucess = true;
            await this.sleep();
            this.createSucess = false;
    
            this.router.navigate(['/main']);
    
            this.enterAccountActive = true;
            this.createAccountActive = false;
          },
          error: async (error) => {
            this.loadingService.hide();
            this.mensageError = error.error;
            if (error.status === 0) {
              this.errorBackend = true;
              await this.sleep();
              this.errorBackend = false;
            } else if(this.mensageError.includes('Dont exists any account with this email')){
              this.errorEmailNotExists = true;
              await this.sleep();
              this.errorEmailNotExists = false;
            } else if(this.mensageError.includes('Wrong password')){
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
    return new Promise(resolve => setTimeout(resolve, 3000)); //1500
  }


}

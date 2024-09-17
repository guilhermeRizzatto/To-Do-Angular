import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  errorEmail:boolean = false;
  errorPass:boolean = false;
  clickCount:number = 0;

  enterSucess:boolean = false;

  constructor(private router: Router) {}


  comeback():void{
    this.enterAccountActive = false;
    this.createAccountActive = false;
    this.displayButtonsInLogin = true;
    this.displayComebackButton = false;
    this.errorEmail = false;
    this.errorPass = false;
    this.clickCount = 0;
  }

  toggleEnterAccount():void{
    this.enterAccountActive = !this.enterAccountActive;
    this.displayButtonsInLogin = false;
    this.displayComebackButton = true;
    this.errorEmail = false;
    this.errorPass = false;
    this.clickCount = 0;
  }

  toggleCreateAccount():void{
    this.createAccountActive = !this.createAccountActive;
    this.displayButtonsInLogin = false;
    this.displayComebackButton = true;
    this.errorEmail = false;
    this.errorPass = false;
    this.clickCount = 0;
  }

  async toggleError():Promise<void>{
    if(this.errorEmail === true){
      this.errorEmail = false;
      this.errorPass = true;
    } else {
      this.errorEmail = true;
      this.errorPass = false;
    }
    this.clickCount++;
    if(this.clickCount > 2){
      this.errorEmail = false;
      this.errorPass = false;
      this.enterAccountActive = true;
      this.enterSucess = true;

      await this.sleep();

      this.router.navigate(['/main']);
    }
  }

  private async sleep(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 2000));
  }

}

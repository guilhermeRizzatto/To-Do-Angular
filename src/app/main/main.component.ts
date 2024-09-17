import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  animations: [
    trigger("enableChangePass", [
      transition(':enter', [
        style({opacity: 0}),
        animate('0.25s', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('0.25s', style({opacity: 0}))
      ])
    ])
  ]
})
export class MainComponent {

  options:boolean = false;

  changePassShow:boolean = false;

  isPasswordSaved:boolean = false;

  showOptions():void{
      if(this.options == true){
        this.options = false;
        this.changePassShow = false;
      } else {
        this.options = true;
      }
  }

  changePassEnable():void{
    if(this.changePassShow == true){
      this.changePassShow = false;
    } else {
      this.changePassShow = true;
    }
  }

  async savePassword():Promise<void>{
    this.isPasswordSaved = true;
    await this.sleep();
    this.changePassShow = false;
    this.isPasswordSaved = false;
  }

  private async sleep(): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, 1500));
  }

}
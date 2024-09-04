import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  options:boolean = false;

  changePassShow:boolean = false;

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



}

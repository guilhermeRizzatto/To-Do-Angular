import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  options:boolean = false;

  showOptions():void{
      if(this.options == true){
        this.options = false;
      } else {
        this.options = true;
      }
  }



}

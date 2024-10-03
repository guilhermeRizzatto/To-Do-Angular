import { animate, style, transition, trigger } from '@angular/animations';
import { Component, } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../model/task';


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
export class MainComponent{


  options:boolean = false;

  changePassShow:boolean = false;

  isPasswordSaved:boolean = false;

  task:Task = new Task();
  
  tasks:Task[] = [
    new Task('Fazer Liçao De matematica','Páginas 301 -> 310,para o dia 31/08'),
    new Task('Guardar 1000 reais todos os meses, até o ano de 2039','Meta: R$45000. Atual: R$12400')
  ];


  constructor(private router: Router) {}


  expandOptionsCard(index:number):void {   
    this.tasks[index].expanded = !this.tasks[index].expanded;
  }

  async removeCard(index:number):Promise<void> {   
    this.tasks[index].isRemoved = !this.tasks[index].isRemoved;
    await this.sleep(1500);
    this.tasks.splice(index, 1);
  }

  changeCard(index:number):void {
    this.tasks[index].oldName = this.tasks[index].name;
    this.tasks[index].oldDescription = this.tasks[index].description;

    this.tasks[index].enableTitleChange = !this.tasks[index].enableTitleChange;
    this.tasks[index].enableDescripChange = !this.tasks[index].enableDescripChange;
    this.tasks[index].titleRemove = !this.tasks[index].titleRemove;
    this.tasks[index].showSaveButton = !this.tasks[index].showSaveButton;
    this.tasks[index].expanded = !this.tasks[index].expanded;
  }

  async saveCard(index:number):Promise<void> {
    this.tasks[index].showSaveButton = false;
    await this.sleep(200);
    this.tasks[index].isCardSaved = true;
    await this.sleep(1500);

    if(this.tasks[index].isNew === true){
      this.tasks[index].isNew = false;
    }

    this.tasks[index].isCardSaved = false;
    this.tasks[index].enableTitleChange = false;
    this.tasks[index].enableDescripChange = false;
    this.tasks[index].titleRemove = false;
  }

  async cancelCard(index:number):Promise<void> {
    this.tasks[index].showSaveButton = false;
    await this.sleep(200);
    this.tasks[index].isCardCanceled = true;
    await this.sleep(1500);

    
    this.tasks[index].isCardCanceled = false;

    if(this.tasks[index].isNew === true){
      let tasksReverse = [...this.tasks];

      tasksReverse.reverse();

      console.log(tasksReverse);

      await this.sleep(3000);

      let indexReversed = 0;

      if(index === 0){
        indexReversed = this.tasks.length - 1;
      }else{
        indexReversed = (this.tasks.length - index) - 1;
      }
      console.log(indexReversed);
      
      
      tasksReverse.splice(indexReversed, 1);

      console.log(tasksReverse);

      //tasksReverse.reverse();



      


    } else {
      this.tasks[index].name = this.tasks[index].oldName;
      this.tasks[index].description = this.tasks[index].oldDescription;
    
      this.tasks[index].oldName = '';
      this.tasks[index].oldDescription = '';
    
      this.tasks[index].enableTitleChange = false;
      this.tasks[index].enableDescripChange = false;
      this.tasks[index].titleRemove = false;
    }
  }

  addNewTask():void{
    this.tasks.unshift(new Task('','',true,true,true,true,true));
    
  }

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

  changeLogout():void{
    localStorage.removeItem('isLogged');
    this.router.navigate(['/login']);
  }

  async savePassword():Promise<void>{
    this.isPasswordSaved = true;
    await this.sleep(1500);
    this.changePassShow = false;
    this.isPasswordSaved = false;
  }


  private async sleep(timeMs:number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, timeMs));
  }



}
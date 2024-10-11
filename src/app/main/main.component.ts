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

  allowToRemove:boolean = true;
  allowToCancel:boolean = true;

  alerts:boolean = false;
  alertCancel:boolean = false;
  alertRemove:boolean = false;
  alertSave:boolean = false;

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
    if(this.allowToRemove === false || this.allowToCancel == false){
      console.log('espere para cancelar');
      this.alerts = true;
      this.alertRemove = true;
      return;
    }
    this.allowToRemove = false;
    this.tasks[index].isRemoved = !this.tasks[index].isRemoved;
    await this.sleep(1500);
    this.tasks.splice(index, 1);
    this.allowToRemove = true;
    await this.sleep(400);
    this.alertRemove = false;
    this.alertSave = false;
    await this.sleep(200);
    this.alerts = false;
  }


  async saveCard(index:number):Promise<void> {
    if(this.allowToCancel === false || this.allowToRemove === false){
      this.alerts = true
      this.alertSave = true;
      return;
    }
    this.alertSave = false;
    await this.sleep(200);
    this.alerts = false;
    this.tasks[index].showSaveButton = false;
    await this.sleep(200);
    this.tasks[index].isCardSaved = true;
    await this.sleep(1500);

    if(this.tasks[index].isNew === true){
      this.tasks[index].isNew = false;
    }

    this.tasks[index].isCardSaved = false;
    this.tasks[index].enableSaveNewTask = false;
  }

  async cancelCard(index:number):Promise<void> {
    if(this.tasks[index].isNew === true){
      if(this.allowToCancel === false || this.allowToRemove == false){
        this.alerts = true;
        this.alertCancel = true;
        return;
      }
      this.allowToCancel = false;
      this.tasks[index].showSaveButton = false;
      await this.sleep(200);
      this.tasks[index].isCardCanceled = true;
      await this.sleep(1500);
      
      this.tasks[index].isCardCanceled = false;

      this.tasks.splice(index, 1);
      this.allowToCancel = true;
      await this.sleep(400);
      this.alertCancel = false;
      this.alertSave = false;
      await this.sleep(200);
      this.alerts = false;
      
    } else {
      
      this.tasks[index].showSaveButton = false;
      await this.sleep(200);
      this.tasks[index].isCardCanceled = true;
      await this.sleep(1500);
      
      this.tasks[index].isCardCanceled = false;
    
      this.tasks[index].enableSaveNewTask = false;
    }
  }

  doneCard(index:number):void{
    this.tasks[index].done = !this.tasks[index].done;
    if(this.tasks[index].done === false){
      this.tasks[index].showUndoText = false;
    }
  }

  addNewTask():void{
    this.tasks.unshift(new Task('','',true,true,true));   
  }

  showUndoText(index:number):void{
    if(this.tasks[index].done){
      this.tasks[index].showUndoText = true;
    }
  }

  hideUndoText(index:number):void{
    if(this.tasks[index].done){
      this.tasks[index].showUndoText = false;
    }
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

  teste():void{
    console.log("cricou");
  }



}
import { animate, style, transition, trigger } from '@angular/animations';
import { Component, } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../model/task';
import { TaskService } from '../service/task.service';
import { AppComponent } from '../app.component';
import { UserService } from '../service/user.service';


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
  alertError:boolean = false;

  showTasksDone = false;

  constructor(private router: Router, private taskService:TaskService, private userService:UserService,public app:AppComponent) {}

  ngOnInit(): void{
    this.getUser();
  }


  expandOptionsCard(index:number):void {   
    this.app.user.tasks[index].expanded = !this.app.user.tasks[index].expanded;
  }

  async removeCard(index:number):Promise<void> {
    if(this.allowToRemove === false || this.allowToCancel == false){
      console.log('espere para cancelar');
      this.alerts = true;
      this.alertRemove = true;
      return;
    }
    this.allowToRemove = false;
    this.app.user.tasks[index].isRemoved = !this.app.user.tasks[index].isRemoved;
    await this.sleep(1500);
    this.app.user.tasks.splice(index, 1);
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
    this.app.user.tasks[index].showSaveButton = false;
    await this.sleep(200);

    this.taskService.post(this.app.user.tasks[index],this.app.user).subscribe({
      next: async(response) => {
        this.app.user.tasks[index].isCardSaved = true;
        await this.sleep(1500);
        
        this.app.user.tasks[index].isNew = false;
        
        this.app.user.tasks[index].isCardSaved = false;
        this.app.user.tasks[index].enableSaveNewTask = false;

        this.app.user.tasks[index].name = response.name;
        this.app.user.tasks[index].description = response.description;
      },
      error: async (error) => {
        console.log(error);
        this.alerts = true;
        this.alertError = true;
        await this.sleep(2000);
        this.alertError = false;
        await this.sleep(200);
        this.alerts = false;
        this.app.user.tasks[index].showSaveButton = true;
        this.app.user.tasks[index].isNew = true;
      }    
    });
  }

  async cancelCard(index:number):Promise<void> {
    if(this.app.user.tasks[index].isNew === true){
      if(this.allowToCancel === false || this.allowToRemove == false){
        this.alerts = true;
        this.alertCancel = true;
        return;
      }
      this.allowToCancel = false;
      this.app.user.tasks[index].showSaveButton = false;
      await this.sleep(200);
      this.app.user.tasks[index].isCardCanceled = true;
      await this.sleep(1500);
      
      this.app.user.tasks[index].isCardCanceled = false;

      this.app.user.tasks.splice(index, 1);
      this.allowToCancel = true;
      await this.sleep(400);
      this.alertCancel = false;
      this.alertSave = false;
      await this.sleep(200);
      this.alerts = false;
      
    } else {
      
      this.app.user.tasks[index].showSaveButton = false;
      await this.sleep(200);
      this.app.user.tasks[index].isCardCanceled = true;
      await this.sleep(1500);
      
      this.app.user.tasks[index].isCardCanceled = false;
    
      this.app.user.tasks[index].enableSaveNewTask = false;
    }
  }

  async doneCard(index:number):Promise<void>{
    if(this.app.user.tasks[index].allowToUndo === false){
      return;
    }

    this.app.user.tasks[index].done = !this.app.user.tasks[index].done;

    if(this.app.user.tasks[index].done === false){
      this.app.user.tasks[index].showUndoText = false;
    }

    this.app.user.tasks[index].allowToUndo = false;
    await this.sleep(1500);

    this.app.user.tasks[index].isHide = !this.app.user.tasks[index].isHide;
    this.app.user.tasks[index].allowToUndo = true;

  }

  viewCardDone():void{ 
    this.showTasksDone = !this.showTasksDone;
    for(var i = 0; i < this.app.user.tasks.length; i++){
     if(this.app.user.tasks[i].done == false){
      this.app.user.tasks[i].isHide = !this.app.user.tasks[i].isHide;
     } else {
      this.app.user.tasks[i].isHide = !this.app.user.tasks[i].isHide;
     }

    }

  }

  addNewTask():void{
    this.app.user.tasks.unshift(new Task('','',true,true,true));   
  }

  showUndoText(index:number):void{
    if(this.app.user.tasks[index].done){
      if(this.app.user.tasks[index].allowToUndo){
        this.app.user.tasks[index].showUndoText = true;
      }
    }
  }

  hideUndoText(index:number):void{
    if(this.app.user.tasks[index].done){
      if(this.app.user.tasks[index].allowToUndo){
        this.app.user.tasks[index].showUndoText = false;
      }
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
    this.app.user.id = 0;
    this.app.user.name = '';
    this.app.user.email = '';
    this.app.user.password = '';
    this.app.user.tasks = [];
    this.router.navigate(['/login']);
  }

  async savePassword():Promise<void>{
    this.app.user.password = this.app.newPassword;

    this.userService.updatePassword(this.app.user).subscribe({
      next: async(response) => {
        this.app.user.password = response.password;

        this.isPasswordSaved = true;
        await this.sleep(1500);
        this.changePassShow = false;
        this.isPasswordSaved = false;
        this.app.newPassword = '';
      },
      error: async () => {
      }    
    });
  }


  private async sleep(timeMs:number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, timeMs));
  }

  teste():void{
    console.log("cricou");
  }

  getUser():void{
    this.userService.getUser(this.app.user).subscribe({
      next: async(response) => {
        this.app.user.id = response.id;
        this.app.user.name = response.name;
        this.app.user.email = response.email;
        this.app.user.tasks = response.tasks;

        console.log(this.app.user);
      },
      error: async (error) => {
        console.log(error);
      }    
    });
  }



}
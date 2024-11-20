import { animate, style, transition, trigger } from '@angular/animations';
import { Component, } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../model/task';
import { TaskService } from '../service/task.service';
import { AppComponent } from '../app.component';
import { UserService } from '../service/user.service';
import { CookiesService } from '../service/cookies.service';
import { LoadingService } from '../service/loading.service';
import { TokenService } from '../service/token.service';


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
  savePassShow:boolean = true;

  isPasswordSaved:boolean = false;

  allowToRemove:boolean = true;
  allowToCancel:boolean = true;

  alerts:boolean = false;
  alertCancel:boolean = false;
  alertRemove:boolean = false;
  alertSave:boolean = false;
  alertError:boolean = false;

  showLoadingSavePass:boolean = false;
  showLoadingCard:boolean = false;

  showTasksDone = false;

  works:boolean = false;
  attempt:number = 0;

  constructor(private router: Router, private taskService:TaskService, private userService:UserService,private cookieService:CookiesService,public app:AppComponent, public loadingService: LoadingService,
              private tokenService:TokenService
  ) {}

  ngOnInit(): void{
    this.getUser();
  }


  expandOptionsCard(index:number):void {   
    this.app.user.tasks[index].expanded = !this.app.user.tasks[index].expanded;
  }

  async removeCard(index:number):Promise<void> {
    if(this.allowToRemove === false || this.allowToCancel == false){
      this.alerts = true;
      this.alertRemove = true;
      return;
    }
    this.allowToRemove = false;

    this.app.user.tasks[index].showLoadingCardChanges = true;
    this.loadingService.show();
    
    this.taskService.delete(this.app.user.tasks[index]).subscribe({
      next: async() => {
        this.loadingService.hide();
        this.app.user.tasks[index].showLoadingCardChanges = false;
        this.app.user.tasks[index].isRemoved = !this.app.user.tasks[index].isRemoved;
        await this.sleep(1500);
        this.app.user.tasks.splice(index, 1);
        this.allowToRemove = true;
        await this.sleep(400);
        this.alertRemove = false;
        this.alertSave = false;
        await this.sleep(200);
        this.alerts = false;
      },
      error: async (error) => {
        this.loadingService.hide();
        this.app.user.tasks[index].showLoadingCardChanges = false;
        console.log(error);
        this.alerts = true;
        this.alertError = true;
        await this.sleep(2000);
        this.alertError = false;
        await this.sleep(200);
        this.alerts = false;
        this.allowToRemove = true;
      }    
    });
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

        this.app.user.tasks[index].id = response.id;
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

    this.app.user.tasks[index].allowToUndo = false;

    this.app.user.tasks[index].done = !this.app.user.tasks[index].done;
    
    if(this.app.user.tasks[index].done === false){
      this.app.user.tasks[index].showUndoText = false;
    } 

    this.app.user.tasks[index].showLoadingCardChanges = true;
    this.loadingService.show();

    this.taskService.update(this.app.user.tasks[index]).subscribe({
      next: async(response) => {
        this.app.user.tasks[index].id = response.id;
        this.app.user.tasks[index].name = response.name;
        this.app.user.tasks[index].description = response.description;
        this.app.user.tasks[index].done = response.done;

        this.loadingService.hide();
        this.app.user.tasks[index].showLoadingCardChanges = false;

        await this.sleep(1500);

        this.app.user.tasks[index].isHide = !this.app.user.tasks[index].isHide;
        this.app.user.tasks[index].allowToUndo = true;
      },
      error: async (error) => {
        this.loadingService.hide();
        this.app.user.tasks[index].showLoadingCardChanges = false;
        if(this.app.user.tasks[index].done === true){
          this.app.user.tasks[index].done = false;
        } else if (this.app.user.tasks[index].done === false){
          this.app.user.tasks[index].done = true;
        }
        console.log(error);
        this.alerts = true;
        this.alertError = true;
        await this.sleep(2000);
        this.alertError = false;
        await this.sleep(200);
        this.alerts = false;
        this.app.user.tasks[index].allowToUndo = true;
      }    
    });

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
    if(this.showTasksDone === true){
      this.viewCardDone();
    }
    this.app.user.tasks.push(new Task('','',true,true,true));   
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

    this.cookieService.deleteCookie().subscribe({});
    this.router.navigate(['/login']);

    this.loadingService.hide();
  }

  async savePassword():Promise<void>{
    this.app.user.password = this.app.newPassword;

    this.savePassShow = false;
    this.showLoadingSavePass = true;
    this.loadingService.show();

    this.userService.updatePassword(this.app.user).subscribe({
      next: async(response) => {
        this.loadingService.hide();
        this.showLoadingSavePass = false;
        this.app.user.password = response.password;

        this.isPasswordSaved = true;
        await this.sleep(1500);
        this.changePassShow = false;
        this.isPasswordSaved = false;
        this.app.newPassword = '';
        this.savePassShow = true;
      },
      error: async (error) => {
        this.loadingService.hide();
        this.showLoadingSavePass = false;
        console.log(error);
        this.alerts = true;
        this.alertError = true;
        await this.sleep(2000);
        this.alertError = false;
        await this.sleep(200);
        this.alerts = false;
        this.savePassShow = true;
      }
    });
  }

  enterFocus(index:number):void{
    this.app.user.tasks[index].oldName = this.app.user.tasks[index].name;
    this.app.user.tasks[index].oldDescription = this.app.user.tasks[index].description;
  }
  
  async exitFocusTextArea(index:number):Promise<void>{
    if(this.app.user.tasks[index].isNew){
      return;
    }

    this.app.user.tasks[index].showLoadingCardChanges = true;
    this.loadingService.show();

    
    this.taskService.update(this.app.user.tasks[index]).subscribe({
      next: async(response) => {
        this.loadingService.hide();
        this.app.user.tasks[index].showLoadingCardChanges = false;
        this.app.user.tasks[index].id = response.id;
        this.app.user.tasks[index].name = response.name;
        this.app.user.tasks[index].description = response.description;
        this.app.user.tasks[index].done = response.done;

      },
      error: async (error) => {
        this.loadingService.hide();
        this.app.user.tasks[index].showLoadingCardChanges = false;

        this.app.user.tasks[index].name = this.app.user.tasks[index].oldName;
        this.app.user.tasks[index].description = this.app.user.tasks[index].oldDescription;

        console.log(error);
        this.alerts = true;
        this.alertError = true;
        await this.sleep(2000);
        this.alertError = false;
        await this.sleep(200);
        this.alerts = false;
      }    
    });
  }
  
  async getUser():Promise<void>{
    
    this.showLoadingCard = true;
    this.loadingService.show();
    this.userService.getUser(this.app.user.email).subscribe({
      next: async(response) => {
        this.app.user.id = response.id;
        this.app.user.name = response.name;
        this.app.user.email = response.email;

        this.loadingService.hide();
        this.showLoadingCard = false;
        this.app.user.tasks = response.tasks;

        console.log(this.app.user);
        
        this.hideTasks();
      },
      error: async (error) => {
          await this.getRefreshToken();
          if(this.works === true && this.attempt < 1){     
            this.attempt++;
            this.getUser();
            return;
          }
          this.loadingService.hide();
          this.showLoadingCard = false;
      }    
    });
  }
  
  hideTasks():void{
    for(var i = 0; i < this.app.user.tasks.length; i++){    
      if(this.app.user.tasks[i].done == true){
        this.app.user.tasks[i].isHide = true;
        this.app.user.tasks[i].allowToUndo = true;
      }
    }
  }
  
  
  private async sleep(timeMs:number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, timeMs));
  }

  private async getRefreshToken():Promise<void>{
    this.showLoadingCard = true;
    this.loadingService.show();
    this.tokenService.refresh().subscribe({
      next: async() => {
        this.loadingService.hide();
        this.showLoadingCard = false;
      },
      error: async (error) => {
          console.log(error);
          this.loadingService.hide();
          this.showLoadingCard = false;
          this.works = false;
      }    
    });
    this.works = true;
  }
  
}
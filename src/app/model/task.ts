import { User } from "./user";

export class Task{
    
    name:string;
    description:string;
    done:boolean = false;

    user:User;

    //state variables
    expanded:boolean = false;
    enableSaveNewTask:boolean = false;
    showSaveButton:boolean = false;
    showUndoText:boolean = false;

    isCardSaved:boolean = false;
    isCardCanceled:boolean = false;
    isRemoved:boolean = false;
    allowToUndo:boolean = true;
    isNew:boolean = false;
    isHide:boolean = false;

    constructor(name?:string, description?:string, user?:User, isNew?:boolean, showSaveButton?:boolean, enableSaveNewTask?:boolean){
        this.name = name ?? '';
        this.description = description ?? '';
        this.user = user ?? new User;
        this.isNew = isNew ?? false;
        this.showSaveButton = showSaveButton ?? false;
        this.enableSaveNewTask = enableSaveNewTask ?? false;
    }


}
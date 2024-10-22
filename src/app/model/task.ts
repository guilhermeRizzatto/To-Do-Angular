import { User } from "./user";

export class Task{
    
    id:number = 0;
    name:string;
    description:string;
    done:boolean = false;

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

    constructor(name?:string, description?:string, isNew?:boolean, showSaveButton?:boolean, enableSaveNewTask?:boolean){
        this.name = name ?? '';
        this.description = description ?? '';
        this.isNew = isNew ?? false;
        this.showSaveButton = showSaveButton ?? false;
        this.enableSaveNewTask = enableSaveNewTask ?? false;
    }


}
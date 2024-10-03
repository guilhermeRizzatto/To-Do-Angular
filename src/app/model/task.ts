export class Task{
    
    name:string;
    description:string;

    //state variables
    expanded:boolean = false;
    enableDescripChange = false;
    enableTitleChange:boolean = false;
    showSaveButton:boolean = false;
    isCardSaved:boolean = false;
    isCardCanceled:boolean = false;
    isRemoved:boolean = false;
    isNew:boolean = false;
    titleRemove:boolean = false;
    oldName:string = '';
    oldDescription:string = '';

    constructor(name?:string, description?:string, titleRemove?:boolean, isNew?:boolean, showSaveButton?:boolean, enableTitleChange?:boolean, enableDescripChange?:boolean){
        this.name = name ?? '';
        this.description = description ?? '';
        this.isNew = isNew ?? false;
        this.titleRemove = titleRemove ?? false;
        this.showSaveButton = showSaveButton ?? false;
        this.enableTitleChange = enableTitleChange ?? false;
        this.enableDescripChange = enableDescripChange ?? false;
    }


}
import { Task } from "./task";

export class User {

    id: number = 0;
    name: string = '';
    email: string = '';
    password: string = '';

    tasks:Task[] = [];
}

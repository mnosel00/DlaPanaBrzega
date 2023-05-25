import { Role } from "../enums/role.enum";

export interface User{
    ID:string;
    login: string;
    passwd: string;
    name: string;
    surname: string;
    role: Role

}
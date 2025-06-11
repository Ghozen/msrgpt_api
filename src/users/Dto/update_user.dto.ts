import { IsEmail, IsMobilePhone, IsNotEmpty, IsString } from "class-validator";


export class updateUserDto{

    
    fullName: string;
    pseudo?: string;
    email?: string;
    telNumber?:string;

    @IsString()
    @IsNotEmpty()
    idUsers: string;


}
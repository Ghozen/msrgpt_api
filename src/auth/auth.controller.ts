import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUserDto } from 'src/users/Dto/create_user.dto';
import { Response } from 'express';
import { ConnexionDto } from './connexion.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

@Post('inscription')
 createUser(@Body() userData: createUserDto, @Res() res:Response){

    return this.authService.createUser(userData.fullName, userData.pseudo, 
        userData.password, userData.email, res);
 }

 @Post('connexion')
  connexion(@Body() userData: ConnexionDto, @Res() res: Response ){
    return this.authService.connexion(userData.email, userData.password, res);

  }
@Post('verification/otp')
 otpverify(@Body()  dataUser:string, @Res() res: Response){
       console.log("email:",dataUser["email"]);
  
  return this.authService.verifyOtp(dataUser["codeOtp"],dataUser["email"],res)

 }


}



import { Body, Controller, Delete, Get, Param, Post, Put, Request, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto} from './Dto/create_user.dto';
import { updateUserDto } from './Dto/update_user.dto';
import { Response } from "express";
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Controller('users')
export class UsersController {

   constructor(private userService: UsersService){}

   @Get('all')
   getAllUser(@Res() res:Response) {
      return this.userService.getAllUser(res);
   }
   
    @UseGuards(JwtAuthGuard)// Permet d'avoir accès si tu es connecté
    @Get('user/info')// route
    getUser(@Request() req, @Res() res: Response){
      const userId = req.user.userId;

      console.log(req)
      return this.userService.UserInfo(userId,res);
    }


   @UseGuards(JwtAuthGuard)
   @Put('update/profile')
   updateProfile(@Body() userData: updateUserDto, @Res() res:Response){
      console.log(userData);
    return this.userService.updateProfile(userData, res);
   }
   
   @UseGuards(JwtAuthGuard)
   @Delete('delete/profile/:id')
    deleteProfile(@Param('id') idUsers: string, @Res() res:Response){
      return this.userService.deleteProfile(idUsers, res);

    }
   
}

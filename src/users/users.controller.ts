import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto} from './Dto/create_user.dto';
import { updateUserDto } from './Dto/update_user.dto';
import { Response } from "express";


@Controller('users')
export class UsersController {

   constructor(private userService: UsersService){}

   @Get('all')
   getAllUser(@Res() res:Response) {
      return this.userService.getAllUser(res);
   }

   @Put('update/profile')
   updateProfile(@Body() userData: updateUserDto, @Res() res:Response){
      console.log(userData);
    return this.userService.updateProfile(userData, res);
   }

   @Delete('delete/profile/:id')
    deleteProfile(@Param('id') idUsers: string, @Res() res:Response){
      return this.userService.deleteProfile(idUsers, res);

    }
   
}

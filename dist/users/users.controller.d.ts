import { UsersService } from './users.service';
import { updateUserDto } from './Dto/update_user.dto';
import { Response } from "express";
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    getAllUser(res: Response): Promise<Response<any, Record<string, any>>>;
    getUser(req: any, res: Response): Promise<Response<any, Record<string, any>>>;
    updateProfile(userData: updateUserDto, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deleteProfile(idUsers: string, res: Response): Promise<Response<any, Record<string, any>>>;
}

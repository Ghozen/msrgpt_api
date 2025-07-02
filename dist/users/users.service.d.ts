import { createUserDto } from './Dto/create_user.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { updateUserDto } from './Dto/update_user.dto';
import { Response } from "express";
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    createUser(userData: createUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllUser(res: Response): Promise<Response<any, Record<string, any>>>;
    UserInfo(userId: string, res: Response): Promise<Response<any, Record<string, any>>>;
    updateProfile(userData: updateUserDto, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    deleteProfile(idUsers: string, res: Response): Promise<Response<any, Record<string, any>>>;
}

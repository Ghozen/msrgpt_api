import { AuthService } from './auth.service';
import { createUserDto } from 'src/users/Dto/create_user.dto';
import { Response } from 'express';
import { ConnexionDto } from './connexion.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    createUser(userData: createUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    connexion(userData: ConnexionDto, res: Response): Promise<Response<any, Record<string, any>>>;
    otpverify(dataUser: string, res: Response): Promise<Response<any, Record<string, any>>>;
}

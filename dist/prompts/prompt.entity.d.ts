import { User } from 'src/users/user.entity';
export declare class Prompt {
    id: string;
    message: string;
    reponse: string;
    creation_date: string;
    user: User;
}

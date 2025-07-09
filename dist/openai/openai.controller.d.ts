import { OpenaiService } from './openai.service';
import { DataPromptDto } from './dto/data-prompt.dto';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
export declare class OpenaiController {
    private readonly openaiService;
    private readonly userRepository;
    constructor(openaiService: OpenaiService, userRepository: Repository<User>);
    sendPrompt(dataprompt: DataPromptDto, res: Response, req: any): Promise<Response<any, Record<string, any>>>;
}

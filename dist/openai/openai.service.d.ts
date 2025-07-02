import { Prompt } from 'src/prompts/prompt.entity';
import { Repository } from 'typeorm';
import { Response } from 'express';
import { User } from 'src/users/user.entity';
import { Prompt_Usage } from 'src/prompts/prompt_usage.entity';
export declare class OpenaiService {
    private readonly promptRespository;
    private readonly userRespository;
    private readonly usageRespository;
    private openai;
    private promptNumber;
    constructor(promptRespository: Repository<Prompt>, userRespository: Repository<User>, usageRespository: Repository<Prompt_Usage>);
    promptCount(): number;
    sendPrompt(prompt: string, userId: string, res: Response): Promise<Response<any, Record<string, any>>>;
}

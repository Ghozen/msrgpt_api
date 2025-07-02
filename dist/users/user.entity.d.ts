import { Prompt } from 'src/prompts/prompt.entity';
import { Prompt_Usage } from 'src/prompts/prompt_usage.entity';
export declare class User {
    id: string;
    fullName: string;
    pseudo: string;
    email: string;
    password: string;
    telNumber: string;
    countPrompt: number;
    lastPromptDate: Date;
    creation_date: string;
    emailverify: boolean;
    codeOtp: string;
    isActive: boolean;
    prompt: Prompt[];
    prompt_Usage: Prompt_Usage[];
}

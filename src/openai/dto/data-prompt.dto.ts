import { IsNotEmpty, IsString } from "class-validator";

export class DataPromptDto{

    @IsNotEmpty()
    @IsString()
    option: string;

    @IsNotEmpty()
    @IsString()
    prompt: string;

}
import { Injectable } from '@nestjs/common';
import {OpenAI} from "openai";

@Injectable()
export class OpenaiService {

    constructor(
         private openai: OpenAI,
    ){
        this.openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});
    }


    async sendPrompt(prompt: string){

        const completion = await this.openai.chat.completions.create({
            model: "gpt-4.1",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

console.log(completion.choices[0].message.content);

return completion.choices[0].message.content;
    }
       
}

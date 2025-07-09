import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {OpenAI} from "openai";
import { Prompt } from 'src/prompts/prompt.entity';
import { Repository } from 'typeorm';
import { Response } from 'express';
import { User } from 'src/users/user.entity';
import { Prompt_Usage } from 'src/prompts/prompt_usage.entity';

@Injectable()
export class OpenaiService {
   private openai: OpenAI
   private promptNumber: number 

    constructor(
        @InjectRepository(Prompt)
        private readonly promptRespository: Repository<Prompt>,
        @InjectRepository(User)
        private readonly userRespository: Repository<User>,
        @InjectRepository(Prompt_Usage)
        private readonly usageRespository: Repository<Prompt_Usage>,
    )
        
   {

        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });

        this.promptNumber = 0; // initialisation du compteur de prompt

    }
    
    promptCount(): number {
            return this.promptNumber + 1;
    }

     async confirmEmail(userId: string, res: Response, req: any) {
        
        try {
            
              const userVerify = await this.userRespository.findOne({
            where: {id: req.user.userId},
        });
        // Vérification de l'existence de l'utilisateur
        

        if(!userVerify){
            return res.status(HttpStatus.FORBIDDEN).json({
                error: true,
                message: "Utilisateur non trouvé"
            });
        }
        // verification que le champs emailVerify est à true
        if(userVerify.emailverify !== true){
            return res.status(HttpStatus.FORBIDDEN).json({
                error: true,
                message: "Veuillez confirmer votre email avant de continuer"
            });
        }

        } catch (error) {
            console.log("Error:", error)
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: true,
                message: `Erreur survenu: ${error.message}`
            })
            
        }
     }

    async sendPrompt(prompt: string, userId: string, res: Response) {

         try {

            // verification de l'existance de l'utilisateur

            const verifyUser = await this.userRespository.findOne({
                where: {id: userId},
            });

            if(!verifyUser){
                return res.status(HttpStatus.FORBIDDEN).json({
                    error: true,
                    message: "Utilisateur non trouvé"
                });
            }

        // verificatio de l'existance de l'utilisateur dans la table  promptUsage
        let usage = await this.usageRespository.findOne({
            where: { 
                user: { id: userId },
                date: new Date().toISOString().split('T')[0] // verifie si l'entrée est pour aujourd'hui
            },
            relations: ['user'] // Assurez-vous que la relation avec l'utilisateur(user) est chargée 
        });

        //si l'utilsateur atteint le nombre de prompt maximum renvoyer un message d'erreur
          if(usage && usage.comptage_prompt >= 5){
            return res.status(HttpStatus.FORBIDDEN).json({
                error: true,
                message: "Vous avez atteint la limite des 5 prompts par  jour."
            });
          }
       

         const completion = await this.openai.chat.completions.create({
            model: "gpt-4.1",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

       if (!completion.choices?.[0]?.message?.content) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                error: true,
                mesaage:"Réponse OpenAI invalide"
            });
        }
           const aiReponse = completion.choices[0].message.content;

            const newPrompt = await this.promptRespository.create({
                message: prompt,
                reponse: aiReponse,
          });
             await this.promptRespository.save(newPrompt);

             if(usage){
                // si l'utilisateur existe déjà dans la table promptUsage, on incrémente le compteur
                usage.comptage_prompt += 1;
             }
                else{
                // sinon on crée une nouvelle entrée pour l'utilisateur dans la table promptUsage
                usage = this.usageRespository.create({
                    user: verifyUser,
                    comptage_prompt: 1,
                    date: new Date().toISOString().split('T')[0] // utiliser la date du jour
                    
                });
             }
                await this.usageRespository.save(usage);

                return res.status(HttpStatus.OK).json({
                    error: false,
                    message: " Prompt enregistré avec succès",
                    prompt: prompt,
                    data: aiReponse,
                    limite: `Vous avez utilisé ${usage.comptage_prompt} prompts aujourd'hui. Il vous reste ${5 - usage.comptage_prompt} prompts pour aujourd'hui.`,
                });
             } 
      catch (error) {
            console.log("Error:", error)
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: true,
                message: `Erreur survenu: ${error.message}`
            })
     }}

       
    }
    

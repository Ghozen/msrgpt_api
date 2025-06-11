import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { DataPromptDto } from './dto/data-prompt.dto';
import{ Response } from  'express'

@Controller('openai')
export class OpenaiController {

    constructor(private readonly openaiService: OpenaiService){}

    @Post('/chat')
    async sendPrompt(@Body() dataprompt: DataPromptDto, @Res() res:Response){
         
      try {

            const fullPrompt = `Option sélectionnée : ${dataprompt.option}. Action : ${dataprompt.prompt}.\nRetourne uniquement la commande à exécuter sans aucun commentaire ni explication.`;
            const response = await this.openaiService.sendPrompt(fullPrompt);
            return res.status(HttpStatus.OK).json({
                error: false,
                message: "requete excutée avec succès",
                data:response,
            });
        } catch (error) {
            console.error("Erreur lors de l'envoi du pompt:", error);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ 
                error: "Echec d'envoi du prompt"});
        }
    }
      
}

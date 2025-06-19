import { Module } from '@nestjs/common';
import { OpenaiController } from './openai.controller';
import { OpenaiService } from './openai.service';
import OpenAI from 'openai';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prompt } from 'src/prompts/prompt.entity';
import { User } from 'src/users/user.entity';
import { Prompt_Usage } from 'src/prompts/prompt_usage.entity';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([Prompt,User,Prompt_Usage]), 
      ], // le module TypeOrm pour la gestion des entitées

  controllers: [OpenaiController],
  providers: [OpenaiService,OpenAI]
})
export class OpenaiModule {}

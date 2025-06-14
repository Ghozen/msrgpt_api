import { Module } from '@nestjs/common';
import { OpenaiController } from './openai.controller';
import { OpenaiService } from './openai.service';
import OpenAI from 'openai';

@Module({
  controllers: [OpenaiController],
  providers: [OpenaiService,OpenAI]
})
export class OpenaiModule {}

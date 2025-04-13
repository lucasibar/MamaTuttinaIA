import { Controller, Post, Body, Logger, UseGuards } from '@nestjs/common';
import { ChatDto } from './dto/chat.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('/chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  private readonly logger = new Logger(ChatController.name);

  @Post()
  async handleChat(@Body() chatDto: ChatDto) {
    console.log('Received chat data:', JSON.stringify(chatDto, null, 2));
    this.logger.log('Received chat data:', JSON.stringify(chatDto, null, 2));
    const response = {
      message: 'Información recibida correctamente',
      data: chatDto
    };

    return response;
  }
} 
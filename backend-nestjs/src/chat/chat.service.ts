import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  async processMessage(message: string) {
    // Por ahora, simplemente devolvemos el mismo mensaje
    return { message };
  }
} 
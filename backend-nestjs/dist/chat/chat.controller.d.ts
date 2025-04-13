import { ChatDto } from './dto/chat.dto';
export declare class ChatController {
    private readonly logger;
    handleChat(chatDto: ChatDto): Promise<{
        message: string;
        data: ChatDto;
    }>;
}

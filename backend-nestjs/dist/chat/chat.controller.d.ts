import { ChatService } from './chat.service';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    handleMessage(body: {
        message: string;
    }): Promise<{
        message: string;
    }>;
}

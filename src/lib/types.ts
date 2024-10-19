export interface Contact {
    id: string;
    name: string;
    lastMessage?: string;
    lastMessageDate?: Date;
}

export interface Message {
    id: string;
    content: string;
    timestamp: Number;
    direction: 'in' | 'out';
}
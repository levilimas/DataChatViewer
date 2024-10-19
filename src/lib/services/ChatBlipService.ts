import { Contact, Message } from "../types";

export class ChatBlipService {
    private apiKey: string;
    private baseUrl = 'https://http.msging.net';

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    async validateKey(): Promise<boolean> {
        try {
            const response = await fetch(`${this.baseUrl}/commands`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.apiKey
                },
                body: JSON.stringify({
                    id: crypto.randomUUID(),
                    method: 'get',
                    uri: '/account'
                })
            });
            return response.ok;
        } catch {
            return false;
        }
    }

    async getContacts(page: number, size: number): Promise<Contact[]> {
        const response = await fetch(`${this.baseUrl}/commands`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.apiKey
            },
            body: JSON.stringify({
                id: crypto.randomUUID(),
                method: 'get',
                uri: '/contacts',
                skip: page * size,
                take: size
            })
        });
        return response.json();
    }

    async getMessages(contactId: string): Promise<Message[]> {
        const response = await fetch(`${this.baseUrl}/commands`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.apiKey
            },
            body: JSON.stringify({
                id: crypto.randomUUID(),
                method: 'get',
                uri: `/threads/${contactId}/messages`
            })
        });
        return response.json();
    }
}
<script lang="ts">
    import { auth } from '../../../lib/stores/auth';
    import type { Message } from '../../../lib/types';
    import { page } from '$app/stores';
    import { ChatBlipService } from '../../../lib/services/chatBlipService';

    let messages: Message[] = [];
    let loading = false;

    $: contactId = $page.params.id;

    async function loadMessages() {
        if (!$auth || !contactId) return;
        loading = true;
        try {
            const service = new ChatBlipService($auth);
            messages = await service.getMessages(contactId);
        } finally {
            loading = false;
        }
    }

    $: {
        contactId;
        loadMessages();
    }
</script>

<div class="max-w-4xl mx-auto p-4">
    <div class="space-y-4">
        {#each messages as message}
            <div
                class="p-4 rounded max-w-[70%] {message.direction === 'in' 
                    ? 'bg-gray-100 mr-auto' 
                    : 'bg-blue-100 ml-auto'}"
            >
                <p>{message.content}</p>
                <span class="text-xs text-gray-500">
                    {new Date(message.timestamp).toLocaleString()}
                </span>
            </div>
        {/each}
    </div>
</div>
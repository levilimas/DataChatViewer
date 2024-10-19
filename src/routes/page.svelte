<script lang="ts">
    import { onMount } from 'svelte';
    import { auth } from '$lib/stores/auth';
    import { BlipService } from '$lib/services/blipService';
    import type { Contact } from '$lib/types';

    let contacts: Contact[] = [];
    let page = 0;
    let loading = false;
    const PAGE_SIZE = 10;

    async function loadContacts() {
        if (!$auth) return;
        loading = true;
        try {
            const service = new BlipService($auth);
            contacts = await service.getContacts(page, PAGE_SIZE);
        } finally {
            loading = false;
        }
    }

    $: {
        page;
        loadContacts();
    }
</script>

<div class="max-w-4xl mx-auto p-4">
    <div class="space-y-4">
        {#each contacts as contact}
            <a
                href="/contato/{contact.id}"
                class="block p-4 border rounded hover:bg-gray-50"
            >
                <h3 class="font-medium">{contact.name}</h3>
                {#if contact.lastMessage}
                    <p class="text-gray-500 text-sm">{contact.lastMessage}</p>
                {/if}
            </a>
        {/each}
    </div>

    <div class="mt-4 flex justify-between">
        <button
            on:click={() => page = Math.max(0, page - 1)}
            disabled={page === 0 || loading}
            class="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
            Anterior
        </button>
        <button
            on:click={() => page += 1}
            disabled={loading}
            class="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
            Próximo
        </button>
    </div>
</div>
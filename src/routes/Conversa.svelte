<script lang="ts">
    import { onMount } from 'svelte';
    import { auth } from '../stores/auth';
    import { goto } from 'svelte-routing';
    import MessageList from '../components/MessageList.svelte';
  
    let messages = [];
    let apiKey: string;
    export let id;
  
    $: auth.subscribe(value => apiKey = value);
  
    async function fetchMessages(contactId: string) {
      const response = await fetch(`https://api.blip.ai/messages/${contactId}`, {
        headers: { 'Authorization': `Key ${apiKey}` }
      });
      messages = await response.json();
    }
  
    onMount(() => {
      if (!apiKey) {
        goto('/login');
      } else {
        fetchMessages(id);
      }
    });
  </script>
  
  <MessageList {messages} />
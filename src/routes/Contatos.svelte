<script lang="ts">
    import { auth } from '../stores/auth';
    import { onMount } from 'svelte';
    import { goto } from 'svelte-routing';
    import ContactList from '../components/ContactList.svelte';
  
    let contacts = [];
    let apiKey: string;
  
    $: auth.subscribe(value => apiKey = value);
  
    async function fetchContacts(page = 1) {
      const response = await fetch(`https://api.blip.ai/contacts?page=${page}`, {
        headers: { 'Authorization': `Key ${apiKey}` }
      });
      contacts = await response.json();
    }
  
    onMount(() => {
      if (!apiKey) {
        goto('/login');
      } else {
        fetchContacts();
      }
    });
  </script>
  
  <ContactList {contacts} />
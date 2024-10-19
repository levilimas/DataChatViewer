<script>
    export let contacts = [];
    import { goto } from 'svelte-routing';
  
    function viewContact(id) {
      goto(`/contato/${id}`);
    }
  </script>
  
  <ul>
    {#each contacts as contact}
      <li on:click={() => viewContact(contact.id)} class="cursor-pointer">
        {contact.name}
      </li>
    {/each}
  </ul>
<script>
    export let messages = [];
  </script>
  
  <ul>
    {#each messages as message}
      <li>
        <strong>{message.sender}</strong>: {message.content}
      </li>
    {/each}
  </ul>
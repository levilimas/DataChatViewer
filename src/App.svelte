<script>
	import { Router } from 'svelte-routing';
	import Login from './routes/login/LoginPage.svelte';
	import Contatos from './routes/Contatos';
	import Conversa from './routes/Conversa.svelte';
  </script>
  
  <Router>
	<Login path="/login" />
	<Contatos path="/" />
	<Conversa path="/contato/:id" />
  </Router>
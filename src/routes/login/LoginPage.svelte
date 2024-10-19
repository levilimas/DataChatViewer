<script lang="ts">
  import { auth } from '../../lib/stores/auth';
  import { BlipService } from '$lib/services/blipService';
  import { goto } from '$app/navigation';

  let apiKey = '';
  let loading = false;
  let error = '';

  async function handleSubmit() {
      loading = true;
      error = '';

      const service = new BlipService(apiKey);
      try {
          const isValid = await service.validateKey();
          if (isValid) {
              auth.setApiKey(apiKey);
              goto('/');
          } else {
              error = 'Chave API inválida';
          }
      } catch {
          error = 'Erro ao validar chave';
      } finally {
          loading = false;
      }
  }
</script>

<div class="min-h-[calc(100vh-4rem)] flex items-center justify-center">
  <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
      <div class="text-center">
          <h2 class="text-3xl font-extrabold text-gray-900">DataChatViewer</h2>
          <p class="mt-2 text-sm text-gray-600">Insira sua chave API do Blip para continuar</p>
      </div>
      <form on:submit|preventDefault={handleSubmit} class="space-y-6">
          <input
              type="text"
              bind:value={apiKey}
              placeholder="Chave API do Blip"
              class="w-full p-2 border rounded"
              required
          />
          {#if error}
              <p class="text-red-500">{error}</p>
          {/if}
          <button
              type="submit"
              disabled={loading}
              class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
              {loading ? 'Validando...' : 'Entrar'}
          </button>
      </form>
  </div>
</div>
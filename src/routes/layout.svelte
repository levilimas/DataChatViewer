<script lang="ts">
    import '../app.css';
    import { auth } from '$lib/stores/auth';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';

    $: if (!$auth && !$page.url.pathname.includes('/login')) {
        goto('/login');
    }
</script>

<slot />
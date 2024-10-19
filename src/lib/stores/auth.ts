import { writable } from 'svelte/store';

const createAuthStore = () => {
    const { subscribe, set } = writable<string | null>(
        typeof localStorage !== 'undefined' ? localStorage.getItem('apiKey') : null
    );

    return {
        subscribe,
        setApiKey: (apiKey: string) => {
            localStorage.setItem('apiKey', apiKey);
            set(apiKey);
        },
        logout: () => {
            localStorage.removeItem('apiKey');
            set(null);
        }
    };
};

export const auth = createAuthStore();
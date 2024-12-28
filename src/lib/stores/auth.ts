import { writable } from 'svelte/store';
import { getStoredToken, clearStoredToken } from '$lib/auth';

interface User {
    id: string;
    email: string;
    name: string;
    role: 'ADMIN' | 'OPERATOR';
}

interface AuthStore {
    user: User | null;
    loading: boolean;
    error: string | null;
    token: string | null;
}

const createAuthStore = () => {
    // Inicializar con el token almacenado
    const initialToken = getStoredToken();
    
    const { subscribe, set, update } = writable<AuthStore>({
        user: null,
        loading: false,
        error: null,
        token: initialToken
    });

    return {
        subscribe,
        setUser: (user: User | null) => 
            update(state => ({ ...state, user, error: null })),
        setLoading: (loading: boolean) => 
            update(state => ({ ...state, loading })),
        setError: (error: string | null) => 
            update(state => ({ ...state, error })),
        setToken: (token: string | null) =>
            update(state => ({ ...state, token })),
        logout: () => {
            clearStoredToken();
            set({ user: null, loading: false, error: null, token: null });
        }
    };
};

export const auth = createAuthStore();

// Inicializar la autenticación si hay un token almacenado
if (typeof window !== 'undefined') {
    const token = getStoredToken();
    if (token) {
        // Aquí podrías hacer una llamada al servidor para validar el token
        // y obtener la información del usuario
        fetch('/api/auth/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.user) {
                auth.setUser(data.user);
            }
        })
        .catch(() => {
            auth.logout();
        });
    }
}
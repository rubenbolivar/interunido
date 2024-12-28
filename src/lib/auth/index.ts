import { writable } from 'svelte/store';

export interface User {
    id: string;
    email: string;
    name: string;
    role: 'ADMIN' | 'OPERATOR';
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface AuthStore {
    user: User | null;
    loading: boolean;
    error: string | null;
    token: string | null;
}

// Funciones de manejo de token
export function getStoredToken(): string | null {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('auth_token');
    }
    return null;
}

export function setStoredToken(token: string): void {
    if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', token);
    }
}

export function clearStoredToken(): void {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
    }
}

export async function register(email: string, password: string, name: string): Promise<AuthResponse> {
    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, name })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error durante el registro');
    }

    const data = await response.json();
    setStoredToken(data.token);
    return data;
}

export async function login(email: string, password: string): Promise<AuthResponse> {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Error durante el inicio de sesión');
    }

    const data = await response.json();
    setStoredToken(data.token);
    return data;
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
            localStorage.removeItem('auth_token');
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
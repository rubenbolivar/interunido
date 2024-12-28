import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

interface JWTPayload {
    userId: string;
    email: string;
    name: string;
    role: 'ADMIN' | 'OPERATOR';
}

const auth: Handle = async ({ event, resolve }) => {
    const token = event.cookies.get('token');

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || '') as JWTPayload;
            event.locals.user = decoded;
        } catch (err) {
            event.cookies.delete('token', { path: '/' });
        }
    }

    return resolve(event);
};

export const handle = sequence(auth);
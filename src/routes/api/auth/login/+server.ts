import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const body = await request.json();
        console.log('Login request body:', body); // Debug

        if (!body.email || !body.password) {
            return json({ 
                error: 'Email y contraseña son requeridos' 
            }, { 
                status: 400 
            });
        }

        const { email, password } = body;
        
        const user = await prisma.user.findUnique({
            where: { email }
        });

        console.log('Found user:', user ? 'yes' : 'no'); // Debug

        if (!user) {
            return json({ 
                error: 'Usuario no encontrado' 
            }, { 
                status: 400 
            });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        console.log('Password valid:', validPassword); // Debug

        if (!validPassword) {
            return json({ 
                error: 'Contraseña incorrecta' 
            }, { 
                status: 400 
            });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email, name: user.name, role: user.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        return json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            },
            token
        }, {
            headers: {
                'Set-Cookie': `token=${token}; Path=/; HttpOnly; SameSite=Strict`
            }
        });
    } catch (error: any) {
        console.error('Login error:', error); // Debug
        return json({ 
            error: error.message || 'Error desconocido durante el inicio de sesión' 
        }, { 
            status: 400 
        });
    }
};
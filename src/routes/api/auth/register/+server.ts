import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const body = await request.json();
        console.log('Request body:', body); // Debug

        if (!body.email || !body.password || !body.name) {
            return json({ 
                error: 'Todos los campos son requeridos' 
            }, { 
                status: 400 
            });
        }

        const { email, password, name } = body;
        
        // Verificar si el usuario ya existe
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return json({ 
                error: 'El email ya está registrado' 
            }, { 
                status: 400 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: 'OPERATOR'
            }
        });
        
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
        console.error('Registration error:', error); // Debug
        return json({ 
            error: error.message || 'Error desconocido durante el registro' 
        }, { 
            status: 400 
        });
    }
};
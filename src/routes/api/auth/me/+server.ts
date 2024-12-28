import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import type { RequestEvent } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';

const prisma = new PrismaClient();

export async function GET({ request }: RequestEvent) {
    try {
        // Obtener el token del header
        const authHeader = request.headers.get('authorization');
        if (!authHeader?.startsWith('Bearer ')) {
            return json({ error: 'Token no proporcionado' }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];

        // Verificar el token
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

        // Buscar el usuario en la base de datos
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: {
                id: true,
                email: true,
                name: true,
                role: true
            }
        });

        if (!user) {
            return json({ error: 'Usuario no encontrado' }, { status: 404 });
        }

        // Retornar la información del usuario
        return json({ user });

    } catch (error) {
        console.error('Error validando token:', error);
        return json({ error: 'Token inválido' }, { status: 401 });
    }
}
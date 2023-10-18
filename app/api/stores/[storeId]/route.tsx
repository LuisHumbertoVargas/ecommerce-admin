import prismadb from '@/lib/prismadb'; // Importa la biblioteca prismadb para interactuar con la base de datos
import { auth } from '@clerk/nextjs'; // Importa la función de autenticación de la biblioteca Clerk
import { NextResponse } from 'next/server'; // Importa la clase NextResponse de la biblioteca Next.js

// Función para manejar la solicitud PATCH
export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = auth(); // Obtiene el ID del usuario autenticado
        const body = await req.json(); // Obtiene el cuerpo de la solicitud
        const { name } = body; // Extrae el nombre del cuerpo de la solicitud

        if (!userId) {
            return new NextResponse('Unauthenticated', { status: 401 }); // Si el usuario no está autenticado, devuelve una respuesta de error con estado 401
        }

        if (!name) {
            return new NextResponse('Name is required', { status: 400 }); // Si no se proporciona un nombre, devuelve una respuesta de error con estado 400
        }

        if (!params.storeId) {
            return new NextResponse('Store id is required', { status: 400 }); // Si no se proporciona el ID de la tienda, devuelve una respuesta de error con estado 400
        }

        const store = await prismadb.store.updateMany({
            where: {
                id: params.storeId,
                userId,
            },
            data: {
                name,
            },
        }); // Actualiza la tienda en la base de datos con el nombre proporcionado

        return NextResponse.json(store); // Devuelve la tienda actualizada como una respuesta JSON
    } catch (error) {
        console.log('[STORE_PATCH]', error); // Registra el error en la consola
        return new NextResponse('Internal error', { status: 500 }); // Devuelve una respuesta de error genérica con estado 500
    }
}

// Función para manejar la solicitud DELETE
export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = auth(); // Obtiene el ID del usuario autenticado

        if (!userId) {
            return new NextResponse('Unauthenticated', { status: 401 }); // Si el usuario no está autenticado, devuelve una respuesta de error con estado 401
        }

        if (!params.storeId) {
            return new NextResponse('Store id is required', { status: 400 }); // Si no se proporciona el ID de la tienda, devuelve una respuesta de error con estado 400
        }

        const store = await prismadb.store.deleteMany({
            where: {
                id: params.storeId,
                userId,
            },
        }); // Elimina la tienda de la base de datos

        return NextResponse.json(store); // Devuelve la tienda eliminada como una respuesta JSON
    } catch (error) {
        console.log('[STORE_DELETE]', error); // Registra el error en la consola
        return new NextResponse('Internal error', { status: 500 }); // Devuelve una respuesta de error genérica con estado 500
    }
}

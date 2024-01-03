import { PrismaClient } from '@prisma/client';

declare global {
    var prisma: PrismaClient | undefined;
}

const prismadb = globalThis.prisma || new PrismaClient();

const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
    globalThis.prisma = prismadb;
}

export default prismadb;

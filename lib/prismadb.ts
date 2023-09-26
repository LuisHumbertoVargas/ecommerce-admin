import { PrismaClient } from '@prisma/client';

declare global {
    var prisma: PrismaClient | undefined;
}

const isProduction = process.env.NODE_ENV === 'production';
const prismadb = globalThis.prisma || new PrismaClient();

if (!isProduction) {
    globalThis.prisma = prismadb;
}

export default prismadb;

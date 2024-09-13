import { PrismaClient } from '@prisma/client'

declare global {
    var prisma: PrismaClient | undefined;
}

// Initialize Prisma and create a global object to store the connection(for development)
export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = db;
}
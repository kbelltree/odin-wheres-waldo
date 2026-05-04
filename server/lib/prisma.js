import 'dotenv/config';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '../generated/prisma/client.js';

neonConfig.webSocketConstructor = ws;

const connectionString =
  process.env.NODE_ENV === 'test'
    ? `${process.env.TEST_DATABASE_URL}`
    : `${process.env.DATABASE_URL}`;

const adapter = new PrismaNeon({ connectionString });

const prisma = new PrismaClient({ adapter });

export { prisma };

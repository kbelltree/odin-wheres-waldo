require('dotenv/config');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('../generated/prisma/client.js');

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const targetCoords = [
  {
    name: 'horse',
    minX: 0.36272727272727273,
    minY: 0.867334167709637,
    maxX: 0.41818181818181815,
    maxY: 0.976846057571965,
  },
  {
    name: 'mask',
    minX: 0,
    minY: 0.3660951188986233,
    maxX: 0.03909090909090909,
    maxY: 0.42989987484355446,
  },
  {
    name: 'hat',
    minX: 0.7729090909090909,
    minY: 0.540811013767209,
    maxX: 0.8352727272727273,
    maxY: 0.6093767209011264,
  },
  {
    name: 'wall',
    minX: 0.9609090909090909,
    minY: 0.2265456821026283,
    maxX: 1,
    maxY: 0.2953566958698373,
  },
];

async function main() {
  await prisma.target.createMany({
    data: targetCoords,
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });

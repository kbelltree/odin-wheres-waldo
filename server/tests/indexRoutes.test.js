const indexRouter = require('../routes/indexRoutes');
const { prisma } = require('../lib/prisma');

const request = require('supertest');
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);

describe('GET /', () => {
  beforeEach(async () => {
    await prisma.gameSession.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test('returns empty array when no leaderboard records exist', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('returns gameSession by ascending order up to 10', async () => {
    await prisma.gameSession.createMany({
      data: [
        { playerName: 'player1', durationMS: 30000 },
        { playerName: 'player2', durationMS: 135000 },
        { playerName: 'player3', durationMS: 90000 },
        { playerName: 'player4', durationMS: 97460 },
        { playerName: 'player5', durationMS: 145998 },
        { playerName: 'player6', durationMS: 100010 },
        { playerName: 'player7', durationMS: 50000 },
        { playerName: 'player8', durationMS: 800000 },
        { playerName: 'player9', durationMS: 30200 },
        { playerName: 'player10', durationMS: 123000 },
        { playerName: 'player11', durationMS: 10000 },
      ],
    });

    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.body[0].playerName).toBe('player11');
    expect(response.body[9].playerName).toBe('player5');
  });
});

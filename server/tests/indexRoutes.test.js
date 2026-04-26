const indexRouter = require('../routes/indexRoutes');
const { prisma } = require('../lib/prisma');

const request = require('supertest');
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);

beforeEach(async () => {
  await prisma.gameSession.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('GET /', () => {
  test("returns Where's the Kids API message", async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: `Where's the Kids API` });
  });
});

describe('GET /leaderboard', () => {
  test('returns empty array when no leaderboard records exist', async () => {
    const response = await request(app).get('/leaderboard');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('returns gameSession by ascending order up to 10 that has finishedAt and durationMS', async () => {
    const finishedAt = new Date();

    await prisma.gameSession.createMany({
      data: [
        { playerName: 'player1', finishedAt, durationMS: 30000 },
        { playerName: 'player2', finishedAt, durationMS: 135000 },
        { playerName: 'player3', finishedAt, durationMS: 90000 },
        { playerName: 'player4', finishedAt, durationMS: 97460 },
        { playerName: 'player5', finishedAt, durationMS: 145998 },
        { playerName: 'player6', finishedAt, durationMS: 100010 },
        { playerName: 'player7', finishedAt, durationMS: 50000 },
        { playerName: 'player8', finishedAt, durationMS: 800000 },
        { playerName: 'player9', finishedAt, durationMS: 30200 },
        { playerName: 'player10', finishedAt, durationMS: 123000 },
        { playerName: 'player11', finishedAt, durationMS: 10000 },
        { playerName: 'player12', finishedAt: null, durationMS: null },
        { playerName: 'player14', finishedAt: null, durationMS: 9000 },
      ],
    });

    const response = await request(app).get('/leaderboard');

    expect(response.status).toBe(200);
    expect(response.body[0].playerName).toBe('player11');
    expect(response.body[9].playerName).toBe('player5');
    expect(response.body[0]).not.toBe('player14');
    expect(response.body).toHaveLength(10);
  });
});

const gameRouter = require('../routes/gameRoutes');
const { prisma } = require('../lib/prisma');

const request = require('supertest');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/game', gameRouter);

beforeEach(async () => {
  await prisma.gameSession.deleteMany();
  await prisma.target.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('POST /game/start', () => {
  test('creates a new game session, and returns id, startedAt, and foundTargets', async () => {
    const response = await request(app).post('/game/start');

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      id: expect.any(String),
      startedAt: expect.any(String),
      foundTargets: expect.any(Array),
    });
  });
});

describe('POST /game/:sessionId/end', () => {
  test('updates the existing game session and returns id and durationMS', async () => {
    const createdSession = await prisma.gameSession.create({
      data: {},
    });

    const response = await request(app).post(`/game/${createdSession.id}/end`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      id: createdSession.id,
      finishedAt: expect.any(String),
      durationMS: expect.any(Number),
    });
  });

  test('returns 404 when the game session does not exist', async () => {
    const failingId = '2efa9110-bb56-411d-814a-0f460354e2ae';
    const response = await request(app).post(`/game/${failingId}/end`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      error: expect.any(String),
    });
  });
});

describe('POST /game/:sessionId/guess', () => {
  test('returns isHit and isGameCompleted for a valid guess', async () => {
    const createdSession = await prisma.gameSession.create({
      data: {},
    });

    await prisma.target.create({
      data: {
        name: 'target1',
        minX: 0.4,
        minY: 0.4,
        maxX: 0.6,
        maxY: 0.6,
      },
    });
    const response = await request(app)
      .post(`/game/${createdSession.id}/guess`)
      .send({
        name: 'target1',
        x: 0.5,
        y: 0.5,
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      isHit: expect.any(Boolean),
      isGameCompleted: expect.any(Boolean),
    });
  });
});

describe('PATCH /game/:sessionId/player-name', () => {
  test('updates playerName with submitted name', async () => {
    const createdSession = await prisma.gameSession.create({
      data: {},
    });

    const response = await request(app)
      .patch(`/game/${createdSession.id}/player-name`)
      .send({ playerName: 'Lorem' });

    expect(response.statusCode).toBe(200);
    expect(response.body.playerName).toBe('Lorem');
  });

  test('updates playerName with Anonymous when playerName is empty string', async () => {
    const createdSession = await prisma.gameSession.create({
      data: {},
    });

    const response = await request(app)
      .patch(`/game/${createdSession.id}/player-name`)
      .send({ playerName: '' });

    expect(response.statusCode).toBe(200);
    expect(response.body.playerName).toBe('Anonymous');
  });

  test('update playerName with Anonymous when undefined', async () => {
    const createdSession = await prisma.gameSession.create({
      data: {},
    });

    const response = await request(app)
      .patch(`/game/${createdSession.id}/player-name`)
      .send({});

    expect(response.statusCode).toBe(200);
    expect(response.body.playerName).toBe('Anonymous');
  });
});

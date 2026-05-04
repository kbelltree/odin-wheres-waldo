const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const allowedOrigins = ['http://localhost:5173'];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

const corsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PATCH'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: `Where's Waldo API / The Odin Project is running.`,
  });
});

const indexRouter = require('./routes/indexRoutes');
app.use('/', indexRouter);

const gameRouter = require('./routes/gameRoutes');
app.use('/game', gameRouter);

app.use((req, res, next) => {
  return res.status(404).json({ error: 'Page Not Found.' });
});

app.use((req, res, next) => {
  console.err(err);
  return res.status(500).json({ error: 'Something went wrong.' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (err) {
    throw error;
  }
  console.log(`Where's Waldo App - listening on port ${PORT}`);
});

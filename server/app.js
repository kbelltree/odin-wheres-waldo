const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const indexRouter = require('./routes/indexRoutes');
app.use('/', indexRouter);

const gameRouter = require('./routes/gameRoutes');
app.use('/game', gameRouter);

app.listen(3000, (err) => {
  if (err) {
    throw error;
  }
  console.log('odin-wheres-waldo...running');
});

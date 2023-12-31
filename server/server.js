const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const cron = require('node-cron');
const omniScrape = require('./scripts/scheduler');

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const calendarRouter = require('./routes/calendar.router');
const searchRouter = require('./routes/search.router')
const todoRouter = require('./routes/todo.router');
const adminRouter = require('./routes/admin.router');
const articleRouter = require('./routes/article.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/calendar', calendarRouter);
app.use('/api/search', searchRouter);
app.use('/api/todo', todoRouter)
app.use('/api/admin', adminRouter);
app.use('/api/article', articleRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

// Schedule scraping scripts to run every hour from 8 am to 6 pm
cron.schedule('0 8-18 * * *', async () => {
  console.log('Running scraping scripts every hour from 8 am to 6 pm.');
  await omniScrape();
});


const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./db/db');

const homeRouter = require('./routers/homeRouter');
const userRouter = require('./routers/userRouter');
const spotifyRouter = require('./routers/spotifyRouter');

const port = 5000;

// connect to mongo db project
connectDB();

app.use(cors());
app.use(express.json());

app.use(homeRouter);
app.use(userRouter);
app.use(spotifyRouter);

app.listen(port, () => {
  console.log(`🟢 App listening at http://localhost:${port}`);
});

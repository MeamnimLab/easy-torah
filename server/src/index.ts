import express from 'express';
import cors from 'cors';
import GameRoute from './routes/game.route';
import UserRoute from './routes/user.route';
import LevelRoute from './routes/level.route';
import SubLevelRoute from './routes/subLevel.route';
import UserProgressRoute from './routes/userProgress.route';
// end of imports

const app = express();
const port = 3000;


app.use(express.json());
app.use(cors());

app.use('/api/user', new UserRoute().router);
app.use('/api/game', new GameRoute().router);
app.use('/api/level', new LevelRoute().router);
app.use('/api/subLevel', new SubLevelRoute().router);
app.use('/api/userProgress', new UserProgressRoute().router);
// end of app.use

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});






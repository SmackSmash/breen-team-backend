import express from 'express';
import cors from 'cors';
import { getUser, getUsers } from './controllers/get-controller.js';
import { deleteUserId } from './controllers/delete-controller.js';
import { postUser } from './controllers/post-controller.js';
import { getScores, postScore } from './controllers/index.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/users', getUsers);

app.get('/api/users/:user_id', getUser);

app.get('/api/games/:gameid/scores', getScores);

app.post('/api/games/:gameid/scores', postScore);

app.post('/api/users', postUser);

app.delete('/api/users/:user_id', deleteUserId);


export default app;

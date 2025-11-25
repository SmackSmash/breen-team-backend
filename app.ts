import express from 'express';
import cors from 'cors';
import { getScores } from './controllers';
import { getUser, getUsers } from './controllers/get-controller';
import { deleteUserId } from './controllers/delete-controller';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/users', getUsers);
app.get('/api/users/:user_id', getUser);
app.get('/api/scores', getScores);

app.delete('/api/users/:user_id', deleteUserId);
export default app;

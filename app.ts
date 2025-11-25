import express from 'express';
import cors from 'cors';
import { getScores, postScore } from './controllers';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/scores', getScores);

app.post('/api/scores', postScore);

export default app;

import { Response, Request } from 'express';
import { createUser } from '../models/create-model.js';
import { readUserByUsername } from '../models/read-model.js';
import { createScore } from '../models/index.js';

export const postUser = async (req: Request, res: Response) => {
  const { username }: { username: string } = req.body;

  const [resUsername] = await createUser(username);

  return res.status(201).send({ user: resUsername });
};

export const postScore = async (req: Request, res: Response) => {
  const { score, username } = req.body;
  const { gameid } = req.params;
  const game_id = Number(gameid);

  let user = await readUserByUsername(username);

  if (!user.length) {
    user = await createUser(username);
  }

  const [resScore] = await createScore(Number(score), user[0].user_id, username, game_id);

  return res.status(201).send({ score: resScore });
};

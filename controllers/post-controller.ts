import { Response, Request } from 'express';
import { createScore } from '../models';

export const postScore = async (req: Request, res: Response) => {
  const { score, user_id, username } = req.body;
  const { gameid } = req.params;
  const game_id = Number(gameid);

  const [resScore] = await createScore(score, user_id, username, game_id);

  return res.status(201).send({ score: resScore });
};

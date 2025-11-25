import { Response, Request } from 'express';
import { readUser, readUsers } from '../models/read-model';
import { readScores } from '../models/read-model';

export const getUsers = (req: Request, res: Response) => {
  return readUsers().then(users => {
    return res.status(200).send(users)
  });
};

export const getUser = (req: Request, res: Response) => {
  const user_id = req.params.user_id;

  return readUser(user_id).then(user => {
    res.status(200).send({ user: user[0] });
  });
};

export const getScores = (req: Request, res: Response) => {
  return readScores().then(scores => {
    res.send(scores);
  });
};

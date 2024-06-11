// src/utils/raw-body-middleware.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function rawBodyMiddleware(req: NextApiRequest, res: NextApiResponse, next: () => void) {
  const buf = await buffer(req);
  req.body = buf.toString('utf8');
  next();
}

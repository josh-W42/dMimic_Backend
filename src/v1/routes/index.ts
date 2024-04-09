import { Router } from 'express';
import { serverRouter } from './server';
import { channelRouter } from './channel';

export const mainRouter = Router();

// Not Definite but wanted to try it out.
mainRouter.all('/*', (req, res, next) => {
  const time = new Date(Date.now());
  console.log({
    TimeStamp: time.getTime(),
    TimeUTC: time.toUTCString(),
    ip: req.ip,
    Host: req.headers.host,
    Protocol: req.protocol,
    Secure: req.secure,
  });
  next();
});

mainRouter.use('/servers', serverRouter);
mainRouter.use('/channels', channelRouter);

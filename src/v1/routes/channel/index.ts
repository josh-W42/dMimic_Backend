import { Router } from 'express';
import { controllers } from '../../controllers';

export const channelRouter = Router();

channelRouter.patch('/:channelID/update', controllers.channel.update);
channelRouter.get('/:channelID/find', controllers.channel.getChannel);
channelRouter.delete('/:channelID/delete', controllers.channel.delete);
channelRouter.post(
  '/:channelID/messages/new',
  controllers.channel.createMessage
);

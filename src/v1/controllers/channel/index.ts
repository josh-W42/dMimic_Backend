import { deleteChannel } from './delete';
import { getChannel } from './getChannel';
import { update } from './update';
import { createMessage } from './createMessage';

export const channelCtrl = {
  update,
  getChannel,
  delete: deleteChannel,
  createMessage,
};

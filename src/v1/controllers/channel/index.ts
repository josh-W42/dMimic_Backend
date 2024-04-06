import { deleteChannel } from "./delete";
import { getChannel } from "./getChannel";
import { update } from "./update";

export const channelCtrl = {
  update,
  getChannel,
  delete: deleteChannel,
};

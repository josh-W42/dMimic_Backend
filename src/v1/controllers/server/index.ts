import { addChannel } from "./addChannel";
import { create } from "./create";
import { softDelete } from "./delete";
import { getChannels } from "./getChannels";
import { search } from "./search";
import { update } from "./update";

export const serverCtrl = {
  create,
  search,
  update,
  softDelete,
  addChannel,
  getChannels,
};

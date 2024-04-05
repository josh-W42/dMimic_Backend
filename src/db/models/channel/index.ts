import {
  CreationOptional,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";
import { Server } from "../server";

export class Channel extends Model<
  InferAttributes<Channel>,
  InferCreationAttributes<Channel>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare description: CreationOptional<string>;
  declare isPublic: CreationOptional<boolean>;
  declare isVoiceChannel: CreationOptional<boolean>;

  declare serverID: ForeignKey<Server["id"]>;
  declare server?: NonAttribute<Server>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

import {
  Association,
  CreationOptional,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManySetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";
import { Channel } from "../channel";

export class Server extends Model<
  InferAttributes<Server>,
  InferCreationAttributes<Server>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare description: string;
  declare isPublic: CreationOptional<boolean>;

  declare getChannels: HasManyGetAssociationsMixin<Channel>;
  declare addChannel: HasManyAddAssociationMixin<Channel, number>;
  declare addChannels: HasManyAddAssociationsMixin<Channel, number>;
  declare setChannels: HasManySetAssociationsMixin<Channel, number>;
  declare removeChannel: HasManyRemoveAssociationMixin<Channel, number>;
  declare removeChannels: HasManyRemoveAssociationsMixin<Channel, number>;
  declare hasChannel: HasManyHasAssociationMixin<Channel, number>;
  declare hasChannels: HasManyHasAssociationsMixin<Channel, number>;
  declare countChannels: HasManyCountAssociationsMixin;
  declare createChannel: HasManyCreateAssociationMixin<Channel, "serverID">;

  declare channels?: NonAttribute<Channel[]>;

  declare static associations: {
    channels: Association<Server, Channel>;
  };

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;
}

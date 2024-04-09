import {
  Association,
  CreationOptional,
  ForeignKey,
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
} from 'sequelize';
import { Server } from '../server';
import { Message } from '../message';

export class Channel extends Model<
  InferAttributes<Channel>,
  InferCreationAttributes<Channel>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare description: CreationOptional<string>;
  declare isPublic: CreationOptional<boolean>;
  declare isVoiceChannel: CreationOptional<boolean>;

  declare getMessages: HasManyGetAssociationsMixin<Message>;
  declare addMessage: HasManyAddAssociationMixin<Message, number>;
  declare addMessages: HasManyAddAssociationsMixin<Message, number>;
  declare setMessages: HasManySetAssociationsMixin<Message, number>;
  declare removeMessage: HasManyRemoveAssociationMixin<Message, number>;
  declare removeMessages: HasManyRemoveAssociationsMixin<Message, number>;
  declare hasMessage: HasManyHasAssociationMixin<Message, number>;
  declare hasMessages: HasManyHasAssociationsMixin<Message, number>;
  declare countMessages: HasManyCountAssociationsMixin;
  declare createMessage: HasManyCreateAssociationMixin<Message, 'channelID'>;

  declare messages?: NonAttribute<Message[]>;

  declare static associations: {
    messages: Association<Channel, Message>;
  };

  declare serverID: ForeignKey<Server['id']>;
  declare server?: NonAttribute<Server>;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

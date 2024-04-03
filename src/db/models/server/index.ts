import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

export class Server extends Model<
  InferAttributes<Server>,
  InferCreationAttributes<Server>
> {
  declare id: string;
  declare name: string;
  declare description: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

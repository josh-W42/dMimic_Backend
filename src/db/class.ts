import { DataTypes, Sequelize } from 'sequelize';
import { Channel, Message, Server } from './models';

export class DB {
  private sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize(`${process.env.databaseURL}`);
  }

  public InitModels() {
    Server.init(
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        isPublic: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE,
      },
      {
        tableName: 'servers',
        paranoid: true,
        sequelize: this.sequelize,
      }
    );

    Channel.init(
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        isPublic: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        isVoiceChannel: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        tableName: 'channels',
        sequelize: this.sequelize,
      }
    );

    Message.init(
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
        },
        content: {
          type: DataTypes.STRING,
          defaultValue: '',
        },
        imageUrls: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          defaultValue: [],
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        tableName: 'messages',
        sequelize: this.sequelize,
      }
    );

    Server.hasMany(Channel, {
      sourceKey: 'id',
      foreignKey: 'serverID',
      as: 'channels',
    });

    Channel.hasMany(Message, {
      sourceKey: 'id',
      foreignKey: 'channelID',
      as: 'messages',
    });

    this.sequelize.sync({ alter: true });
  }

  public async TestConnection(): Promise<boolean> {
    try {
      await this.sequelize.authenticate();
      console.log('Connection to Database Successful');
      return true;
    } catch (error) {
      console.error('Unable to connect to database:', error);
      return false;
    }
  }
}

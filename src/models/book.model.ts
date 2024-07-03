import { DataTypes, Model } from 'sequelize';
import db from '../config/PostgreSQL';
import {User} from './user.model';

interface BookAttributes {
  id: number;
  userId: number;
  bookName: string;
  bookDesc: string;
  noOfPages: number;
  bookAuthor: string;
  bookCategory: string;
  bookPrice: number;
  releasedYear: number;
  status: boolean;
}

class Book extends Model<BookAttributes> implements BookAttributes {
  public id!: number;
  public userId!: number;
  public bookName!: string;
  public bookDesc!: string;
  public noOfPages!: number;
  public bookAuthor!: string;
  public bookCategory!: string;
  public bookPrice!: number;
  public releasedYear!: number;
  public status!: boolean;
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bookName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 50],
      },
    },
    bookDesc: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 200],
      },
    },
    noOfPages: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 10,
      },
    },
    bookAuthor: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 50],
      },
    },
    bookCategory: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 30],
      },
    },
    bookPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    releasedYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1500,
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize: db,
    modelName: 'Book',
  }
);

Book.belongsTo(User, { onDelete: 'CASCADE', foreignKey: 'userId' });

export  {Book};

import path from 'path';
import multer from 'multer';
import { DataTypes, Model } from 'sequelize';
import db from '../config/PostgreSQL';

const imgPath = '/uploads/user';

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  gender: string;
  image?: string;
  interest: string[];
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public gender!: string;
  public image?: string;
  public interest!: string[];
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 9],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Please enter a valid email address',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    interest: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
      },      
  },
  {
    sequelize: db,
    modelName: 'User',
    indexes: [
      {
        unique: true,
        fields: ['email', 'password'],
      },
    ],
  }
);

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', imgPath));
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + extension);
  },
});

const uploadImgPath = multer({ storage: imageStorage }).single('image');

export { User, uploadImgPath, imgPath };

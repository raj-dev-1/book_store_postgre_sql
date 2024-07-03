import {Sequelize} from "sequelize";
import { PASSWORD, USER_NAME, DBNAME, HOST } from "./constant";

type SupportedDialect = 'mysql' | 'postgres';
const DIALECT: SupportedDialect = 'postgres';

const db = new Sequelize(DBNAME, USER_NAME, PASSWORD, {
  host: HOST,
  dialect: DIALECT,
  logging: false,
});

db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err: Error) => {
    console.error("Unable to connect to the database:", err);
  });

export default db;

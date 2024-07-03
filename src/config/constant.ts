import dotenv from "dotenv";

dotenv.config();

const PORT: number = parseInt(process.env.PORT!);
const DBNAME: string = process.env.DBNAME!;
const USER_NAME: string = process.env.USER_NAME!;
const PASSWORD: string = process.env.PASSWORD!;
const HOST: string = process.env.HOST!;
const SECRET_KEY: string = process.env.SECRET_KEY!;

export {
  PORT,
  DBNAME,
  USER_NAME,
  PASSWORD,
  SECRET_KEY,
  HOST,
};

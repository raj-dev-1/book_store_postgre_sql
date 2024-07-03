import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import { PORT } from "./config/constant";
import "./models/index";
import authRoutes from "./routes/auth.routes";
import bookRoutes from "./routes/book.routes";
import bodyParser from "body-parser";
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("hello typescript");
});

app.use("/auth", authRoutes);
app.use("/book", bookRoutes);

app.use((err: Error, req: Request, res: Response) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import express from "express";
import dotenv from "dotenv";
import dbConnection from "./utils/db";
import mainRouter from "./routes/mainRouter";
import errorHandler from "./middlewares/errorHandler";
import cookieParser from "cookie-parser";

dotenv.config();

const port = process.env.PORT || 4000;

const app = express();

dbConnection();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static("public"));


app.use("/api", mainRouter);

app.get("/", (_req: express.Request, res: express.Response) => {
  res.send(`
    <h1>Hello this is Time Capsule API ⏳</h1>
    `);
});

app.use(errorHandler);


app.listen(port, () => {
  console.log(`The server is up 📶 => http://localhost:${port} 🚀`);
});

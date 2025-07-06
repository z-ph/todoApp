import express from "express";
import cors from "cors";
import todoRouter from "./routes/todo";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
// monitor req
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  console.log("body:", req.body);
  next();
});

app.use("/api/todo", todoRouter);

const PORT = 1234;
const IP = "10.21.22.30";
app.listen(PORT, '0.0.0.0', () => {
  console.log("http://" + IP + ":" + PORT);
});


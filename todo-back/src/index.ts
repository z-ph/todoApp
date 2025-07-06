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
app.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});


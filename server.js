import express from "express";
import authRouter from "./modules/auth/routes.js";
import("dotenv/config");

const app = express();
const port = process.env.port || 3000;
import cors from "cors";

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use((req, res, next) => {
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", authRouter);

app.post("/", (req, res) => {
  res.json({ body: req.body });
});

import db from "./db.js";

db.on("connected", () => {
  console.log("db connected");
  app.listen(port, () => {
    console.log(`Diary app listening on port ${port}`);
  });
});

import router from "./modules/routes.js";

router(app);

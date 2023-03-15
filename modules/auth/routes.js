import express from "express";
import validator from "../middlewares/validator.js";
import { body, query, param } from "express-validator";
import Controller from "./controller.js";

const router = express.Router();

router.post(
  "/register",
  body(["name", "email", "password"]).exists(),
  validator,
  Controller.addUser
);

router.post(
  "/login",
  body(["email", "password"]).exists(),
  validator,
  Controller.login
);

export default router;

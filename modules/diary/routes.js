import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";

router.get(
  "/",
  query(["limit", "skip"]).optional(),
  validator,
  Controller.getDiaries
);
router.get(
  "/:diaryId",
  param("diaryId").exists(),
  validator,
  Controller.getDiary
);

router.post(
  "/",
  body(["title", "description"]).exists(),
  validator,
  Controller.addDiary
);

router.patch(
  "/:diaryId",
  param("diaryId").exists(),
  body(["title", "description"]).exists(),
  validator,
  Controller.updateDiary
);

router.delete(
  "/:diaryId",
  param("diaryId").exists(),
  validator,
  Controller.deleteDiary
);

export default router;

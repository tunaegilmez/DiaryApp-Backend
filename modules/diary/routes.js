import express from "express";
const router = express.Router();
import Controller from "./controller.js";
import { body, query, param } from "express-validator";
import validator from "../middlewares/validator.js";
import verifyToken from "../middlewares/verifyToken.js";

router.get(
  "/",
  verifyToken,
  query(["limit", "skip"]).optional(),
  validator,
  Controller.getDiaries
);
router.get(
  "/:diaryId",
  verifyToken,
  param("diaryId").exists(),
  validator,
  Controller.getDiary
);

router.post(
  "/",
  verifyToken,
  body(["title", "description"]).exists(),
  validator,
  Controller.addDiary
);

router.patch(
  "/:diaryId",
  verifyToken,
  param("diaryId").exists(),
  body(["title", "description"]).exists(),
  validator,
  Controller.updateDiary
);

router.delete(
  "/:diaryId",
  verifyToken,
  param("diaryId").exists(),
  validator,
  Controller.deleteDiary
);

export default router;

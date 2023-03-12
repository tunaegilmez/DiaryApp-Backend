import diaryRouter from "./diary/routes.js";

import authRouter from "./auth/routes.js";

export default (app) => {
  app.use("/diary", diaryRouter);
  app.use("/auth", authRouter);
};

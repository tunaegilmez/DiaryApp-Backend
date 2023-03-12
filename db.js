import CONFIG from "./config.js";

import mongoose from "mongoose";

mongoose
  .connect(CONFIG.DATABASE.connection_url, {
    user: CONFIG.DATABASE.user,
    pass: CONFIG.DATABASE.password,
    connectTimeoutMS: 5000,
    serverSelectionTimeoutMS: 5000,
  })
  .catch((err) => {
    console.log("mongo error", err);
  });

export default mongoose.connection;

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import userRoutes from "./routes/users";

import config from "./config";

import mongoose from "mongoose";

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use("/users", userRoutes);

mongoose
  .connect(config.MONGO_URI)
  .then(async () => {
    app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

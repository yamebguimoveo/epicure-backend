import express from "express";
import cors from "cors";
import helmet from "helmet";
import ApiRoutes from "./api/routes";
import DB from "./db/mongo-init";
import mongoose from "mongoose";

class App {
  public app: express.Application;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.connectToDB();
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private connectToDB() {
    mongoose
      .connect(DB)
      .then((connect) => {
        console.log("connected to db");
      })
      .catch((err) => console.log("failed to connect to db"));
  }

  private initializeMiddlewares() {
    if (process.env.NODE_ENV === "production") {
      this.app.use(helmet());
    }
    this.app.use(express.json());
    this.app.use(cors());
  }

  private initializeRoutes() {
    const apiRoutes = new ApiRoutes();
    this.app.use("/api", apiRoutes.public);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("server listening on port " + this.port);
    });
  }
}

export default App;

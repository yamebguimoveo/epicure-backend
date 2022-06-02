import { Router } from "express";
import V1Routes from "./v1/v1.routes";
import express from "express";
import path from "path";

class ApiRoutes {
  public: Router = Router();

  constructor() {
    console.log("Into Api routes");

    this.initializeRoutes();
  }

  private initializeRoutes() {
    const v1Routes = new V1Routes();
    this.public.use("/v1", v1Routes.router);
  }
}

export default ApiRoutes;

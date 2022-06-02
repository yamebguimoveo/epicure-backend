import App from "./app";
import dotenv from "dotenv";
dotenv.config();
require("./db/mongo-init");

const port = 3001;
const app = new App(port);

app.listen();

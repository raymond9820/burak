import express from "express";
import path from "path";
import router from "./router";
import routerAdmin from "./routerAdmin";
import { MORGAN_FORMAT } from "./libs/types/config";
import morgan from "morgan";
// frontend send data

//1 - Entrance
const app = express();

console.log("__dirname:", __dirname);
app.use(express.static(path.join(__dirname, "public"))); //middleware Dp > public
app.use(express.urlencoded({ extended: true })); //middleware Dp > tradional API support
app.use(express.json()); //middleware DB > Rest IP support
app.use(morgan(MORGAN_FORMAT)); //middleware Dp  > Loggig
//2 - Session

//3 - Views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//4 - Routers
app.use("/admin", routerAdmin); //SSR
app.use("/", router); //React //SPA

export default app;

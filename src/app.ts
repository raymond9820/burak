import express from "express";
import path from "path";
import router from "./router";
import routerAdmin from "./routerAdmin";
import { MORGAN_FORMAT } from "./libs/types/config";
import morgan from "morgan";

import session from "express-session";
import ConnectMongoDB from "connect-mongodb-session";
//TPC2
const MongoStore = ConnectMongoDB(session);
const store = new MongoStore({
  uri: String(process.env.MONGO_URL),
  collection: "Sessions",
});

//1 - Entrance
//SSR (Server-Side Rendering)
const app = express();

console.log("__dirname:", __dirname);
app.use(express.static(path.join(__dirname, "public"))); //middleware Dp > public >ochiqlanadi.
app.use(express.urlencoded({ extended: true })); //middleware Dp > tradional API support
app.use(express.json()); //middleware DP > Rest IP support
app.use(morgan(MORGAN_FORMAT)); //middleware Dp  > build Logging standard

//2 - Sessionn
//request => session => response
//Tamg'a yaratish uchun asosan loginda))
//req.cookie.sid => req.sessions. +number => Tamg'a o'qish
app.use(
  session({
    secret: String(process.env.SESSION_SECRET),
    cookie: {
      maxAge: 1000 * 3600 * 3, //3 hours
    },
    resave: true,
    saveUninitialized: true,
    store: store,
  }),
);

//3 - Views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//4 - Routers
app.use("/admin", routerAdmin); //SSR
app.use("/", router); //React //SPA

export default app;

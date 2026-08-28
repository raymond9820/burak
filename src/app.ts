import express from "express";
import path from "path";
import router from "./router";
import routerAdmin from "./routerAdmin";
import { MORGAN_FORMAT } from "./libs/types/config";
import morgan from "morgan";

import session from "express-session";
import ConnectMongoDB from "connect-mongodb-session";

const MongoStore = ConnectMongoDB(session);
const store = new MongoStore({
  uri: String(process.env.MONGO_URL),
  collection: "Sessions",
});

//1 - Entrance
const app = express();

console.log("__dirname:", __dirname);
app.use(express.static(path.join(__dirname, "public"))); //middleware Dp > public
app.use(express.urlencoded({ extended: true })); //middleware Dp > tradional API support
app.use(express.json()); //middleware DB > Rest IP support
app.use(morgan(MORGAN_FORMAT)); //middleware Dp  > Loggig

//2 - Session
app.use(
  session({
    secret: String(process.env.SESSION_SECRET),
    cookie: {
      maxAge: 1000 * 3600 * 3, //3 hours
    },
    resave: true,
    saveUninitialized: false,
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

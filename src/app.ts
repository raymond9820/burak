import Express from "express";
import path from "path";
//1 - Entrance
const app = Express();
console.log("__dirname:", __dirname);
app.use(Express.static(path.join(__dirname, "public")));
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json);

//2 - Session

//3 - Views
app.set("Views", path.join(__dirname, "Views"));
app.set("Views engine", "ejs");

//4 - Routers

export default app;

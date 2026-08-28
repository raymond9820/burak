import express from "express";
const routerAdmin = express.Router();
import restaurantController from "./controllers/restaurant.controller";

//Restaurant
routerAdmin.get("/", restaurantController.goHome);
routerAdmin
  .get("/login/", restaurantController.getLogin)
  .post("/login", restaurantController.processLogin);
routerAdmin
  .get("/signup", restaurantController.getSignUp)
  .post("/signup", restaurantController.processSignup);

routerAdmin.get("/check-me", restaurantController.checkAuthSession);
routerAdmin.get("/logout", restaurantController.processLogout);

//Product
//User
export default routerAdmin;

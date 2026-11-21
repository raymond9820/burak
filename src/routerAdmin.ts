import express from "express";
const routerAdmin = express.Router();
import restaurantController from "./controllers/restaurant.controller";
import productController from "./controllers/product.controller";
import makeUploader from "./libs/utils/uploader";

//Restaurant
routerAdmin.get("/", restaurantController.goHome);
routerAdmin
  .get("/login/", restaurantController.getLogin)
  .post("/login", restaurantController.processLogin);
routerAdmin
  .get("/signup", restaurantController.getSignUp)
  .post(
    "/signup",
    makeUploader("members").single("memberImage"),
    restaurantController.processSignup,
  );

routerAdmin.get("/logout", restaurantController.logout);
routerAdmin.get("/check-me", restaurantController.checkAuthSession);

//Product

routerAdmin.get(
  "/product/all",
  restaurantController.verifyRestaurant, //authorization
  productController.getAllProducts,
);

routerAdmin.post(
  "/product/create",
  restaurantController.verifyRestaurant, //authorization req.+member
  makeUploader("products").array("productImages", 5), // uploader req.files
  productController.createNewProduct, //req.member & req.files
);
routerAdmin.post(
  "/product/:id",
  restaurantController.verifyRestaurant, //authorization
  productController.updateChosenProduct,
);

//User member control:
routerAdmin.get(
  "/user/all",
  restaurantController.verifyRestaurant, //authorization
  restaurantController.getUsers,
);
routerAdmin.post(
  "/user/edit",
  restaurantController.verifyRestaurant, //authorization
  restaurantController.updateChosenUser,
);

export default routerAdmin;

import { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberSerive from "../models/Members.service";
const restaurantController: T = {};
restaurantController.goHome = (req: Request, res: Response) => {
  try {
    console.log(`goHome`);
    res.send("Home Page");
  } catch (err) {
    console.log("ERORR, goHome: ", err);
  }
};

restaurantController.getLOgin = (req: Request, res: Response) => {
  try {
    console.log(`getLOgin`);
    res.send("login Page");
  } catch (err) {
    console.log("ERORR, getLOgin: ", err);
  }
};

restaurantController.getSignUp = (req: Request, res: Response) => {
  try {
    console.log(`signUp`);
    res.send("signUp Page");
  } catch (err) {
    console.log("ERORR, getSignUp: ", err);
  }
};

export default restaurantController;

import { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberSerive from "../models/Members.service";
const restaurantController: T = {};
restaurantController.goHome = (req: Request, res: Response) => {
  try {
    console.log(`goHome`);
    res.send("Home Page");
    // send | json | redirect | end | render
  } catch (err) {
    console.log("ERORR, goHome: ", err);
  }
};

restaurantController.getLogin = (req: Request, res: Response) => {
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

restaurantController.processLogin = (req: Request, res: Response) => {
  try {
    console.log("processlogin");
    res.send("Done!!!!");
  } catch (err) {
    console.log("ERORR, processLogin: ", err);
  }
};
restaurantController.processSignup = (req: Request, res: Response) => {
  try {
    console.log("processSignup");
    res.send("Done!!!!");
  } catch (err) {
    console.log("ERORR, processSignup: ", err);
  }
};

export default restaurantController;

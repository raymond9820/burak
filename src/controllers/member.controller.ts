import { Request, Response } from "express";

import { T } from "../libs/types/common";

const memberController: T = {};
memberController.goHome = (req: Request, res: Response) => {
  try {
    res.send("Home Page");
  } catch (err) {
    console.log("ERORR, goHome: ", err);
  }
};

memberController.getLOgin = (req: Request, res: Response) => {
  try {
    res.send("login Page");
  } catch (err) {
    console.log("ERORR, getLOgin: ", err);
  }
};

memberController.getSignUp = (req: Request, res: Response) => {
  try {
    res.send("signUp Page");
  } catch (err) {
    console.log("ERORR, getSignUp: ", err);
  }
};

export default memberController;

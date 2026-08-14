import { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberSerive from "../models/Members.service";
import MemberService from "../models/Members.service";
import { MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/types/enum/member.enum";

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
restaurantController.processSignup = async (req: Request, res: Response) => {
  try {
    console.log("processSignup");
    console.log("body:", req.body);

    const newMember: MemberInput = req.body;
    newMember.memberType = MemberType.RESTAURANT;

    const memberService = new MemberService();
    const result = await memberService.processSignup(newMember);

    res.send(result);
  } catch (err) {
    console.log("ERORR, processSignup: ", err);
    res.send(err);
  }
};

export default restaurantController;

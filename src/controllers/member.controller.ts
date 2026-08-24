import { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Members.service";
import { loginInput, MemberInput } from "../libs/types/member";
import Errors from "../libs/types/Errors";

//React
const memberService = new MemberService();

const memberController: T = {};
memberController.signup = async (req: Request, res: Response) => {
  try {
    console.log("signup");
    const input: MemberInput = req.body,
      result = await memberService.signup(input); //call

    //tookens
    res.json({ member: result });
  } catch (err) {
    console.log("ERORR, signup: ", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
    //res.json({});
  }
};

memberController.login = async (req: Request, res: Response) => {
  try {
    console.log("login");
    const input: loginInput = req.body,
      result = await memberService.login(input);
    //tookens

    res.json({ member: result });
  } catch (err) {
    console.log("ERORR, login: ", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};

export default memberController;

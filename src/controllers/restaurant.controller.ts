import { Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Members.service";
import { Adminrequest, loginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/types/enum/member.enum";
import Errors, { Message } from "../libs/types/Errors";
const memberService = new MemberService();
const restaurantController: T = {};
restaurantController.goHome = (req: Request, res: Response) => {
  try {
    console.log(`goHome`);
    res.render("home");
    // send | json | redirect | end | render
  } catch (err) {
    console.log("ERORR, goHome: ", err);
  }
};

restaurantController.getSignUp = (req: Request, res: Response) => {
  try {
    console.log(`signup`);
    res.render("signup");
  } catch (err) {
    console.log("ERORR, getSignUp: ", err);
    res.send(err);
  }
};

restaurantController.getLogin = (req: Request, res: Response) => {
  try {
    console.log(`getLOgin`);
    res.render("login");
  } catch (err) {
    console.log("ERORR, getLOgin: ", err);
  }
};

restaurantController.processSignup = async (
  req: Adminrequest,
  res: Response,
) => {
  try {
    console.log("processSignup");
    const newMember: MemberInput = req.body;
    newMember.memberType = MemberType.RESTAURANT;

    const result = await memberService.processSignup(newMember); //call

    //token session authentication
    //autentifikatsiya) — bu "who are you?"
    req.session.member = result;
    req.session.save(function () {
      res.send(result);
    });
  } catch (err) {
    console.log("ERORR, processSignup: ", err);
    res.send(err);
  }
};

restaurantController.processLogin = async (
  req: Adminrequest,
  res: Response,
) => {
  try {
    console.log("processlogin");
    const input: loginInput = req.body;
    const result = await memberService.processLogin(input);

    req.session.member = result;
    req.session.save(function () {
      res.send(result);
    });
  } catch (err) {
    console.log("ERORR, processLogin: ", err);
    res.send(err);
  }
};

restaurantController.checkAuthSession = async (
  req: Adminrequest,
  res: Response,
) => {
  try {
    console.log("checkAuthSession");
    if (req.session?.member) res.send(`hey, ${req.session.member.memberNick}`);
    else res.send(`<script>alert('${Message.NOT_AUTHORIZED}')</script>`);
  } catch (err) {
    console.log("ERORR, checkAuthSession: ", err);
    res.send(err);
  }
};
export default restaurantController;

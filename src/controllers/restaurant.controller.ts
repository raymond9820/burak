import { NextFunction, Request, Response } from "express";
import { T } from "../libs/types/common";
import MemberService from "../models/Members.service";
import { Adminrequest, loginInput, MemberInput } from "../libs/types/member";
import { MemberType } from "../libs/types/enum/member.enum";
import Errors, { HttpCode, Message } from "../libs/types/Errors";
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
    res.redirect("/admin");
  }
};

restaurantController.processSignup = async (
  req: Adminrequest,
  res: Response,
) => {
  try {
    console.log("processSignup");
    const file = req.file;
    if (!file)
      throw new Errors(HttpCode.BAD_REQUEST, Message.SOMETHING_WENT_WRONG);

    const newMember: MemberInput = req.body;
    newMember.memberImage = file?.path.replace(/\\/g, "/");
    newMember.memberType = MemberType.RESTAURANT;
    const result = await memberService.processSignup(newMember); //call

    //token session authentication
    //autentifikatsiya) — bu "who are you?"
    req.session.member = result;
    req.session.save(function () {
      res.redirect("/admin/product/all");
    });
  } catch (err) {
    console.log("ERORR, processSignup: ", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script>alert('${message}'); window.location.replace('/admin/signup')</script>`,
    );
  }
};

restaurantController.processLogin = async (
  req: Adminrequest,
  res: Response,
) => {
  try {
    console.log("SESSION MEMBER:", req.session.member);
    const input: loginInput = req.body;
    const result = await memberService.processLogin(input);

    req.session.member = result;
    req.session.save(function () {
      res.redirect("/admin/product/all");
    });
  } catch (err) {
    console.log("ERORR, processLogin: ", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
    res.send(
      `<script>alert('${message}'); window.location.replace('/admin/login')</script>`,
    );
  }
};

restaurantController.logout = async (req: Adminrequest, res: Response) => {
  try {
    console.log("logout");
    req.session.destroy(function (err) {
      res.redirect("/admin");
    });
  } catch (err) {
    console.log("ERORR, logout: ", err);
    res.redirect("/admin");
  }
};

restaurantController.getUsers = async (req: Request, res: Response) => {
  try {
    console.log(`getUsers`);
    const result = await memberService.getUsers();
    console.log("result", result);
    res.render("users", { user: result });
  } catch (err) {
    console.log("ERORR, getUsers: ", err);
    res.redirect("/admin/login");
  }
};

restaurantController.updateChosenUser = (req: Request, res: Response) => {
  try {
    console.log(`updateChosenUser`);
  } catch (err) {
    console.log("ERORR, updateChosenUser: ", err);
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

restaurantController.verifyRestaurant = async (
  req: Adminrequest,
  res: Response,
  next: NextFunction,
) => {
  if (req.session?.member?.memberType === MemberType.RESTAURANT) {
    req.member = req.session.member;
    next();
  } else {
    const message = Message.NOT_AUTHORIZED;
    res.send(
      `<script>alert('${message}'); window.location.replace('/admin/login')</script>`,
    );
  }
};
export default restaurantController;

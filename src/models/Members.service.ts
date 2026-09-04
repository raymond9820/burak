import memberModel from "../schema/Member.model";
import { loginInput, MemberInput } from "../libs/types/member";
import { Member } from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/types/Errors";
import { MemberType } from "../libs/types/enum/member.enum";
import * as bcrypt from "bcryptjs";

class MemberService {
  private readonly memberModel;

  constructor() {
    this.memberModel = memberModel;
  }
  //SPA
  //Define
  //database
  public async signup(input: MemberInput): Promise<Member> {
    const exist = await this.memberModel;
    const salt = await bcrypt.genSalt();
    input.memberPassword = await bcrypt.hash(input.memberPassword, salt);

    try {
      const result = await this.memberModel.create(input);
      result.memberPassword = "";
      return result.toJSON();
    } catch (err) {
      console.log("Error, model: signup", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.USED_NICK_PHONE);
    }
  }
  //Define
  public async login(input: loginInput): Promise<Member> {
    //Consider member status later
    const member = await this.memberModel
      .findOne({ memberNick: input.memberNick })
      .select("+memberPassword")
      .exec();

    if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);

    const isMacht = await bcrypt.compare(
      input.memberPassword,
      member.memberPassword,
    );

    if (!isMacht) {
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
    }
    return await this.memberModel.findById(member._id).lean().lean().exec();
  }

  //Define
  // SSR
  public async processSignup(input: MemberInput): Promise<Member> {
    const exist = await this.memberModel
      .findOne({
        membertype: MemberType.RESTAURANT,
      })
      .exec();
    if (exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);

    console.log("before", input.memberPassword);
    const salt = await bcrypt.genSalt();
    input.memberPassword = await bcrypt.hash(input.memberPassword, salt);
    console.log("after", input.memberPassword);

    try {
      const result = await this.memberModel.create(input);
      result.memberPassword = "";
      return result;
    } catch (err) {
      console.log("Error, in processSignup", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }
  //Define
  public async processLogin(input: loginInput): Promise<Member> {
    const member = await this.memberModel
      .findOne({ memberNick: input.memberNick })
      .select("+memberPassword")
      .exec();
    if (!member) throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);

    const isMacht = await bcrypt.compare(
      input.memberPassword,
      member.memberPassword,
    );

    if (!isMacht) {
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
    }

    return await this.memberModel.findById(member._id).exec();
  }
}

export default MemberService;

import memberModel from "../schema/Member.model";
import { loginInput, MemberInput } from "../libs/types/member";
import { Member } from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/types/Errors";
import { MemberType } from "../libs/types/enum/member.enum";
import { STATUS_CODES } from "http";
import { error } from "console";

class MemberService {
  private readonly memberModel;

  constructor() {
    this.memberModel = memberModel;
  }

  //Define
  public async processSignup(input: MemberInput): Promise<Member> {
    console.log(3);
    const exist = await this.memberModel
      .findOne({
        membertype: MemberType.RESTAURANT,
      })
      .exec();
    if (exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    console.log(4);

    try {
      const result = await this.memberModel.create(input);
      result.memberPassword = "";
      return result;
    } catch (err) {
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

    const isMacht = input.memberPassword === member.memberPassword;
    console.log("isMacht:", isMacht);

    if (!isMacht) {
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
    }

    return await this.memberModel.findById(member._id).exec();
  }
}

export default MemberService;

import memberModel from "../schema/Member.model";
import { MemberInput } from "../libs/types/member";
import { Member } from "../libs/types/member";
import Errors, { HttpCode, message } from "../libs/types/Errors";
import { MemberType } from "../libs/types/enum/member.enum";

class MemberService {
  private readonly memberModel;

  constructor() {
    this.memberModel = memberModel;
  }

  public async processSignup(input: MemberInput): Promise<Member> {
    const exist = await this.memberModel
      .findOne({
        membertype: MemberType.RESTAURANT,
      })
      .exec();
    console.log("exist:", exist);
    if (exist) throw new Errors(HttpCode.BAD_REQUEST, message.CREATE_FAILED);

    try {
      const result = await this.memberModel.create(input);
      result.memberPassword = "";
      return result;
    } catch (err) {
      throw new Errors(HttpCode.BAD_REQUEST, message.CREATE_FAILED);
    }
  }
}

export default MemberService;

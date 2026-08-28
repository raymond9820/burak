import session, { Session } from "express-session";
import { memberStatus, MemberType } from "./enum/member.enum";
import { Request } from "express";
export interface Member {
  memberType: MemberType;
  memberStatus: memberStatus;
  memberNick: string;
  memberPhone: string;
  memberPassword?: string;
  memberAdress?: string;
  memberDesck?: string;
  memberImage?: string;
  memberPoints?: string;
  createdAt: Date;
  updateAt: Date;
}

export interface MemberInput {
  memberType?: MemberType;
  memberStatus?: memberStatus;
  memberNick: string;
  memberPhone: string;
  memberPassword: string;
  memberAdress?: string;
  memberDesck?: string;
  memberImage?: string;
  memberPoints?: string;
}

export interface loginInput {
  memberNick: string;
  memberPassword: string;
}

export interface Adminrequest extends Request {
  member: Member;
  session: Session & { member: Member };
}

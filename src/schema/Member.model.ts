import mongoose, { Schema } from "mongoose";
import { memberStatus, MemberType } from "../libs/types/enum/member.enum";

const memberSchema = new Schema(
  {
    membertype: {
      type: String,
      enum: MemberType,
      default: MemberType.USER,
    },
    memberStatus: {
      type: String,
      enum: memberStatus,
      default: memberStatus.ACTIVE,
    },

    memberNick: {
      type: String,
      index: { unique: true, sparse: true },
      required: true,
    },
    memberPhone: {
      type: String,
      index: { unique: true, sparse: true },
    },

    memberPassword: {
      select: false,
      required: true,
    },

    memberAdress: {
      type: String,
    },
    memberDesck: {
      type: String,
    },

    memberImage: {
      type: Number,
      default: 0,
    },

    memberPoints: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }, //update creadat
);

export default mongoose.model("Member", memberSchema);

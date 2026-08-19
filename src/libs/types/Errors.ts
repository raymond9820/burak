export enum HttpCode {
  OK = 200,
  CREATED = 201,
  NOT_MODEIFIED = 304,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum Message {
  SOMETHING_WENT_WRONG = "Something went wrong!",
  NO_DATA_FOUND = "no data is found !",
  CREATE_FAILED = "Create is failed !",
  UPDATE_FAILED = "Update is failed!",

  USED_NICK_PHONE = "you are inserting already used nick or phone!",
  NO_MEMBER_NICK = "no member with that nick!",
  WRONG_PASSWORD = "wrong password , please try again!",
}

class Errors extends Error {
  public code: HttpCode;
  public message: Message;

  constructor(statusCode: HttpCode, statusMessage: Message) {
    super();
    this.code = statusCode;
    this.message = statusMessage;
  }
}

export default Errors;

import SendBy from "../enums/sendBy";

export default interface CustomJwtPayload {
  _id: string;
  type: SendBy;
}

export type Token = { token: string };

export default interface BaseIdentifier {
  number: string;
  codeValid: boolean;
  code: number;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  tokens: Token[];
  comparePassword(password: string): Promise<boolean>;
}

import * as bcrypt from "bcryptjs";
class HashHelper {
  public async generateHash(stringToHash: string): Promise<string> {
    const salt = await bcrypt.genSalt(11);
    const hashedString = await bcrypt.hash(stringToHash, salt);
    return hashedString;
  }
}
export const hashHelper = new HashHelper();

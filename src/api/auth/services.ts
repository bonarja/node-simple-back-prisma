import { plainToInstance } from "class-transformer";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../user/model";
import { UserRepository } from "../user/repository";
import { AuthServiceIO } from "./models";

export const AuthService: AuthServiceIO = {
  async authorize(UserDto) {

    try {
      const user = await UserRepository.findUserByEmail(UserDto.email || "");
      if (!user) throw "Invalid user or password";

      const isValid = await bcrypt.compare(UserDto.password, user.password);
      if (!isValid) throw "Invalid user or password";

      const dataForToken = {
        email: user.email,
      };

      const token = jwt.sign(dataForToken, process.env.BCRYPT_SECRET as string);

      return {
        user: plainToInstance(User, user, {
          excludeExtraneousValues: true,
        }),
        token,
      };
    } catch (error) {
      throw error;
    }
  },
  async createUser(userDto) {
    await userDto.createPassworkHash();
    return await UserRepository.createUser(userDto);
  },
};

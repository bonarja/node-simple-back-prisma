import { Expose } from "class-transformer";
import bcrypt from "bcrypt";

export class UserDto {
  @Expose() name!: string;
  @Expose() email!: string;
  @Expose() password!: string;

  async createPassworkHash() {
    this.password = await bcrypt.hash(this.password || "", 10);
  }
}
export class User {
  @Expose() name!: string;
  @Expose() email!: string;
}

export class UserWithAuth extends User {
    @Expose() password!: string;
}

export interface UserRepositoryIO {
  createUser(user: UserDto): Promise<User>;
  findUserByEmail(email: string): Promise<UserWithAuth | null>;
}

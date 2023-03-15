import { UserServiceIO } from "./model"
import { UserRepository } from "./repository"

export const UserService: UserServiceIO = {
  async createUser(userDto) {
    await userDto.createPasswordHash()
    return await UserRepository.createUser(userDto)
  },
  async findUserByEmail(email) {
    return await UserRepository.findUserByEmail(email)
  },
  async findUserByEmailWithPass(email) {
    return await UserRepository.findUserByEmailWithPass(email)
  },
}

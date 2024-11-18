import { IUser } from "../interfaces/user.interface";

export interface ICreateUserDto extends Pick<IUser, 'username' | 'role'> {
}

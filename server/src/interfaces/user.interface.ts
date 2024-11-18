import { Role } from "../enums/role.enum";

export interface IUser {
    id: number;
    username: string;
    role: Role;
    createdAt: string;
}

import { Role } from "./role.model";

export class User {
    userId!: number;
    login?: string;
    password?: string;
    email?: string;
    lastName?: string;
    firstName?: string;
    surName?: string;
    phone?: string;
    roleByRoleId!: Role;
}

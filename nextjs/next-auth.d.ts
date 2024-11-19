import { type DefaultSession} from "next-auth";
import {UserRole} from "@prisma/client";

export type ExtendedUser = DefaultSession["user"] & {
    role: UserRole;
    isTwoFactorEnabled: boolean;
    isOAuth: boolean;
    isPasswordEmpty: boolean;
    accessToken: string;
    refreshToken: string;
};

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }
}

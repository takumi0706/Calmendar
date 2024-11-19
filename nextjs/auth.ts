import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import { db } from "@/lib/db"
import authConfig from "./auth.config"
import {getUserById} from "@/data/user";
import {UserRole} from "@prisma/client";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation";
import {getAccountByUserId} from "@/data/accout";

//for Edge compatibility
export const {
    auth,
    handlers,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date()},
            });
        }
    },
    callbacks:{
        async signIn({ user, account }) {
            // Allow OAuth without email verification
            if (account?.provider !== "credentials") {
                return true;
            }

            if (!user.id) {
                throw new Error("User ID is undefined!");
            }
            const existingUser = await getUserById(user.id);

            // Prevent sign in without email verification
            if (!existingUser?.emailVerified) {
                return false;
            }

            if (existingUser.isTwoFactorEnabled) {
                const twoFactorTokenConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

                if (!twoFactorTokenConfirmation) {
                    return false;
                }

                // Delete two factor confirmation for next sign in
                await db.twoFactorConfirmation.delete({
                    where: { id: twoFactorTokenConfirmation.id },
                });
            }

            return true;
        },

        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user){
                session.user.role = token.role as UserRole;
            }

            if (session.user){
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
            }

            if(session.user){
                session.user.name = token.name;
                session.user.email = token.email ?? session.user.email;
                session.user.isOAuth = token.isOAuth as boolean;
                session.user.isPasswordEmpty = token.isPasswordEmpty as boolean;
            }

            return {
                ...session,
                user: {
                    ...session.user,
                    accessToken: token.accessToken,
                    refreshToken: token.refreshToken,
                },
            };
        },
        async jwt({ token }) {
            if (!token.sub) {
                return token;
            }

            const existingUser = await getUserById(token.sub);

            if (!existingUser) {
                return token;
            }

            const existingAccount = await getAccountByUserId(
                existingUser.id
            );

            if (!existingAccount) {
                return token;
            }

            token.isOAuth = !!existingAccount;
            token.isPasswordEmpty = !existingUser.password;
            token.name = existingUser.name;
            token.email = existingUser.email;
            token.role = existingUser.role;
            token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

            // OAuth(Google) accounts
            token.accessToken = existingAccount.access_token;
            token.refreshToken = existingAccount.refresh_token;

            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig
});

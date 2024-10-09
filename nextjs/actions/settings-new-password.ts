"use server";

import * as z from "zod";

import {db} from "@/lib/db";
import {NewPasswordSchema, SettingsSchema} from "@/schemas";
import {getUserByEmail, getUserById} from "@/data/user";
import {currentUser} from "@/lib/auth";
import {generateVerificationToken} from "@/lib/tokens";
import {sendVerificationEmail} from "@/lib/mail";
import bcryptjs from "bcryptjs";

export const settingsNewPassword = async (
    values: z.infer<typeof NewPasswordSchema>
) => {
    const user = await currentUser();

    if (!user || !user.id) {
        return { error: "Unauthorized" };
    }

    const dbUser = await getUserById(user.id);

    if (!dbUser) {
        return { error: "Unauthorized" };
    }

    if (values.password && !dbUser.password) {
        const saltRounds = 10;
        const salt = await bcryptjs. genSalt(saltRounds);
        const hashedPassword = await bcryptjs.hash(
            values.password,
            salt
        );
        values.password = hashedPassword;
    }

    await db.user.update({
        where: { id: user.id },
        data: {
            ...values,
        },
    });

    return { success: "Settings Updated!"}
}

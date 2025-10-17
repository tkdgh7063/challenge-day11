"use server";

import {
  ERROR_MESSAGES,
  HASH_ROUNDS,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  USERNAME_MIN_LENGTH,
} from "@/lib/constants";
import db from "@/lib/db";
import getSession from "@/lib/session";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import z from "zod";

const formSchema = z
  .object({
    email: z
      .email({
        error: (issue) => {
          if (issue.input === undefined) return ERROR_MESSAGES.EMAIL_REQUIRED;
          return ERROR_MESSAGES.EMAIL_INVALID;
        },
      })
      .toLowerCase(),
    password: z
      .string()
      .nonempty(ERROR_MESSAGES.PASSWORD_REQUIRED)
      .min(PASSWORD_MIN_LENGTH, ERROR_MESSAGES.PASSWORD_TOO_SHORT)
      .max(PASSWORD_MAX_LENGTH, ERROR_MESSAGES.PASSWORD_TOO_LONG),
    confirm_password: z.string(),
    username: z
      .string({
        error: (issue) => {
          if (issue.input === undefined)
            return ERROR_MESSAGES.USERNAME_REQUIRED;
          return ERROR_MESSAGES.USERNAME_INVALID;
        },
      })
      .min(USERNAME_MIN_LENGTH, ERROR_MESSAGES.USERNAME_TOO_SHORT)
      .max(USERNAME_MAX_LENGTH, ERROR_MESSAGES.USERNAME_TOO_LONG)
      .toLowerCase()
      .trim(),
  })
  .superRefine(async ({ email, username, password, confirm_password }, ctx) => {
    const emailExists = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (emailExists) {
      ctx.addIssue({
        code: "custom",
        path: ["email"],
        message: ERROR_MESSAGES.EMAIL_TAKEN,
        continue: false,
      });
      return z.NEVER;
    }

    if (password !== confirm_password) {
      ctx.addIssue({
        code: "custom",
        path: ["confirm_password"],
        message: ERROR_MESSAGES.PASSWORDS_DO_NOT_MATCH,
        continue: false,
      });
      return z.NEVER;
    }

    const usernameExists = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (usernameExists) {
      ctx.addIssue({
        code: "custom",
        path: ["username"],
        message: ERROR_MESSAGES.USERNAME_TAKEN,
        continue: false,
      });
      return z.NEVER;
    }
  });

export default async function createAccount(_: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };

  const result = await formSchema.spa(data);
  if (!result.success) {
    return {
      values: data,
      error: z.flattenError(result.error),
    };
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, HASH_ROUNDS);

    const user = await db.user.create({
      data: {
        email: result.data.email,
        username: result.data.username,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });

    const session = await getSession();
    session.id = user.id;
    await session.save();

    redirect("/profile");
  }
}

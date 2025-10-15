"use server";

import { ERROR_MESSAGES } from "@/lib/constants";
import db from "@/lib/db";
import { email, z } from "zod";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const formSchema = z.object({
  email: z.email(ERROR_MESSAGES.EMAIL_INVALID).toLowerCase(),
  password: z
    .string()
    .nonempty(ERROR_MESSAGES.PASSWORD_REQUIRED)
    .min(8, ERROR_MESSAGES.PASSWORD_WRONG)
    .max(20, ERROR_MESSAGES.PASSWORD_WRONG),
});

export default async function login(_: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = await formSchema.spa(data);
  if (!result.success) {
    return {
      values: data,
      error: z.flattenError(result.error),
    };
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });

    if (user) {
      const match = await bcrypt.compare(result.data.password, user.password);
      if (match) {
        const session = await getSession();
        session.id = user.id;
        await session.save();

        redirect("/profile");
      } else {
        return {
          values: data,
          error: {
            fieldErrors: {
              email: [],
              password: [ERROR_MESSAGES.PASSWORD_WRONG],
            },
          },
        };
      }
    } else {
      return {
        values: data,
        error: {
          fieldErrors: {
            email: [ERROR_MESSAGES.EMAIL_NOT_REGISTERED],
            password: [],
          },
        },
      };
    }
  }
}

"use server";

import { z } from "zod";

const emailRegexp = new RegExp(/^[a-zA-Z0-9._%+-]+@zod\.com$/);

const passwordRegexp = new RegExp(/^(?=.*\d).+$/);

const formSchema = z.object({
  email: z.email().regex(emailRegexp, "Only @zod.com emails are allowed"),
  username: z.string().min(5, "Username must be at least 5 characters long"),
  password: z
    .string()
    .min(10, "Password must be at least 10 characters long")
    .regex(passwordRegexp, "Password must include a number"),
});

export default async function login(_: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const result = formSchema.safeParse(data);
  if (!result.success) {
    return {
      values: data,
      error: z.flattenError(result.error),
    };
  } else {
    return {
      values: data,
      result: {
        ok: true,
      },
    };
  }
}

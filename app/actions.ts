"use server";

import { z } from "zod";

const formSchema = z.object({
  email: z.email(),
  username: z.string(),
  password: z.string(),
});

export default async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const result = formSchema.safeParse(data);
  if (!result.success) {
    return {
      ...prevState,
      values: data,
      result: {
        ok: false,
      },
      email: {
        message: ["Please enter a valid email address"],
      },
    };
  } else if (data.password !== "12345") {
    return {
      ...prevState,
      values: data,
      result: {
        ok: false,
      },
      password: {
        message: ["Wrong password"],
      },
    };
  } else {
    return {
      ...prevState,
      values: data,
      result: {
        ok: true,
      },
    };
  }
}

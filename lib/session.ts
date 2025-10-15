import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export default async function getSession() {
  return await getIronSession<{ id: number }>(await cookies(), {
    cookieName: "challenge",
    password: process.env.COOKIE_PASSWORD!,
  });
}

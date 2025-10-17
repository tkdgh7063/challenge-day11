import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  } else {
    notFound();
  }
}

export default async function Profile() {
  const logout = async () => {
    "use server";
    (await getSession()).destroy();
    redirect("/");
  };
  const user = await getUser();
  return (
    <div>
      <h1>Welcome to {user?.username}'s Profile!!</h1>
      <form action={logout}>
        <button className="bg-gray-400 px-2 text-white">Log out</button>
      </form>
    </div>
  );
}

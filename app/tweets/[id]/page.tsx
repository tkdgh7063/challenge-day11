import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound } from "next/navigation";

async function getIsOwner(userId: number) {
  const session = await getSession();
  if (session.id) return Boolean(session.id === userId);
  return false;
}

async function getTweet(id: number) {
  const tweet = await db.tweet.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          username: true,
          bio: true,
        },
      },
    },
  });
  return tweet;
}

export default async function TweetDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = Number((await params).id);
  if (isNaN(id)) {
    return notFound();
  }
  const tweet = await getTweet(id);
  if (!tweet) {
    return notFound();
  }

  const isOwner = await getIsOwner(tweet.userId);
  return (
    <div className="mt-4 flex flex-col items-center">
      <span className="mb-4">{tweet.tweet}</span>
      <span>By {tweet.user.username}</span>
      <span>From {tweet.user.bio}</span>
      {isOwner ? (
        <span className="mt-8 rounded-md bg-white px-1 py-1.5 text-red-400 hover:cursor-pointer">
          Delete this tweet
        </span>
      ) : null}
    </div>
  );
}

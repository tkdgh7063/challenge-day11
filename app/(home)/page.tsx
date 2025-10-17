import db from "@/lib/db";
import { Prisma } from "../generated/prisma";
import ListTweet from "@/lib/tweet-list";
import { TWEETS_PER_PAGE } from "@/lib/constants";

async function getInitialTweets() {
  const tweets = db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      created_at: true,
      user: {
        select: {
          username: true,
          bio: true,
        },
      },
    },
    take: TWEETS_PER_PAGE,
    orderBy: {
      created_at: "desc",
    },
  });

  return tweets;
}

export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;

export default async function Home() {
  const initialTweets = await getInitialTweets();
  return (
    <div className="flex h-[100vh] flex-col items-center bg-white pt-7 text-gray-500">
      <ListTweet initialTweets={initialTweets} />
    </div>
  );
}

import AddTweet from "@/components/add-tweet";
import ListTweet from "@/components/tweet-list";
import { TWEETS_PER_PAGE } from "@/lib/constants";
import db from "@/lib/db";
import { Prisma } from "../generated/prisma";

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
    <div className="flex h-[100vh] flex-col items-center gap-6 bg-white pt-7 text-gray-500">
      <AddTweet />
      <ListTweet initialTweets={initialTweets} />
    </div>
  );
}

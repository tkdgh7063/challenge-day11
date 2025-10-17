"use server";

import { TWEETS_PER_PAGE } from "@/lib/constants";
import db from "@/lib/db";

export async function fetchTweets(page: number) {
  const tweets = await db.tweet.findMany({
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
    skip: page * TWEETS_PER_PAGE,
    orderBy: {
      created_at: "desc",
    },
  });

  const totalCount = await db.tweet.count();
  const hasNext = (page + 1) * TWEETS_PER_PAGE < totalCount;

  return { tweets, hasNext };
}

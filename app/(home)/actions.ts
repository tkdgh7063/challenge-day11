"use server";

import { ERROR_MESSAGES, TWEETS_PER_PAGE } from "@/lib/constants";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import z, { any } from "zod";

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

const tweetSchema = z.object({
  tweet: z.string().nonempty(ERROR_MESSAGES.TWEET_REQUIRED),
});

export async function PostTweet(_: any, formData: FormData) {
  const data = {
    tweet: formData.get("tweet"),
  };

  const results = tweetSchema.safeParse(data);
  if (!results.success) {
    return {
      values: data,
      error: z.flattenError(results.error),
    };
  } else {
    const session = await getSession();
    if (session.id) {
      const tweet = await db.tweet.create({
        data: {
          tweet: results.data.tweet,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
        select: {
          id: true,
        },
      });

      redirect(`/tweets/${tweet.id}`);
    } else {
      redirect("/log-in");
    }
  }
}

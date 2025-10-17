"use client";

import { InitialTweets } from "@/app/(home)/page";
import ListTweet from "./list-tweet";
import { useState } from "react";
import { fetchTweets } from "@/app/(home)/actions";

export default function TweetList({
  initialTweets,
}: {
  initialTweets: InitialTweets;
}) {
  const [tweets, setTweets] = useState(initialTweets);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const onLoadPrev = async () => {
    if (page === 0) return;

    const { tweets: newTweets } = await fetchTweets(page - 1);
    if (!newTweets || newTweets.length === 0) return;

    setTweets(newTweets);
    setPage((prev) => prev - 1);
    setIsLastPage(false);
  };
  const onLoadNext = async () => {
    const { tweets: newTweets, hasNext } = await fetchTweets(page + 1);
    if (!newTweets || newTweets.length === 0) {
      setIsLastPage(true);
      return;
    }
    setTweets(newTweets);
    setPage((prev) => prev + 1);
    setIsLastPage(!hasNext);
  };
  return (
    <div className="flex flex-col gap-3">
      {tweets.map((tweet) => (
        <ListTweet {...tweet} key={tweet.id} />
      ))}
      {page === 0 ? null : (
        <button
          onClick={onLoadPrev}
          className="rounded-md bg-gray-400 py-2 text-white hover:cursor-pointer"
        >
          &larr; Load Prev
        </button>
      )}
      {isLastPage ? null : (
        <button
          onClick={onLoadNext}
          className="rounded-md bg-gray-400 py-2 text-white hover:cursor-pointer"
        >
          Load Next &rarr;
        </button>
      )}
    </div>
  );
}

import Link from "next/link";

interface ListTweetProps {
  id: number;
  tweet: string;
  user: {
    username: string;
  };
}

export default function ListTweet({
  id,
  tweet,
  user: { username },
}: ListTweetProps) {
  return (
    <Link href={`/tweets/${id}`}>
      <div key={id} className="flex gap-3 border-2 border-gray-400 p-3">
        <span className="text-gray-600">{tweet}</span>
        <span className="text-gray-400">by {username}</span>
      </div>
    </Link>
  );
}

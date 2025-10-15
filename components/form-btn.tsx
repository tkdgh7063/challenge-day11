"use client";

import { useFormStatus } from "react-dom";

export default function FormBtn({ text }: { text: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      className="rounded-2xl bg-gray-200 py-1 text-black transition-colors hover:cursor-pointer hover:bg-gray-400"
      disabled={pending}
    >
      {pending ? "Loading..." : text}
    </button>
  );
}

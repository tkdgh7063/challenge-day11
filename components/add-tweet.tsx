"use client";

import { useActionState } from "react";
import FormBtn from "./form-btn";
import FormInput from "./form-input";
import { PostTweet } from "@/app/(home)/actions";

export default function AddTweet() {
  const [state, action] = useActionState(PostTweet, null);
  return (
    <div>
      <form
        action={action}
        className="flex flex-col gap-3 border-2 border-gray-400 p-3"
      >
        <FormInput
          type="text"
          placeholder="What's happening?"
          name="tweet"
          errors={state?.error.fieldErrors.tweet}
          defaultValue={state?.values.tweet as string}
          required
        />
        <FormBtn text="Tweet" />
      </form>
    </div>
  );
}

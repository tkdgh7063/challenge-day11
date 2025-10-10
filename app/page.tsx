"use client";

import FormBtn from "@/components/form-btn";
import FormInput from "@/components/form-input";
import {
  EnvelopeIcon,
  FireIcon,
  UserIcon,
  KeyIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/solid";
import { useActionState } from "react";
import login from "./actions";

export default function Home() {
  const [state, action] = useActionState(login, null);
  return (
    <div className="flex h-[100vh] items-start justify-center bg-white pt-7">
      <div className="flex h-[50%] w-[75%] flex-col items-center gap-3">
        <FireIcon fill="red" className="size-10" />
        <form action={action} className="flex flex-col gap-3">
          <div className="relative">
            <EnvelopeIcon
              className="absolute top-1.5 left-2 size-4"
              fill="gray"
            />
            <FormInput
              type="email"
              placeholder="Email"
              name="email"
              defaultValue={state?.values.email as string}
              errors={state?.error?.fieldErrors.email}
              required
            />
          </div>
          <div className="relative">
            <UserIcon className="absolute top-1.5 left-2 size-4" fill="gray" />
            <FormInput
              type="text"
              placeholder="Username"
              name="username"
              defaultValue={state?.values?.username as string}
              errors={state?.error?.fieldErrors.username}
              required
            />
          </div>
          <div className="relative">
            <KeyIcon className="absolute top-1.5 left-2 size-4" fill="gray" />
            <FormInput
              type="password"
              placeholder="Password"
              name="password"
              defaultValue={state?.values?.password as string}
              errors={state?.error?.fieldErrors.password}
              required
            />
          </div>
          <FormBtn />
          {state?.result?.ok && (
            <div className="relative rounded-xl bg-green-500 px-1 py-3 text-center">
              <CheckBadgeIcon className="absolute top-3 left-3 size-6" />
              <span className="font-semibold text-black">Welcome back!</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

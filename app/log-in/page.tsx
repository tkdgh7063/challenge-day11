"use client";

import FormBtn from "@/components/form-btn";
import FormInput from "@/components/form-input";
import { EnvelopeIcon, FireIcon, KeyIcon } from "@heroicons/react/24/solid";
import { useActionState } from "react";
import login from "./actions";

export default function Login() {
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
          <div>
            <span className="text-gray-400">Don't have an account? </span>
            <a href="/create-account" className="text-red-500">
              Register
            </a>
          </div>
          <FormBtn text="Log in" />
        </form>
      </div>
    </div>
  );
}

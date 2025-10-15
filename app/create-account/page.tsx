"use client";

import FormBtn from "@/components/form-btn";
import FormInput from "@/components/form-input";
import {
  EnvelopeIcon,
  FireIcon,
  KeyIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { useActionState } from "react";
import createAccount from "./actions";

export default function CreateAccount() {
  const [state, action] = useActionState(createAccount, null);
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
          <div className="relative">
            <KeyIcon className="absolute top-1.5 left-2 size-4" fill="gray" />
            <FormInput
              type="password"
              placeholder="Confirm Password"
              name="confirm_password"
              defaultValue={state?.values?.confirm_password as string}
              errors={state?.error?.fieldErrors.confirm_password}
              required
            />
          </div>
          <div>
            <span className="text-gray-400">Do have an account? </span>
            <a href="/log-in" className="text-red-500">
              Login
            </a>
          </div>
          <FormBtn text="Register" />
        </form>
      </div>
    </div>
  );
}

"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  if (session) router.replace("/");
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div>
        <title>Login</title>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-black"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full text-black"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={() => signIn("credentials" , {
            email,
            password
          })}
        >
          Login
        </button>
      </div>
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <button
          onClick={() => signIn("github")}
          className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 mb-4"
        >
          Login with GitHub
        </button>
      </div>
    </div>
  );
};

export default Page;

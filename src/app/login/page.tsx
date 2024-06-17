"use client";
import Login from "@/components/Login";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) router.replace("/");
  return (
    <Login/>
  );
};

export default Page;

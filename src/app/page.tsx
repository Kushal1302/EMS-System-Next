"use client";

import { useState } from "react";
import { api } from "./_trpc/react";

// import { api } from "./_trpc/server";

const Dashboard = () => {
  const { data } = api.getUserName.useQuery();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate } = api.user.createUser.useMutation({
    onSuccess: () => {
      alert("User Created");
    },
    onError: (err) => {
      alert(err.message);
    },
  });
  const handleCreate = () => {
    mutate({
      email,
      password,
    });
  };
  return (
    <>
      {data?.name}
      {data?.type}
      <div className="flex flex-col gap-4 items-center">
      <input type="text" onChange={(e) => setEmail(e.target.value)} className="text-black " value={email}/>
      <input type="text" onChange={(e) => setPassword(e.target.value)} className="text-black " value={password}/>
      <button onClick={handleCreate}>Create</button>
      </div>
    </>
  );
};

export default Dashboard;

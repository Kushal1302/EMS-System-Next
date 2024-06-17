"use client";

import { useState } from "react";
import { api } from "./_trpc/react";
import { signOut, useSession } from "next-auth/react";
import { FaUserCircle, FaSignOutAlt, FaPlusCircle, FaHome, FaUserPlus } from "react-icons/fa";

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
  const {data:session} = useSession()

  return (
    <div className="min-h-screen flex flex-col lg:flex-row md:flex-row bg-gray-100">
      <aside className="w-full lg:w-64 md:w-64 bg-white shadow-md">
        <div className="p-4 flex items-center justify-center">
          <h1 className="text-2xl font-bold text-blue-500">My Dashboard</h1>
        </div>
        <nav className="flex flex-col p-4">
          <a href="#" className="flex items-center p-2 mb-2 text-gray-700 hover:bg-gray-200 rounded">
            <FaHome className="mr-2" />
            Home
          </a>
          <a href="#" className="flex items-center p-2 mb-2 text-gray-700 hover:bg-gray-200 rounded">
            <FaUserPlus className="mr-2" />
            Create User
          </a>
        </nav>
        <div className="p-4">
          <button
            onClick={() => signOut()}
            className="w-full flex items-center justify-center gap-2 p-2 bg-red-500 text-white rounded"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-4 lg:p-8">
        <div className="bg-white shadow-md rounded p-4 flex flex-col lg:flex-row items-center">
          <FaUserCircle className="text-blue-500 text-6xl mb-4 lg:mb-0 lg:mr-4" />
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-semibold">{session?.user?.name}</h2>
            <p className="text-gray-700">{session?.user?.email}</p>
          </div>
        </div>
        <div className="bg-white shadow-md rounded p-4 mt-8">
          <h2 className="text-2xl font-bold mb-4 text-center lg:text-left">Create New User</h2>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={email}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={password}
          />
          <button
            onClick={handleCreate}
            className="w-full p-2 bg-blue-500 text-white rounded flex items-center justify-center gap-2"
          >
            <FaPlusCircle />
            Create User
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

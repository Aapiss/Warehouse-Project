import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import { supabase } from "../utils/SupaClient";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const { login } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        alert("Login Failed!");
      } else if (data) {
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex h-screen justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <h2 className="text-3xl font-semibold text-center text-gray-800">
            Login
          </h2>
          <label htmlFor="email" className="block text-gray-700 font-medium">
            Email
            <input
              type="email"
              name="email"
              id="email"
              required
              className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="password" className="block text-gray-700 font-medium">
            Password
            <input
              type="password"
              name="password"
              id="password"
              required
              className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <Button color="secondary" type="submit">
            Login
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Login;

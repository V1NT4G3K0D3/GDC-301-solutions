import { navigate } from "raviger";
import React, { useEffect, useState } from "react";
import { login } from "../Utils/apiUtils";
import styled from "styled-components";

const Container = styled.div`
w-full max-w-lg divide-y divide-gray-200
`;

const Input = styled.div`
m-4
`;

function Login() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = await login(username, password);
      localStorage.setItem("token", data.token);
      window.location.reload();
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <h1 className="text-2xl my-2 text-gray-700">Login</h1>
      <form className="py-4" onSubmit={handleSubmit}>
        <Input>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
        </Input>
        <Input>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Input>
        <div className="flex items-center justify-between my-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </Container>
  );
}

export default Login;

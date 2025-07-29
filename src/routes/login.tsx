import { useState } from "react";
import Input from "../components/UI/input";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();
  const [input, setInput] = useState("");

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="flex flex-col gap-8 p-4 rounded-md shadow-md dark:shadow-md dark:border dark:border-gray-500">
        <h2 className="text-xl font-semibold">Login</h2>
        <div className="flex flex-col gap-4">
          <Input
            value={input}
            placeholder="Enter user name"
            className="border-b outline-none border-gray-400 dark:border-gray-500"
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <button
            disabled={!input}
            className={`px-2 py-1 bg-white dark:bg-gray-900 rounded-md shadow-md dark:shadow-md border border-gray-200 dark:border-gray-500 ${input ? 'cursor-pointer' : 'cursor-not-allowed'}`}
            onClick={() => {
              const res = login(input);
              if (res) {
                navigate("/board");
              }
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

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
      <div className="flex flex-col gap-8 shadow-md border p-4 rounded-md">
        <h2 className="text-xl font-semibold">Login</h2>
        <div className="flex flex-col gap-4">
          <Input
            value={input}
            placeholder="Enter user name"
            className="border-b outline-none"
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <button
            disabled={!input}
            className={`border px-2 py-1 rounded-md ${input ? 'cursor-pointer' : 'cursor-not-allowed'}`}
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

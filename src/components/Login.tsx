import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../lib/config";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password ) {
      setMessage("All fields are required");
      return;
    }
    console.log(email,password);
    try {
      const res = await axios.post(
        `${API_URL}/api/auth/login`,
        { email, password }   
      );

      localStorage.setItem("currentUser", JSON.stringify(res.data.user));
      const data = localStorage.setItem("user", JSON.stringify({
                  ...res.data.user,  
                  token: res.data.token
            }));
      console.log(data);    
      navigate("/");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-20">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
         
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        {message && <p className="mt-3 text-red-600">{message}</p>}
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../lib/config";

export default function AddLink() {
  const [link, setLink] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const currentUser = parsedUser?.name || null;
  const token = parsedUser?.token || null;
  const userId = parsedUser?.id || null;

  console.log(token);
   
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {  
      setMessage("Please login first to add a job link");
      return;
    }
    if (!link.trim()) {
      setMessage("Please enter a job link");
      return;
    }

    try {
      console.log("userId",userId);      
      await axios.post(
        `${API_URL}/api/jobs`,
        { url: link,ownerId: userId }, 
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );   

      setLink("res.data");
      setMessage("Job link added successfully!");

 
      setTimeout(() => navigate("/"), 500);
    } catch (err: any) {
      console.error(err);
      setMessage(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md w-96 mx-auto mt-20"
    >
      <h2 className="text-xl font-bold mb-4 text-blue-600">Add Job Link</h2>
      <input
        type="text"
        placeholder="Enter Job Link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className="border border-gray-300 p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full transition"
      >
        Save Link
      </button>
      {message && <p className="mt-3 text-green-600">{message}</p>}
    </form>
  );
}

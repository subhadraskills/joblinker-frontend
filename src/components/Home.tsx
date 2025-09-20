import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../lib/config";
import { Button } from "./ui/button";
   
interface JobLink {
  id: number;
  url: string;
  owner: {
    id: number;
    name: string;
    email: string;
  };
  createdAt: string;
}

export default function Home() {
  const [links, setLinks] = useState<JobLink[]>([]);
  const storedUser = localStorage.getItem("user");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const currentUser = parsedUser?.name || null;
  const token = parsedUser?.token || null;

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/jobs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        setLinks(res.data.jobs);
      } catch (err) {
        localStorage.removeItem("user");
      }
    };

    if (token) fetchLinks();
  }, [token]);

  const handleDelete = async (id: number,ownerId: number) => {
    console.log(id,ownerId);     
    try {
      await axios.delete(`${API_URL}/api/jobs/${id}/${ownerId}`,  {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });         
      setLinks(links.filter((link) => link.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async (id: number,ownerId: Number) => {
    const linkToEdit = links.find((link) => link.id === id);
    console.log("linkEdit",linkToEdit);       
    if (!linkToEdit) return;
    console.log(id,ownerId);   
    const newUrl = prompt("Update your job link:", linkToEdit.url);
    console.log("newURl",newUrl);      
    if (!newUrl) return;

    try {
      await axios.put(   
        `${API_URL}/api/jobs/${id}/${ownerId}`,
        { url: newUrl },{   
        headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLinks(
        links.map((link) =>
          link.id === id ? { ...link, url: newUrl } : link
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const timeAgo = (createdAt: string) => {
    const now = new Date();
    const past = new Date(createdAt);
    const diffSec = Math.floor((now.getTime() - past.getTime()) / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHrs = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHrs / 24);

    if (diffSec < 60) return `${diffSec} seconds ago`;
    if (diffMin < 60) return `${diffMin} minutes ago`;
    if (diffHrs < 24) return `${diffHrs} hours ago`;
    return `${diffDays} days ago`;
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {links.length === 0 ? (
        <p className="text-gray-500 col-span-full text-center">
          No job links yet. Add some!
        </p>
      ) : (
        links.map((link) => (
          <div
            key={link.id}
            className="border rounded-lg shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition"
          >
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-bold text-lg mb-2 break-all"
            >
              {link.url}
            </a>
            <p className="text-gray-500 mb-1">
              Added by: {link.owner.name} ({link.owner.email})
            </p>
            <p className="text-gray-400 text-sm mb-2">
              Added: {timeAgo(link.createdAt)}
            </p>

            {currentUser === link.owner.name && (
              <div className="flex gap-2 mt-auto">
                <button
                  onClick={() => handleEdit(link.id,link.owner.id)}
                  className="bg-yellow-400 px-3 py-1 rounded"
                >
                  Edit
                </button>
                 {/* <button
                  onClick={() => handleDelete(link.id,link.owner.id)}
                  className="bg-red-500 px-3 py-1 rounded text-white"
                >
                  Delete
                </button>          */}
                <Button 
                  onClick={() => handleDelete(link.id, link.owner.id)}
                   variant="link"
                   size="sm"
                   className="bg-blue-400"
                    >
                 Delete</Button>     
              </div>      
            )}
          </div>
        ))
      )}
    </div>
  );
}




import { Link, useNavigate } from "react-router-dom";

interface NavbarProps {
  toggleSidebar: () => void;
}

export default function Navbar({ toggleSidebar }: NavbarProps) {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("currentUser");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-blue-600 text-white shadow-md z-50 flex items-center justify-between px-4 md:px-10 h-16">
      <div className="flex items-center space-x-4">
        <button
          className="text-white text-2xl md:text-3xl"
          onClick={toggleSidebar}
        >
          ☰
        </button>
        <h1 className="text-xl md:text-2xl font-extrabold tracking-wide">
          Joblinker
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <Link to="/">
          <button className="bg-blue-500 px-4 py-2 rounded-md shadow hover:bg-blue-700 transition">
            Home
          </button>
        </Link>

        {currentUser && (
          <Link to="/add-link">
            <button className="bg-green-500 px-4 py-2 rounded-md shadow hover:bg-green-700 transition">
              + Add Link
            </button>
          </Link>
        )}

        {!currentUser ? (
          <>
            <Link to="/signup">
              <button className="bg-blue-700 px-4 py-2 rounded-md shadow hover:bg-blue-800 transition">
                Sign Up
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-blue-400 px-4 py-2 rounded-md shadow hover:bg-blue-500 transition">
                Login
              </button>
            </Link>
          </>
        ) : (
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 bg-green-500 text-white font-semibold rounded-full shadow">
              {currentUser.name}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-md shadow hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

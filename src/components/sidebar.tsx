import { Link, useNavigate } from "react-router-dom";

interface SidebarProps {
  open: boolean;
  toggleSidebar: () => void;
}

export const Sidebar = ({ open, toggleSidebar }: SidebarProps) => {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("currentUser");
  const currentUser = storedUser ? JSON.parse(storedUser) : null;

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("token");
    toggleSidebar();
    navigate("/login");
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white shadow-lg z-40
          transform transition-transform duration-300 pt-16
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 flex flex-col items-center border-b border-gray-700">
          {currentUser && (
            <div className="flex flex-col items-center mb-4">
              <div className="w-20 h-20 bg-green-500 text-white font-bold rounded-full flex items-center justify-center shadow-lg text-sm text-center px-2">
                {currentUser.name}
              </div>
            </div>
          )}
        </div>

        <nav className="flex flex-col p-4 space-y-2">
          <Link to="/" onClick={toggleSidebar} className="hover:bg-gray-700 p-2 rounded">
            Home
          </Link>

          {currentUser && (
            <Link to="/add-link" onClick={toggleSidebar} className="hover:bg-gray-700 p-2 rounded">
              Add Job Link
            </Link>
          )}

          {!currentUser ? (
            <>
              <Link to="/signup" onClick={toggleSidebar} className="hover:bg-gray-700 p-2 rounded">
                Signup
              </Link>
              <Link to="/login" onClick={toggleSidebar} className="hover:bg-gray-700 p-2 rounded">
                Login
              </Link>
            </>
          ) : (
            <button onClick={handleLogout} className="text-left hover:bg-gray-700 p-2 rounded w-full">
              Logout
            </button>
          )}
        </nav>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" onClick={toggleSidebar} />
      )}
    </>
  );
};

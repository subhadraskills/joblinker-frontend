import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import AddLink from "./components/AddLink";
import { Sidebar } from "./components/sidebar";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <BrowserRouter>
      <div className="bg-gray-100 w-full h-screen flex flex-col">
       
        <Navbar toggleSidebar={toggleSidebar} />

       
        <div className="flex flex-1 overflow-hidden">
          <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />

        
          <div className="flex-1 pt-16 p-6 bg-gray-50 overflow-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/add-link" element={<AddLink />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

// Components/UserInfo.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function UserInfo() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setUser(parsed.user);
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleLogout = async () => {
    await fetch("http://localhost:5001/logout", {
      method: "DELETE",
      credentials: "include",
    });
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
    toast.success("Logged out successfully!");
  };

  if (!user) return null;

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm">Welcome, <strong>{user.username || user.email}</strong></span>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}

export default UserInfo;

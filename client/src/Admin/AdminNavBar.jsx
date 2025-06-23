import React from "react";
import { Link } from "react-router-dom";

function AdminNavbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-lg">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-purple-400">Admin Dashboard</h1>
        <ul className="flex gap-6">
          <li>
            <Link to="/admin/AdminDashboard" className="hover:text-purple-300 transition">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/AddDestination" className="hover:text-purple-300 transition">Add Destination</Link>
          </li>
          <li>
            <Link to="/admin/ManageBookings" className="hover:text-purple-300 transition">Manage Bookings</Link>
          </li>
            <li>
                <Link to="/admin/EditDestination" className="hover:text-purple-300 transition">Edit Destination</Link>
            </li>
            <li>
            <Link to="/admin/Messages" className="hover:text-purple-300 transition">Messages</Link>
          </li>
          <li>
            <Link to="/" className="hover:text-purple-300 transition">Back to Home</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default AdminNavbar;



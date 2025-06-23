import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavBar";
import { toast } from "react-toastify";

function ManageBookings() {
  const [confirmed, setConfirmed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/confirmed")
      .then((res) => res.json())
      .then((data) => {
        setConfirmed(data);
        setLoading(false);
      })
  }, []);

  const handleRemove = (id) => {
    fetch(`http://localhost:3000/confirmed/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        return res.json();
      })
      .then(() => {
        setConfirmed((prev) => prev.filter((booking) => booking.id !== id));
      })
      toast.success("Booking removed successfully!");
  };

  return (
    <div>
        <AdminNavbar />
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
        Manage Confirmed Bookings
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading bookings...</p>
      ) : confirmed.length === 0 ? (
        <p className="text-center text-gray-600">No confirmed bookings yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {confirmed.map((booking) => (
            <div
              key={booking.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden"
            >
              <img
                src={booking.image}
                alt={booking.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-purple-800">{booking.name}</h2>
                <p className="text-gray-600">Country: {booking.country}</p>
                <p className="text-gray-600">Description: {booking.description}</p>
                <p className="text-gray-600">Email: {booking.email}</p>
                <p className="text-gray-600">Phone: {booking.phone}</p>
                <p className="text-gray-600">People: {booking.people}</p>
                <p className="text-gray-800 font-semibold">Total Price: ${booking.totalPrice}</p>
              </div>
              <button onClick={() => handleRemove(booking.id)}className="w-full bg-red-600 text-white px-4 py-2 hover:bg-red-700">Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}

export default ManageBookings;

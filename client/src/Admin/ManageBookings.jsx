import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavBar";
import { toast } from "react-toastify";

function ManageBookings() {
  const [confirmed, setConfirmed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5001/bookings?confirmed=true", {
      credentials: "include", // required for session auth
    })
      .then((res) => res.json())
      .then((data) => {
        setConfirmed(data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Failed to load bookings.");
        setLoading(false);
      });
  }, []);

  const handleRemove = (id) => {
    fetch(`http://localhost:5001/bookings/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Delete failed");
        setConfirmed((prev) => prev.filter((booking) => booking.id !== id));
        toast.success("Booking removed successfully!");
      })
      .catch(() => toast.error("Failed to remove booking."));
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
            {confirmed.map((booking) => {
              const destination = booking.destination || {};
              const user = booking.user || {};

              const totalPrice =
                (destination.price || 0) * (booking.people_count || 1);

              return (
                <div
                  key={booking.id}
                  className="bg-white shadow-lg rounded-xl overflow-hidden"
                >
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-purple-800">
                      {destination.name}
                    </h2>
                    <p className="text-gray-600">Country: {destination.country}</p>
                    <p className="text-gray-600">Description: {destination.description}</p>
                    <p className="text-gray-600">People: {booking.people_count}</p>
                    <p className="text-gray-800 font-semibold">
                      Total Price: ${totalPrice}
                    </p>
                    <hr className="my-2" />
                    <p className="text-gray-600">User: {user.username}</p>
                    <p className="text-gray-600">Email: {user.email}</p>
                  </div>
                  <button
                    onClick={() => handleRemove(booking.id)}
                    className="w-full bg-red-600 text-white px-4 py-2 hover:bg-red-700"
                  >
                    Remove Booking
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageBookings;

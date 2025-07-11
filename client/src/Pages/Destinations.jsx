import React from "react";
import PlaceCard from "../Components/PlaceCard";
import Navbar from "../Components/NavBar";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

function Destinations() {
    const [places, setPlaces] = useState([]);
    const [filterPrice, setFilterPrice] = useState("");

    useEffect(() => {
      fetch("http://localhost:5001/destinations")
        .then((res) => res.json())
        .then((data) => setPlaces(data))
        .catch((err) => console.error("Error fetching destinations:", err));
    }, []);
  
    const handleBook = (destination) => {
  const peopleCount = 1; // or collect from a form
  const bookingData = {
    destination_id: destination.id,
    people_count: peopleCount,
    confirmed: false
  };

  fetch("http://localhost:5001/bookings", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(bookingData)
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to book destination");
      }
      return res.json();
    })
    .then((data) => {
      toast.success("Destination booked successfully!");
    })
    .catch((err) => {
      toast.error("Please log in");
      console.error(err);
    });
};


    const filteredPlaces = filterPrice
    ? places
        .filter((place) => place.price <= Number(filterPrice))
    : places;
  
    return (
      <div>
        <Navbar />
      <div className="min-h-screen p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-center">Available Destinations</h1>
        <div className="flex justify-center mb-8">
          <input
            type="number"
            value={filterPrice}
            onChange={(e) => setFilterPrice(e.target.value)}
            placeholder="Filter by max price"
            className="p-2 w-64 border rounded shadow-sm"
          />
          <button
            onClick={() => setFilterPrice("")}
            className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Clear
          </button>
        </div>

        <div className="flex flex-wrap gap-6 justify-center">
          {filteredPlaces.map((place) => (
            <PlaceCard key={place.id} place={place} onBook={handleBook} />
          ))}
        </div>
        
       
      </div>
      /</div>
    );
  
}

export default Destinations;
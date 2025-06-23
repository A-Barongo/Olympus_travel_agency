import { useState } from "react";

 function PlaceCard({ place, onBook }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ease-in-out cursor-pointer ${
        expanded ? "w-full sm:w-[600px]" : "w-full sm:w-[300px]"
      }`}
    >
      <img
        src={place.image}
        alt={place.name}
        className={`w-full object-cover transition-all duration-300 ${
          expanded ? "h-64" : "h-48"
        }`}
      />

      <div className="p-4">
        <h2 className="text-xl font-semibold mb-1">{place.name}</h2>
        <p className="text-gray-600 mb-2">{place.country}</p>
        <p className="text-purple-700 font-bold text-lg mb-4">${place.price} Per Person (4 Nights)</p>

        {expanded && (
          <>
            <p className="text-sm text-gray-700 mb-4">{place.description || "No description provided."}</p>
            <p className="text-sm text-gray-700 mb-4">{place.message}</p>
            {place.activities && (
              <ul className="text-sm text-gray-600 list-disc list-inside mb-4">
                {place.activities.map((activity, idx) => (
                  <li key={idx}>{activity}</li>
                ))}
              </ul>
            )}
          </>
          
        )}

        <button onClick={() => {onBook(place);}}className="w-full bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800 transition">Book Now</button>
      </div>
    </div>
  );
}

export default PlaceCard;


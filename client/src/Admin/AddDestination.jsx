import AdminNavbar from "./AdminNavBar";
import { useState } from "react";
import { toast } from "react-toastify";

function AddDestination(){
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    description: "",
    image: "",
    price: "",
    activities: [],
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "activities") {
      // Handle multiple activities selection
      const activitiesArray = value.split(",").map((item) => item.trim());
      setFormData((prev) => ({ ...prev, activities: activitiesArray }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/destinations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((newDestination) => {
        console.log("New destination added:", newDestination);
        setFormData({
          name: "",
          country: "",
          description: "",
          image: "",
          price: "",
          activities: [],
          message: "",
        });
        toast.success("Destination Added Succesfully!")
      })
      .catch((error) => {
        console.error("Error adding destination:", error);
        toast.error("Failed to add destination.");
      });
  };


  return(
   <div>
    <AdminNavbar />
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
        Add New Destination
      </h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Destination Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter destination name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter country"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter description"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter image URL"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter price"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Activities</label>
          <input
            type="text"
            name="activities"
            value={formData.activities.join(", ")}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter activities (comma separated)"
          />
          <small className="text-gray-600">Example: Skiing, Shopping, Cultural Festivals</small>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Message</label>
          <input
            type="text"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter package details"
          />
        </div>
        <button type="submit"className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800 transition">Add Destination</button>
      </form>
    </div>
   </div>
  )
}

export default AddDestination
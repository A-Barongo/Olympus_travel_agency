import AdminNavbar from "./AdminNavBar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function EditDestinationForm(){
    const [destinations, setDestinations] = useState([]);
    const [editingId, setEditingId] = useState();
    const [formData, setFormData] = useState({
      name: "",
      country: "",
      description: "",
      image: "",
      price: "",
      activities: "",
      message: "",
    });
  
    useEffect(() => {
      fetch("http://localhost:3000/destinations")
        .then((res) => res.json())
        .then(setDestinations)
        .catch((err) => console.error("Failed to fetch destinations:", err));
    }, []);
  
    const startEditing = (destination) => {
      setEditingId(destination.id);
      setFormData({
        name: destination.name,
        country: destination.country,
        description: destination.description,
        image: destination.image,
        price: destination.price,
        activities: destination.activities.join(", "),
        message: destination.message || "",
      });
    };
  
    const cancelEditing = () => {
      setEditingId(null);
      setFormData({
        name: "",
        country: "",
        description: "",
        image: "",
        price: "",
        activities: "",
        message: "",
      });
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handleUpdate = (e) => {
      e.preventDefault();
      const updatedData = {
        ...formData,
        price: Number(formData.price),
        activities: formData.activities.split(",").map((act) => act.trim()),
      };
  
      fetch(`http://localhost:3000/destinations/${editingId}`, {
        
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      })

      .then(async(res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(`Server responded with ${res.status}: ${text}`);
          });
        }
        return res.json();
      })
        .then((updatedDestination) => {
          setDestinations((prev) =>
            prev.map((dest) => (dest.id === editingId ? updatedDestination : dest))
          );
          cancelEditing();
        })
        .catch((err) => console.error("Failed to update destination:", err));
        toast.success("Updated Successfully!")
    };
  
    const handleDelete = (id) => {
      fetch(`http://localhost:3000/destinations/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          setDestinations((prev) => prev.filter((dest) => dest.id !== id));
        })
        .catch((err) => console.error("Failed to delete destination:", err));
        toast.success("Deleted Successfully!")
    };
    return(
        <div>
            <AdminNavbar />
            <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
        Manage Destinations
      </h1>

      {destinations.map((destination) =>
        editingId === destination.id ? (
          <form
            key={destination.id}
            onSubmit={handleUpdate}
            className="bg-yellow-100 p-4 rounded mb-6"
          >
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mb-2 p-2 w-full border rounded"
              placeholder="Destination Name"
            />
            <input
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="mb-2 p-2 w-full border rounded"
              placeholder="Country"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mb-2 p-2 w-full border rounded"
              placeholder="Description"
            />
            <input
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="mb-2 p-2 w-full border rounded"
              placeholder="Image URL"
            />
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              className="mb-2 p-2 w-full border rounded"
              placeholder="Price"
            />
            <input
              name="activities"
              value={formData.activities}
              onChange={handleChange}
              className="mb-2 p-2 w-full border rounded"
              placeholder="Activities (comma separated)"
            />
            <input
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="mb-2 p-2 w-full border rounded"
              placeholder="Package Message"
            />
            <div className="flex gap-2">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                Save
              </button>
              <button
                type="button"
                onClick={cancelEditing}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div
            key={destination.id}
            className="bg-white p-4 rounded shadow mb-4 flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold text-purple-800">{destination.name}</h2>
              <p className="text-gray-600">{destination.country}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => startEditing(destination)}
                className="bg-blue-600 text-white px-4 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(destination.id)}
                className="bg-red-600 text-white px-4 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        )
      )}
    </div>
        </div>
    )
}

export default EditDestinationForm
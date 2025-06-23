import AdminNavbar from "./AdminNavBar";

function AdminDashboard(){
  return(
    <div>
    <AdminNavbar/>
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
        Admin Dashboard
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-purple-700 mb-4">
          Admin Actions
        </h2>
        <p className="text-gray-700 mb-2">This page is for administrative purposes only.</p>
        <p className="text-gray-700 mb-2">Manage destinations and bookings here.</p>
        <p className="text-gray-700 mb-2">You can edit, delete, and add new destinations.</p>
        <p className="text-gray-700 mb-2">You can also manage customer bookings for travel destinations.</p>
      </div>
    </div>
    </div>
  )
}

export default AdminDashboard
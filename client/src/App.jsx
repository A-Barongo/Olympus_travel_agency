import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route  } from "react-router-dom";
import { useState } from "react";
import Landing from "./Pages/Landing";
import Bookings from "./Pages/Bookings";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
import Footer from "./Components/Footer";
import Destinations from "./Pages/Destinations";
import AdminRoute from "./Admin/AdminRoute";
import AdminLogin from "./Admin/AdminLogin";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminNavbar from "./Admin/AdminNavBar";
import AddDestination from "./Admin/AddDestination";
import EditDestination from "./Admin/EditDestination";
import ManageBookings from "./Admin/ManageBookings";
import Messages from "./Admin/Messages";

function App(){
const [isAdmin, setIsAdmin] = useState(false);
  return(
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-bookings" element={<Bookings />} />
        <Route path="/adminLogin" element={<AdminLogin setIsAdmin={setIsAdmin} />} />
        <Route path="/admin" element={ <AdminRoute isAdmin={isAdmin}> <AdminNavbar/> </AdminRoute> } />
        <Route path="/admin/AdminDashboard" element={ <AdminRoute isAdmin={isAdmin}> <AdminDashboard/> </AdminRoute> } />
        <Route path="/admin/AddDestination" element={ <AdminRoute isAdmin={isAdmin}> <AddDestination/> </AdminRoute> } />
        <Route path="/admin/ManageBookings" element={ <AdminRoute isAdmin={isAdmin}> <ManageBookings/> </AdminRoute> } />
        <Route path="/admin/EditDestination" element={ <AdminRoute isAdmin={isAdmin}> <EditDestination/> </AdminRoute> } />
        <Route path="/admin/messages" element={<AdminRoute isAdmin={isAdmin}> <Messages /> </AdminRoute>} />

      </Routes>
      <Footer />
    </BrowserRouter>
    <ToastContainer />
</div>
  )
}

export default App;
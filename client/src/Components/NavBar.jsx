import { Link } from 'react-router-dom';

 function Navbar() {
  return (
    <nav className="bg-purple-700 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-300">Escape Travel</Link>
        </div>
        
        <div className="space-x-6">
          <Link to="/" className="hover:text-gray-300">Home</Link>
            <Link to="/destinations" className="hover:text-gray-300">Destinations</Link>
          <Link to="/about" className="hover:text-gray-300">About</Link>
          <Link to="/contact" className="hover:text-gray-300">Contact</Link>
          <Link to="/my-bookings" className="hover:text-gray-300">My Bookings</Link>
            <Link to="/admin/AdminDashboard" className="hover:text-gray-300">Admin</Link>
            <Link to="/signup" >Sign Up</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
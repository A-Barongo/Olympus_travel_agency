import { Link } from 'react-router-dom';
import UserInfo from './UserInfo';

function Navbar() {
  return (
    <nav className="bg-purple-700 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        
        {/* Left Side: Brand */}
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-300">Escape Travel</Link>
        </div>

        {/* Right Side: Links + UserInfo */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/destinations" className="hover:text-gray-300">Destinations</Link>
          <Link to="/about" className="hover:text-gray-300">About</Link>
          <Link to="/contact" className="hover:text-gray-300">Contact</Link>
          <Link to="/my-bookings" className="hover:text-gray-300">My Bookings</Link>
          <Link to="/admin/AdminDashboard" className="hover:text-gray-300">Admin</Link>
          <Link to="/signup" className="hover:text-gray-300">Sign Up</Link>

          {/* 👇 Show logged-in user info here */}
          <UserInfo />
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
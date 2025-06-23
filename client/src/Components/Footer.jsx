 import React from "react";
 
 function Footer() {
    return (
      <footer className="bg-purple-800 text-white py-6 ">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">&copy; {new Date().getFullYear()} Escape Travel. All rights reserved.</p>
          <div className="space-x-4">
            <a href="/about" className="hover:text-gray-300">About</a>
            <a href="/contact" className="hover:text-gray-300">Contact</a>
            <a href="/my-bookings" className="hover:text-gray-300">My Bookings</a>
          </div>
        </div>
      </footer>
    );
  }

    export default Footer;  
import React from "react";
import Navbar from "../Components/NavBar";


 function About() {
    return (
      <div>
      <Navbar />
      <div className="min-h-screen bg-white py-12 px-6">
        <h1 className="text-4xl font-bold text-purple-700 text-center mb-10">About Us </h1>
        {/* About Section */}
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-purple-700 mb-6">
              About Our Travel Agency
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              At <span className="font-semibold text-purple-800">Escape Travel</span>, we believe in crafting unforgettable experiences. 
              Whether you're seeking a relaxing beach holiday, an adrenaline-fueled adventure, or a cultural city break, 
              we've got the perfect trip waiting for you.
            </p>
            <p className="text-gray-600">
              Our team of passionate travel experts works closely with local guides and global partners 
              to ensure every journey is safe, seamless, and full of magic. Let us take you where you’ve always dreamed of going.
            </p>
          </div>
  
          <div className="flex-1">
            <img 
              src="https://images.pexels.com/photos/1005417/pexels-photo-1005417.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Travel illustration" 
              className="rounded-xl shadow-lg w-full h-auto object-cover"
            />
          </div>
        </div>
  
        {/* Meet the Team Section */}
        <div className="mt-16 max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-purple-700 mb-8 text-center">
            Meet the Team
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Amara Wells",
                role: "Lead Travel Advisor",
                image: "https://randomuser.me/api/portraits/women/65.jpg",
              },
              {
                name: "David Rami",
                role: "Destination Curator",
                image: "https://randomuser.me/api/portraits/men/32.jpg",
              },
              {
                name: "Sofia Lin",
                role: "Customer Experience Specialist",
                image: "https://randomuser.me/api/portraits/women/68.jpg",
              },
            ].map((member, idx) => (
              <div key={idx} className="bg-gray-100 rounded-xl p-6 text-center shadow">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
                />
                <h4 className="text-lg font-semibold">{member.name}</h4>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
  
        {/* Our Values Section */}
        <div className="mt-16 max-w-5xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-purple-700 mb-6">Our Core Values</h3>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            {[
              {
                title: "Authenticity",
                desc: "We provide genuine travel experiences rooted in real culture and people.",
                image: "https://img.icons8.com/?size=48&id=17912&format=png"
              },
              {
                title: "Sustainability",
                desc: "Our trips are designed to support local communities and minimize environmental impact.",
                image: "https://img.icons8.com/clouds/100/earth-planet.png"
              },
              {
                title: "Excellence",
                desc: "From booking to return, we deliver top-tier service and unforgettable quality.",
                image: "https://img.icons8.com/clouds/100/trophy.png"
              },
            ].map((value, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow p-6 w-full sm:w-1/3">
                <img
                  src={value.image}
                  alt={value.title}
                  className="w-20 h-20 mx-auto mb-4"
                />
                <h4 className="text-lg font-semibold text-purple-800">{value.title}</h4>
                <p className="text-sm text-gray-600 mt-2">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    );
  }

export default About;


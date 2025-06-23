import React from "react";
import AdminNavbar from "./AdminNavBar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Messages() {
    const [messages, setMessages] = useState([]);
  
    useEffect(() => {
      fetch("http://localhost:3000/messeges")
        .then((res) => res.json())
        .then(setMessages)
        .catch((err) => {
          console.error("Failed to fetch messages:", err);
          toast.error("Failed to load messages");
        });
    }, []);
  
    return (
      <div>
        <AdminNavbar />
        <div className="min-h-screen p-6 bg-gray-50">
          <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
            User Messages
          </h1>
  
          {messages.length === 0 ? (
            <p className="text-center text-gray-600">No messages found.</p>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="bg-white p-4 rounded shadow-md border border-gray-200"
                >
                  <h2 className="text-xl font-semibold text-purple-800">{msg.name}</h2>
                  <p className="text-gray-600">{msg.email}</p>
                  <p className="mt-2 text-gray-700">{msg.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
  
  export default Messages
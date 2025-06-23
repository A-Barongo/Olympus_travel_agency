import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../Components/NavBar";

function AdminLogin({setIsAdmin}){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    function handleLogin(e){
        e.preventDefault()

        fetch("http://localhost:3000/admin")
        .then((res) => res.json())
        .then((data) => {
            const admin = data.find((admin) => admin.username === username && admin.password === password)
            if(admin){
                setIsAdmin(true)
                navigate("/admin/AdminDashboard")
                toast.success("Login successful")
            }else{
               toast.error("Invalid username or password")
            }
        })
    }

    return(
        <div>
            <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">Admin Login</h2>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full mb-3 px-3 py-2 border rounded" required/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mb-3 px-3 py-2 border rounded" required/>
                <button type="submit" className="w-full bg-purple-700 text-white py-2 rounded hover:bg-purple-800 transition duration-300">Login</button>
            </form>
        </div>
        /</div>
    )
}

export default AdminLogin;
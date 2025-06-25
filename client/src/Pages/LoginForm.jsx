import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/NavBar';

const LoginForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch('http://localhost:5001/login', {
        method: 'POST',
        credentials: "include",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        // Save user data to localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        alert('Login successful!');
        navigate('/'); // Redirect to home or dashboard
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An unexpected error occurred');
    }

    setSubmitting(false);
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    password: Yup.string().required('Required'),
  });

  return (
    <div>
        <Navbar />
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline mb-4"
        >
          ← Back
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-gray-700">
                  Username:
                </label>
                <Field
                  type="text"
                  name="username"
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-gray-700">
                  Password:
                </label>
                <Field
                  type="password"
                  name="password"
                  className="w-full border border-gray-300 px-3 py-2 rounded"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
              >
                Login
              </button>
              <p className="text-center text-sm mt-4">
                Don't have an account?{" "}
                <span
                onClick={() => navigate("/signup")}
                className="text-blue-600 hover:underline cursor-pointer"
                >
                  Sign Up
                  </span>
                  </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
    </div>
  );
};

export default LoginForm;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('https://jarvis-ai-backend-nu7x.onrender.com/accounts/react-register/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // ✅ fixed
      });

      const contentType = res.headers.get("content-type");

      if (res.ok && contentType && contentType.includes("application/json")) {
        const data = await res.json();
        alert(data.message); // ✅ success message
        navigate('/login');
      } else {
        const text = await res.text();
        console.error("Unexpected response:", text);
        alert("Something went wrong. Check console.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-8">
      
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-10 right-10 w-80 h-80 bg-magenta-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Registration Form Container */}
      <div className="relative z-10 max-w-md w-full space-y-8 my-8">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-magenta-400 to-cyan-500 bg-clip-text text-transparent">
            Join JARVIS AI
          </h2>
          <p className="mt-2 text-gray-300">
            Create your account and step into the future
          </p>
        </div>

        {/* Form */}
        <div className="relative p-8 backdrop-blur-md bg-white/5 rounded-2xl border border-magenta-500/20 shadow-2xl">
          
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-magenta-500/5 to-cyan-500/5 blur-xl"></div>
          
          <form className="relative space-y-6" onSubmit={handleSubmit}>
            
            {/* Name Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <div className="relative group">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-magenta-400 focus:shadow-lg focus:shadow-magenta-400/20 transition-all duration-300"
                  placeholder="Enter your username"
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-magenta-400/0 to-cyan-400/0 group-focus-within:from-magenta-400/10 group-focus-within:to-cyan-400/10 transition-all duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative group">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-magenta-400 focus:shadow-lg focus:shadow-magenta-400/20 transition-all duration-300"
                  placeholder="Enter your email"
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-magenta-400/0 to-cyan-400/0 group-focus-within:from-magenta-400/10 group-focus-within:to-cyan-400/10 transition-all duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative group">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-magenta-400 focus:shadow-lg focus:shadow-magenta-400/20 transition-all duration-300"
                  placeholder="Create a password"
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-magenta-400/0 to-cyan-400/0 group-focus-within:from-magenta-400/10 group-focus-within:to-cyan-400/10 transition-all duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-magenta-500 to-cyan-500 hover:from-magenta-400 hover:to-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-magenta-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:shadow-magenta-400/30"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
              
              {/* Button glow effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-magenta-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur"></div>
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400">Or sign up with</span>
              </div>
            </div>

            {/* Social Registration */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="group w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-lg shadow-sm bg-black/20 text-sm font-medium text-gray-300 hover:bg-gray-700/30 hover:border-magenta-400/50 transition-all duration-200"
              >
                <span className="text-lg">🌐</span>
                <span className="ml-2">Google</span>
              </button>
              <button
                type="button"
                className="group w-full inline-flex justify-center py-2 px-4 border border-gray-600 rounded-lg shadow-sm bg-black/20 text-sm font-medium text-gray-300 hover:bg-gray-700/30 hover:border-magenta-400/50 transition-all duration-200"
              >
                <span className="text-lg">🚀</span>
                <span className="ml-2">GitHub</span>
              </button>
            </div>
          </form>
        </div>

        {/* Sign in link */}
        <div className="text-center">
          <p className="text-gray-300">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-magenta-400 hover:text-magenta-300 transition-colors duration-200"
            >
              Sign in to JARVIS
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
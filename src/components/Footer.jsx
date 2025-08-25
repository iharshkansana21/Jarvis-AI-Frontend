import React from 'react';

const Footer = () => {
  const socialLinks = [
    { name: 'GitHub', icon: '⚡', href: '#' },
    { name: 'Twitter', icon: '🐦', href: '#' },
    { name: 'Discord', icon: '💬', href: '#' },
    { name: 'LinkedIn', icon: '💼', href: '#' },
  ];

  return (
    <footer className="relative mt-20 py-8 backdrop-blur-md bg-black/20 border-t border-cyan-500/30">
      {/* Animated divider */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          
          {/* Brand */}
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-magenta-500 flex items-center justify-center">
              <span className="text-black font-bold text-xs">J</span>
            </div>
            <span className="text-white font-semibold bg-gradient-to-r from-cyan-400 to-magenta-500 bg-clip-text text-transparent">
              JARVIS AI
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="group relative p-2 rounded-lg backdrop-blur-sm bg-white/5 border border-cyan-500/20 hover:border-magenta-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20"
                title={link.name}
              >
                <span className="text-xl group-hover:scale-110 transition-transform duration-300 block">
                  {link.icon}
                </span>
                
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-gray-400 text-sm">
            <p>&copy; 2025 JARVIS AI. All rights reserved.</p>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="mt-6 flex justify-center">
          <div className="w-64 h-px bg-gradient-to-r from-transparent via-magenta-400/50 to-transparent"></div>
        </div>

        {/* Tech stack */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Powered by React • Tailwind CSS • Django
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
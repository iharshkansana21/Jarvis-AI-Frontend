import React from 'react';

const FeatureCard = ({ icon, title, description, delay = 0 }) => {
  return (
    <div 
      className="group relative p-6 rounded-xl backdrop-blur-md bg-white/5 border border-cyan-500/20 hover:border-magenta-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/20"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-magenta-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
      
      {/* Card content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-400 to-magenta-500 flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-cyan-400/50 transition-all duration-300">
          <span className="text-2xl">{icon}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-300 leading-relaxed group-hover:text-gray-100 transition-colors duration-300">
          {description}
        </p>

        {/* Hover overlay effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/5 to-magenta-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-cyan-400/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
};

export default FeatureCard;
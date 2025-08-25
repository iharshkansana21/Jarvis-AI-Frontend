import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard';

const Home = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const phrases = [
    'Welcome to JARVIS',
    'Your AI Assistant',
    'The Future is Now'
  ];

  useEffect(() => {
    let timeout;
    const currentPhrase = phrases[textIndex];
    
    if (isTyping) {
      if (displayText.length < currentPhrase.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => setIsTyping(false), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
      } else {
        setIsTyping(true);
        setTextIndex((prev) => (prev + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, textIndex, phrases]);

  const features = [
    {
      icon: '🎤',
      title: 'Voice Command Control',
      description: 'Control your entire system with natural voice commands. Open applications, manage files, and execute complex tasks hands-free.'
    },
    {
      icon: '🖥️',
      title: 'System Integration',
      description: 'Deep integration with Windows, macOS, and Linux. Manage system settings, monitor performance, and automate workflows.'
    },
    {
      icon: '🏠',
      title: 'Smart Home Control',
      description: 'Connect and control IoT devices, smart lights, thermostats, and security systems through voice commands.'
    },
    {
      icon: '🔧',
      title: 'Task Automation',
      description: 'Create custom automation scripts. Schedule tasks, batch operations, and streamline repetitive processes.'
    },
    {
      icon: '📱',
      title: 'Multi-Device Sync',
      description: 'Seamlessly sync across all your devices. Control your PC from your phone or manage mobile apps from desktop.'
    },
    {
      icon: '🛡️',
      title: 'Security & Privacy',
      description: 'Advanced security protocols with local processing. Your voice data stays on your device with end-to-end encryption.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-32 right-10 w-96 h-96 bg-magenta-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-cyan-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Scanning Lines Animation */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-pulse"></div>
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-magenta-400/30 to-transparent animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-magenta-500 to-cyan-400 bg-clip-text text-transparent mb-6 animate-pulse">
              JARVIS
            </h1>
            
            {/* Animated typing text */}
            <div className="h-16 flex items-center justify-center">
              <h2 className="text-2xl md:text-4xl font-light text-white">
                {displayText}
                <span className="animate-pulse">|</span>
              </h2>
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Your intelligent voice-controlled system companion. JARVIS seamlessly integrates with your devices, 
            automates tasks, and controls your entire digital ecosystem through natural voice commands.
          </p>

          {/* CTA Button */}
          <Link
            to="/Login"
            className="group relative inline-flex items-center px-12 py-4 text-lg font-semibold text-white bg-gradient-to-r from-cyan-500 to-magenta-500 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/50"
          >
            <span className="relative z-10 flex items-center">
              Get Started
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            
            {/* Button glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-magenta-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full blur"></div>
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">
              Voice-Controlled <span className="bg-gradient-to-r from-cyan-400 to-magenta-500 bg-clip-text text-transparent">System Management</span>
            </h3>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Experience hands-free computing with advanced voice recognition and system control capabilities
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '500K+', label: 'Voice Commands/Day', icon: '🎤' },
              { number: '95%', label: 'Recognition Accuracy', icon: '🎯' },
              { number: '50+', label: 'System Integrations', icon: '🔧' },
              { number: '<200ms', label: 'Response Time', icon: '⚡' }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="backdrop-blur-md bg-white/5 rounded-2xl p-6 border border-cyan-500/10 hover:border-magenta-500/30 transition-all duration-500 hover:scale-105">
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-magenta-500 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technology Stack */}
      <div className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">
              Powered by <span className="bg-gradient-to-r from-cyan-400 to-magenta-500 bg-clip-text text-transparent">Advanced Voice AI</span>
            </h3>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              State-of-the-art speech recognition and natural language processing for seamless system control
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Speech Recognition', progress: 96, color: 'from-cyan-400 to-blue-500' },
              { name: 'Natural Language', progress: 94, color: 'from-magenta-400 to-pink-500' },
              { name: 'System Integration', progress: 92, color: 'from-green-400 to-cyan-400' },
              { name: 'Voice Commands', progress: 98, color: 'from-yellow-400 to-orange-500' },
              { name: 'Device Control', progress: 90, color: 'from-purple-400 to-magenta-500' },
              { name: 'Automation Scripts', progress: 88, color: 'from-cyan-400 to-magenta-500' },
              { name: 'Real-time Processing', progress: 95, color: 'from-blue-400 to-cyan-400' },
              { name: 'Multi-Platform', progress: 93, color: 'from-pink-400 to-magenta-500' }
            ].map((tech, index) => (
              <div key={index} className="backdrop-blur-md bg-white/5 rounded-xl p-4 border border-cyan-500/10 hover:border-magenta-500/30 transition-all duration-300">
                <div className="text-center mb-3">
                  <h4 className="text-white font-semibold text-sm mb-2">{tech.name}</h4>
                  <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-magenta-500 bg-clip-text text-transparent">
                    {tech.progress}%
                  </div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r ${tech.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${tech.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">
              What Our <span className="bg-gradient-to-r from-cyan-400 to-magenta-500 bg-clip-text text-transparent">Users Say</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Dr. Alex Thompson',
                role: 'Software Engineer',
                avatar: '👨‍💻',
                quote: 'JARVIS completely transformed my workflow. I can control my entire development environment with voice commands - opening IDEs, running builds, managing Docker containers, all hands-free!'
              },
              {
                name: 'Maria Santos',
                role: 'System Administrator',
                avatar: '👩‍💼',
                quote: 'Managing multiple servers is now effortless. JARVIS monitors system health, executes maintenance scripts, and alerts me to issues before they become problems. It\'s like having a 24/7 ops team.'
              },
              {
                name: 'Kevin Zhang',
                role: 'Smart Home Enthusiast',
                avatar: '🏠',
                quote: 'My entire house responds to JARVIS. Lights, temperature, security, entertainment - everything is voice controlled. It feels like living in the future, and the setup was surprisingly simple.'
              }
            ].map((testimonial, index) => (
              <div key={index} className="backdrop-blur-md bg-white/5 rounded-2xl p-6 border border-cyan-500/10 hover:border-magenta-500/30 transition-all duration-500 hover:scale-105">
                <div className="flex items-center mb-4">
                  <div className="text-3xl mr-3">{testimonial.avatar}</div>
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-cyan-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed italic">"{testimonial.quote}"</p>
                <div className="flex text-yellow-400 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div id="features" className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">
              Voice Control <span className="bg-gradient-to-r from-cyan-400 to-magenta-500 bg-clip-text text-transparent">Everything</span>
            </h3>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              From system administration to smart home automation, JARVIS puts voice control at your fingertips
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                category: 'System Control',
                icon: '💻',
                examples: ['Launch Applications', 'File Management', 'System Monitoring', 'Process Management']
              },
              {
                category: 'Smart Home',
                icon: '🏠',
                examples: ['Light Control', 'Temperature Settings', 'Security Systems', 'Entertainment Centers']
              },
              {
                category: 'Development Tools',
                icon: '⚙️',
                examples: ['Code Compilation', 'Git Operations', 'Docker Management', 'Database Queries']
              },
              {
                category: 'Productivity',
                icon: '📋',
                examples: ['Calendar Management', 'Email Automation', 'Document Creation', 'Meeting Scheduling']
              },
              {
                category: 'Media Control',
                icon: '🎵',
                examples: ['Music Playback', 'Video Streaming', 'Volume Control', 'Playlist Management']
              },
              {
                category: 'Network & Security',
                icon: '🔒',
                examples: ['VPN Management', 'Firewall Control', 'Network Monitoring', 'Access Control']
              }
            ].map((useCase, index) => (
              <div key={index} className="backdrop-blur-md bg-white/5 rounded-2xl p-6 border border-cyan-500/10 hover:border-magenta-500/30 transition-all duration-500 hover:scale-105">
                <div className="text-4xl mb-4 text-center">{useCase.icon}</div>
                <h4 className="text-xl font-semibold text-white mb-4 text-center">{useCase.category}</h4>
                <ul className="space-y-2">
                  {useCase.examples.map((example, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <span className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-magenta-500 rounded-full mr-3"></span>
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">
              Choose Your <span className="bg-gradient-to-r from-cyan-400 to-magenta-500 bg-clip-text text-transparent">Plan</span>
            </h3>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Start free and scale as you grow. No hidden fees, cancel anytime
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Personal',
                price: 'Free',
                period: 'Forever',
                features: ['Basic voice commands', 'System control', 'File management', 'Simple automation', 'Community support'],
                popular: false
              },
              {
                name: 'Professional',
                price: '$19',
                period: 'per month',
                features: ['Advanced voice recognition', 'Smart home integration', 'Custom automation scripts', 'Priority support', 'Cloud synchronization', 'Multi-device control'],
                popular: true
              },
              {
                name: 'Enterprise',
                price: '$49',
                period: 'per month',
                features: ['Everything in Pro', 'Network administration', 'Security controls', 'Custom integrations', 'Dedicated support', 'On-premise deployment'],
                popular: false
              }
            ].map((plan, index) => (
              <div key={index} className={`relative backdrop-blur-md bg-white/5 rounded-2xl p-8 border transition-all duration-500 hover:scale-105 ${
                plan.popular 
                  ? 'border-magenta-500/50 shadow-lg shadow-magenta-400/20' 
                  : 'border-cyan-500/10 hover:border-cyan-500/30'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-magenta-500 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h4 className="text-2xl font-bold text-white mb-2">{plan.name}</h4>
                  <div className="mb-4">
                    <span className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-magenta-500 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    <span className="text-gray-400 ml-2">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <span className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-magenta-500 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-magenta-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-magenta-400/30'
                    : 'border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10'
                }`}>
                  {plan.price === 'Free' ? 'Get Started' : 'Choose Plan'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="relative z-10 py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-bold text-white mb-6">
            Ready to control your world with your voice?
          </h3>
          <p className="text-gray-300 text-xl mb-8">
            Join thousands of users who have transformed their digital experience with JARVIS voice control
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              to="/register"
              className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-magenta-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-400/30 transition-all duration-300 hover:scale-105 text-lg"
            >
              Start Voice Control
            </Link>
            <Link
              to="/Login"
              className="px-10 py-4 border border-cyan-400/50 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-400/10 transition-all duration-300 hover:scale-105 text-lg"
            >
              Try Voice Demo
            </Link>
          </div>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-gray-400 text-sm">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              Works offline
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
              No cloud dependency
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-magenta-400 rounded-full mr-2"></span>
              Cross-platform support
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
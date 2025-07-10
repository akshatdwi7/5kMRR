import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  MessageCircle, 
  BarChart3, 
  Shield, 
  Zap, 
  Star,
  ArrowRight,
  Play,
  CheckCircle,
  Users,
  Target,
  Brain,
  Eye,
  Mail,
  Lock,
  Chrome
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { useAuth } from '../contexts/AuthContext';

export const LandingPage: React.FC = () => {
  const { login, signup, loginWithGoogle } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password, fullName);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await loginWithGoogle();
    } catch (err: any) {
      setError(err.message || 'Google login failed');
    } finally {
      setLoading(false);
    }
  };

  // Broker logos placeholder - you can replace these with actual broker logos
  const brokerLogos = [
    { name: 'Zerodha', placeholder: 'Z' },
    { name: 'Upstox', placeholder: 'U' },
    { name: 'Angel One', placeholder: 'A' },
    { name: 'ICICI Direct', placeholder: 'I' },
    { name: 'HDFC Securities', placeholder: 'H' },
    { name: 'Kotak Securities', placeholder: 'K' },
    { name: 'Groww', placeholder: 'G' },
    { name: 'Paytm Money', placeholder: 'P' },
    { name: 'Motilal Oswal', placeholder: 'M' },
    { name: 'Sharekhan', placeholder: 'S' },
    { name: '5paisa', placeholder: '5' },
    { name: 'Edelweiss', placeholder: 'E' },
  ];

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Get intelligent stock insights powered by advanced AI algorithms'
    },
    {
      icon: Eye,
      title: 'Real-time Screening',
      description: 'Screen thousands of stocks with custom filters in real-time'
    },
    {
      icon: BarChart3,
      title: 'Advanced Charts',
      description: 'Professional-grade charting tools with technical indicators'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Bank-grade security with 99.9% uptime guarantee'
    }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Day Trader',
      content: 'Screeno\'s AI analysis helped me identify winning stocks. My portfolio is up 35% this year!',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      role: 'Investment Advisor',
      content: 'The screening tools are incredibly powerful. I can find undervalued stocks in minutes.',
      rating: 5
    },
    {
      name: 'Amit Patel',
      role: 'Retail Investor',
      content: 'Finally, a platform that makes stock analysis simple and accessible for everyone.',
      rating: 5
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Users' },
    { number: '₹500Cr+', label: 'Assets Analyzed' },
    { number: '99.9%', label: 'Uptime' },
    { number: '4.9/5', label: 'User Rating' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2"
                >
                  <Zap className="h-4 w-4 text-blue-400" />
                  <span className="text-blue-300 text-sm font-medium">AI-Powered Stock Analysis</span>
                </motion.div>
                
                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                  Smart Stock
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {' '}Analysis
                  </span>
                  <br />
                  Made Simple
                </h1>
                
                <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                  Discover winning stocks with AI-powered insights, real-time screening, 
                  and professional-grade analysis tools. Join thousands of successful investors.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Start Free Trial
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>14-day free trial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>No credit card required</span>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Auth Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {isLogin ? 'Welcome Back' : 'Get Started Free'}
                  </h3>
                  <p className="text-gray-300">
                    {isLogin ? 'Sign in to your account' : 'Create your account in seconds'}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <Input
                      placeholder="Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                    />
                  )}
                  
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    icon={<Mail className="h-4 w-4 text-gray-400" />}
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                  />
                  
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    icon={<Lock className="h-4 w-4 text-gray-400" />}
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                  />

                  {error && (
                    <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        {isLogin ? 'Sign In' : 'Create Account'}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/20"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-transparent text-gray-400">Or continue with</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    variant="outline"
                    className="w-full mt-4 border-white/20 text-white hover:bg-white/10"
                  >
                    <Chrome className="h-4 w-4 mr-2" />
                    Google
                  </Button>
                </div>

                <div className="mt-6 text-center">
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                  </button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 bg-white/5 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Animated Broker Logos Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 bg-gradient-to-r from-gray-900/50 to-blue-900/50"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-white mb-4"
            >
              Connect Your Broker
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Seamlessly integrate with all major Indian brokers for real-time portfolio tracking and analysis
            </motion.p>
          </div>

          {/* Moving Broker Logos */}
          <div className="relative overflow-hidden">
            <motion.div
              animate={{ x: [0, -100] }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="flex space-x-8 whitespace-nowrap"
              style={{ width: 'calc(200% + 2rem)' }}
            >
              {/* First set of logos */}
              {brokerLogos.map((broker, index) => (
                <motion.div
                  key={`first-${index}`}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="flex-shrink-0 w-24 h-24 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center group hover:bg-white/20 transition-all duration-300"
                >
                  <div className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {broker.placeholder}
                  </div>
                </motion.div>
              ))}
              
              {/* Duplicate set for seamless loop */}
              {brokerLogos.map((broker, index) => (
                <motion.div
                  key={`second-${index}`}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="flex-shrink-0 w-24 h-24 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center group hover:bg-white/20 transition-all duration-300"
                >
                  <div className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {broker.placeholder}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Second row moving in opposite direction */}
          <div className="relative overflow-hidden mt-8">
            <motion.div
              animate={{ x: [-100, 0] }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
              className="flex space-x-8 whitespace-nowrap"
              style={{ width: 'calc(200% + 2rem)' }}
            >
              {/* First set of logos (reversed) */}
              {[...brokerLogos].reverse().map((broker, index) => (
                <motion.div
                  key={`third-${index}`}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="flex-shrink-0 w-24 h-24 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center group hover:bg-white/20 transition-all duration-300"
                >
                  <div className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {broker.placeholder}
                  </div>
                </motion.div>
              ))}
              
              {/* Duplicate set for seamless loop */}
              {[...brokerLogos].reverse().map((broker, index) => (
                <motion.div
                  key={`fourth-${index}`}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="flex-shrink-0 w-24 h-24 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center group hover:bg-white/20 transition-all duration-300"
                >
                  <div className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {broker.placeholder}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3">
              Connect Your Broker
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <p className="text-gray-400 text-sm mt-4">
              Secure API integration • Read-only access • Bank-grade encryption
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Professional-grade tools and AI-powered insights to help you make smarter investment decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 h-full hover:bg-white/10 transition-all duration-300">
                  <div className="p-3 bg-blue-500/20 rounded-xl w-fit mb-4">
                    <feature.icon className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 bg-white/5 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Trusted by Thousands of Investors
            </h2>
            <p className="text-xl text-gray-300">
              See what our users are saying about Screeno
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 h-full">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-gray-400 text-sm">{testimonial.role}</div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20"
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Start Your
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {' '}Investment Journey?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of successful investors who trust Screeno for their stock analysis and portfolio management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
            >
              Start Free Trial
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg"
            >
              <Users className="h-5 w-5 mr-2" />
              Join Community
            </Button>
          </div>
          <p className="text-gray-400 text-sm mt-6">
            14-day free trial • No credit card required • Cancel anytime
          </p>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Screeno</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 Screeno. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
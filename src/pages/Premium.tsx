import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Check, Star, Zap, TrendingUp, Shield } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export const Premium: React.FC = () => {
  const plans = [
    {
      name: 'Pro',
      price: 29,
      period: 'month',
      popular: false,
      features: [
        'Real-time market data',
        'Advanced charting tools',
        'AI-powered insights',
        'Portfolio tracking',
        'Email alerts',
        'Basic screener',
      ],
    },
    {
      name: 'Premium',
      price: 79,
      period: 'month',
      popular: true,
      features: [
        'Everything in Pro',
        'Advanced screener',
        'AI chat unlimited',
        'Custom alerts',
        'Options data',
        'Pre-market access',
        'Priority support',
      ],
    },
    {
      name: 'Enterprise',
      price: 199,
      period: 'month',
      popular: false,
      features: [
        'Everything in Premium',
        'API access',
        'Custom integrations',
        'Dedicated support',
        'Advanced analytics',
        'Team collaboration',
        'White-label options',
      ],
    },
  ];

  const features = [
    {
      icon: TrendingUp,
      title: 'Real-time Data',
      description: 'Access live market data with minimal delay for better trading decisions.',
    },
    {
      icon: Zap,
      title: 'AI-Powered Analysis',
      description: 'Get intelligent insights and recommendations powered by advanced AI.',
    },
    {
      icon: Shield,
      title: 'Advanced Security',
      description: 'Enterprise-grade security to protect your data and investments.',
    },
    {
      icon: Star,
      title: 'Priority Support',
      description: '24/7 dedicated support to help you maximize your trading potential.',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center mb-6"
        >
          <Crown className="h-12 w-12 text-yellow-500 mr-4" />
          <h1 className="text-4xl font-bold text-white">Upgrade to Premium</h1>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-300 max-w-2xl mx-auto"
        >
          Unlock advanced features and take your trading to the next level with our premium plans.
        </motion.p>
      </div>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              </div>
            )}
            <Card className={`h-full ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-center justify-center mb-4">
                  <span className="text-4xl font-bold text-white">${plan.price}</span>
                  <span className="text-gray-400 ml-2">/{plan.period}</span>
                </div>
                <Button
                  variant={plan.popular ? 'primary' : 'outline'}
                  className="w-full"
                  size="lg"
                >
                  {plan.popular ? 'Start Free Trial' : 'Get Started'}
                </Button>
              </div>
              <div className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Features Section */}
      <div>
        <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose Premium?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="text-center h-full">
                <feature.icon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <Card className="text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Trading Like a Pro?</h2>
          <p className="text-gray-300 mb-6">
            Join thousands of traders who trust Screeno for their investment decisions.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button size="lg" variant="primary">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline">
              View Demo
            </Button>
          </div>
          <p className="text-sm text-gray-400 mt-4">
            14-day free trial • No credit card required • Cancel anytime
          </p>
        </div>
      </Card>
    </div>
  );
};
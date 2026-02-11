"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Users, Trophy, Zap, Brain, ArrowRight, Play, ChevronDown, Target } from 'lucide-react';

const features = [
  { 
    number: "01", 
    title: "Practice", 
    desc: "Real-world AI scenarios that push you to think critically",
    icon: Zap, 
    color: "#00F0FF" 
  },
  { 
    number: "02", 
    title: "Collaborate", 
    desc: "Work alongside your AI partner to solve real problems",
    icon: Users, 
    color: "#FF006E" 
  },
  { 
    number: "03", 
    title: "Master", 
    desc: "Build lasting skills through reflection and iteration",
    icon: Trophy, 
    color: "#8B5CF6" 
  },
];

const stats = [
  { icon: Brain, label: "Training Missions", value: "10", color: "#00F0FF" },
  { icon: Target, label: "Challenges", value: "∞", color: "#FF006E" },
  { icon: Zap, label: "Possibilities", value: "∞", color: "#8B5CF6" },
];

export default function Home() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-[90vh] flex flex-col justify-center items-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-gray-300">The Collaboration Dojo</span>
          </motion.div>
          
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-none mb-6">
            <span className="block">MASTER</span>
            <span className="block text-gradient">
              AI WORKFLOWS
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12">
            Practice real problems. Build intuition. Become fluent in human-AI collaboration.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link 
              href="/onboarding"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold text-lg rounded-2xl hover:bg-cyan-400 transition-all hover:scale-105"
            >
              <Play className="w-5 h-5" />
              Start Training
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/missions"
              className="inline-flex items-center gap-2 px-8 py-4 glass font-medium text-lg rounded-2xl hover:bg-white/10 transition-all"
            >
              Browse Missions
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-white/50 rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24 sm:py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-cyan-400 text-sm uppercase tracking-[0.3em] mb-4">How It Works</p>
            <h2 className="text-4xl sm:text-5xl font-black">Your Path to Mastery</h2>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={i}
                  className="group relative p-8 glass rounded-3xl hover:border-cyan-400/50 transition-all cursor-pointer"
                  onMouseEnter={() => setHoveredFeature(i)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  whileHover={{ y: -8 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110"
                      style={{ background: `${feature.color}20`, border: `2px solid ${feature.color}40` }}
                    >
                      <IconComponent className="w-7 h-7" style={{ color: feature.color }} />
                    </div>
                    <span className="text-5xl font-black text-white/5 group-hover:text-white/10 transition-colors">
                      {feature.number}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                  
                  {hoveredFeature === i && (
                    <motion.div
                      className="absolute inset-0 rounded-3xl -z-10"
                      style={{ background: `radial-gradient(circle at 50% 0%, ${feature.color}15, transparent 70%)` }}
                      layoutId="feature-highlight"
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-24 sm:py-32 px-4 border-y border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-pink-500/5" />
        
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-12 md:gap-24 relative">
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div 
                className="w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                style={{ background: `${stat.color}20`, border: `2px solid ${stat.color}40` }}
              >
                <stat.icon className="w-10 h-10" style={{ color: stat.color }} />
              </div>
              <div className="text-5xl sm:text-6xl md:text-7xl font-black" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-sm uppercase tracking-widest text-gray-400 mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 sm:py-32 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-cyan-400 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6">
              Ready to Start?
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-xl mx-auto">
              Join the dojo. Transform how you work with AI through hands-on practice.
            </p>
            <Link 
              href="/onboarding"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-cyan-400 to-pink-500 text-white font-bold text-lg rounded-2xl hover:opacity-90 transition-all hover:scale-105"
            >
              Enter The Dojo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-pink-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="text-gray-500 text-sm">© 2026 TANDEM</span>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="text-sm text-gray-500 hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Users, Trophy, Zap, Brain, ArrowRight, Play } from 'lucide-react';

export default function Home() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    { number: "01", title: "Practice", desc: "Real-world AI scenarios", icon: Zap, color: "#00F0FF" },
    { number: "02", title: "Collaborate", desc: "Work alongside AI partners", icon: Users, color: "#FF006E" },
    { number: "03", title: "Master", desc: "Build lasting skills", icon: Trophy, color: "#8B5CF6" },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-8 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold tracking-tighter">
            <span className="text-cyan-400">TAN</span>
            <span className="text-pink-500">DEM</span>
          </Link>
          <div className="flex gap-8">
            <Link href="/classes" className="text-sm uppercase tracking-widest hover:text-cyan-400 transition-colors">Classes</Link>
            <Link href="/challenges" className="text-sm uppercase tracking-widest hover:text-pink-500 transition-colors">Challenges</Link>
            <Link href="/profile" className="text-sm uppercase tracking-widest hover:text-purple-400 transition-colors">Profile</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center items-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl"
        >
          <motion.p 
            className="text-cyan-400 text-sm uppercase tracking-[0.3em] mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            The Collaboration Dojo
          </motion.p>
          
          <h1 className="text-7xl md:text-9xl font-black leading-none mb-6">
            <span className="block">MASTER</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              AI WORKFLOWS
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12">
            Practice real problems. Build intuition. Become fluent in human-AI collaboration.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link 
              href="/onboarding"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold text-lg uppercase tracking-wider rounded-full hover:bg-cyan-400 transition-colors"
            >
              <Play className="w-5 h-5" />
              Start Training
            </Link>
            <Link 
              href="/classes"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-bold text-lg uppercase tracking-wider rounded-full hover:border-white hover:bg-white/10 transition-all"
            >
              Browse Classes
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-cyan-400 text-sm uppercase tracking-[0.3em] mb-4">How It Works</p>
            <h2 className="text-4xl md:text-5xl font-black">Your Path to Mastery</h2>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={i}
                  className="group relative p-8 border border-white/10 rounded-2xl hover:border-cyan-400/50 transition-all cursor-pointer bg-white/5"
                  onMouseEnter={() => setHoveredFeature(i)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  whileHover={{ y: -10 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{ background: `${feature.color}20`, border: `2px solid ${feature.color}40` }}
                    >
                      <IconComponent className="w-7 h-7" style={{ color: feature.color }} />
                    </div>
                    <span className="text-5xl font-black text-white/10 group-hover:text-white/20 transition-colors">
                      {feature.number}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                  
                  {hoveredFeature === i && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-purple-500/10 rounded-2xl -z-10"
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
      <section className="relative z-10 py-32 px-4 border-y border-white/10 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-pink-500/5" />
        
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-16 md:gap-32 relative">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-cyan-400/20 flex items-center justify-center">
              <Brain className="w-10 h-10 text-cyan-400" />
            </div>
            <div className="text-6xl md:text-8xl font-black text-cyan-400">6</div>
            <div className="text-sm uppercase tracking-widest text-gray-400 mt-2">Practice Classes</div>
          </motion.div>
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-pink-500/20 flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-pink-500" />
            </div>
            <div className="text-6xl md:text-8xl font-black text-pink-500">4</div>
            <div className="text-sm uppercase tracking-widest text-gray-400 mt-2">AI Partners</div>
          </motion.div>
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-purple-400/20 flex items-center justify-center">
              <Zap className="w-10 h-10 text-purple-400" />
            </div>
            <div className="text-6xl md:text-8xl font-black text-purple-400">∞</div>
            <div className="text-sm uppercase tracking-widest text-gray-400 mt-2">Possibilities</div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 px-4 text-center overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
        </div>
        
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-cyan-400 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              READY TO START?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-xl mx-auto">
              Join the dojo. Transform how you work with AI.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex"
            >
              <Link 
                href="/onboarding"
                className="inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-cyan-400 to-pink-500 text-white font-bold text-lg uppercase tracking-wider rounded-full hover:opacity-90 transition-opacity"
              >
                Enter The Dojo
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © 2026 TANDEM. All conversations processed locally.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="text-sm text-gray-500 hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

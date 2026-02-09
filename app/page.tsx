"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  const [showPersonalityShowcase, setShowPersonalityShowcase] = useState(false);
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-900 via-black to-black text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-600 mb-4">
            TANDEM
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-2">The Collaboration Dojo</p>
          <p className="text-base md:text-lg text-gray-400 mb-8 max-w-xl mx-auto">
            Practice working with AI through real problems.<br />
            <span className="text-cyan-400">Human</span> + <span className="text-pink-500">AI</span> = <span className="text-purple-400">Fusion</span>
          </p>
          
          <Link href="/onboarding">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-bold uppercase tracking-wide shadow-lg hover:shadow-cyan-500/50 transition-shadow"
            >
              Enter The Dojo
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="p-6 rounded-xl border border-cyan-500/20 bg-cyan-500/5 text-center"
            >
              <div className="text-4xl mb-2 text-cyan-400">6</div>
              <div className="text-sm text-gray-400">Practice Classes</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-xl border border-pink-500/20 bg-pink-500/5 text-center cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setShowPersonalityShowcase(true)}
            >
              <div className="text-4xl mb-2 text-pink-400">4</div>
              <div className="text-sm text-gray-400">AI Personalities</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-xl border border-purple-500/20 bg-purple-500/5 text-center"
            >
              <div className="text-4xl mb-2 text-purple-400">∞</div>
              <div className="text-sm text-gray-400">Skill Tokens</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Master AI Collaboration?</h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Join thousands of learners practicing real-world AI problem-solving skills.
        </p>
        <Link href="/onboarding">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-bold uppercase tracking-wide shadow-lg"
          >
            Start Learning Now
          </motion.button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>Your conversations are processed locally. No data stored permanently.</p>
        <div className="mt-2 space-x-4">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
        </div>
        <p className="mt-4">Powered by OpenAI GPT-4</p>
      </footer>
    </main>
  );
}

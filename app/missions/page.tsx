import Link from 'next/link';
import { Target, Clock, Award, ArrowRight } from 'lucide-react';
import { missions } from '../lib/data/missions';

const difficultyColors: Record<string, string> = {
  'Easy': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Easy-Medium': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'Medium': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  'Medium-Hard': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Hard': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'Expert': 'bg-pink-500/20 text-pink-400 border-pink-500/30'
};

export default function MissionsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-cyan-400/20 flex items-center justify-center border border-cyan-400/30">
              <Target className="w-6 h-6 text-cyan-400" />
            </div>
            <p className="text-cyan-400 text-sm uppercase tracking-[0.3em]">Training Ground</p>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-6">
            Training <span className="text-gradient">Missions</span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mb-8">
            Master 10 essential prompting skills through hands-on missions. Each mission teaches you to prompt your way out of real problems.
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <Award className="w-4 h-4" /> {missions.length} Missions
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" /> 50-80 min total
            </span>
          </div>
        </div>
      </section>

      {/* Missions Grid */}
      <section className="py-8 px-4 pb-32">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          {missions.map((mission, index) => (
            <Link key={mission.id} href={`/mission/${mission.id}`}>
              <div className="group p-6 glass rounded-3xl hover:border-cyan-400/50 transition-all h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-black text-white/10 group-hover:text-white/20 transition-colors">
                      {String(mission.id).padStart(2, '0')}
                    </span>
                    <span className={`text-xs uppercase tracking-wider px-3 py-1 rounded-full border ${difficultyColors[mission.difficultyLabel]}`}>
                      {mission.difficultyLabel}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {mission.estimatedTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                  {mission.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4">{mission.description}</p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                  <span className="text-sm text-gray-500">{mission.skill}</span>
                  <span className="flex items-center gap-1 text-cyan-400 text-sm group-hover:translate-x-1 transition-transform">
                    Start <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

'use client';

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Send, 
  Target, 
  MessageSquare, 
  Lightbulb,
  CheckCircle2,
  Sparkles,
  ChevronRight
} from "lucide-react";
import { challenges } from "../../lib/data/challenges";

// AI Partner personalities for challenges
const aiPartners = [
  {
    id: "skeptic",
    name: "The Skeptic",
    description: "Questions assumptions and pushes for clarity",
    color: "#FF006E",
    greeting: "I'll help you work through this, but I won't let you take shortcuts. Tell me what you're really trying to solve."
  },
  {
    id: "optimist",
    name: "The Optimist", 
    description: "Encourages exploration and creative solutions",
    color: "#00F0FF",
    greeting: "This is a great challenge to tackle! Let's brainstorm some approaches together."
  },
  {
    id: "literalist",
    name: "The Literalist",
    description: "Focuses on precision and concrete steps",
    color: "#8B5CF6",
    greeting: "Let's break this down systematically. What exactly are you working with?"
  }
];

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function ChallengePracticePage() {
  const params = useParams();
  const challengeId = params?.id as string;
  const challenge = challenges.find(c => c.id === challengeId);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [selectedPartner, setSelectedPartner] = useState(aiPartners[0]);
  const [hasStarted, setHasStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize with AI greeting
  useEffect(() => {
    if (challenge && !hasStarted) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: `**${selectedPartner.greeting}**

**Challenge:** ${challenge.title}

${challenge.description}

How would you like to approach this?`,
          timestamp: new Date()
        }
      ]);
      setHasStarted(true);
    }
  }, [challenge, selectedPartner, hasStarted]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Simulate AI response (in real app, this would call an API)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateAIResponse(input, selectedPartner.id),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const generateAIResponse = (userInput: string, partnerId: string) => {
    // Placeholder responses based on partner personality
    const responses: Record<string, string[]> = {
      skeptic: [
        "That's one approach, but have you considered the edge cases? What happens when...",
        "I see what you're getting at, but I'm not convinced yet. Can you provide a specific example?",
        "That's a common pattern, but it might not fit here. Let's question that assumption."
      ],
      optimist: [
        "I like where you're going with this! Have you thought about taking it even further?",
        "That's creative! What other angles could we explore here?",
        "Great thinking! This could really work. Let's build on that idea."
      ],
      literalist: [
        "Let's break this down into concrete steps. First...",
        "I need more specifics. Can you give me an exact example?",
        "That makes sense logically. Let me outline the precise sequence..."
      ]
    };
    
    const partnerResponses = responses[partnerId] || responses.skeptic;
    return partnerResponses[Math.floor(Math.random() * partnerResponses.length)];
  };

  if (!challenge) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-lg mb-4">Challenge not found</p>
          <Link 
            href="/challenges"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Challenges
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/challenges"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Challenges
            </Link>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">Practicing:</span>
              <span className="text-sm font-medium text-pink-500">{challenge.title}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="pt-20 pb-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Sidebar - Challenge Info & AI Partner */}
            <div className="lg:col-span-1 space-y-6">
              {/* Challenge Card */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-pink-500" />
                  <span className="text-xs uppercase tracking-wider text-pink-500">Challenge</span>
                </div>
                <h1 className="text-xl font-bold mb-3">{challenge.title}</h1>
                <p className="text-gray-400 text-sm mb-4">{challenge.description}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.tags.map(tag => (
                    <span 
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full bg-white/5 text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI Partner Selector */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  <span className="text-xs uppercase tracking-wider text-cyan-400">AI Partner</span>
                </div>
                
                <div className="space-y-3">
                  {aiPartners.map(partner => (
                    <button
                      key={partner.id}
                      onClick={() => {
                        setSelectedPartner(partner);
                        // Add system message about partner change
                        setMessages(prev => [
                          ...prev,
                          {
                            id: Date.now().toString(),
                            role: "assistant",
                            content: `*Switches to ${partner.name} personality.*\n\n${partner.greeting}`,
                            timestamp: new Date()
                          }
                        ]);
                      }}
                      className={`w-full p-4 rounded-xl text-left transition-all border ${
                        selectedPartner.id === partner.id
                          ? 'border-cyan-400/50 bg-cyan-400/10'
                          : 'border-white/5 hover:border-white/20 bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: partner.color }}
                        />
                        <span className="font-medium">{partner.name}</span>
                      </div>
                      <p className="text-sm text-gray-400">{partner.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
                  <span className="text-xs uppercase tracking-wider text-yellow-400">Tips</span>
                </div>
                <ul className="space-y-3 text-sm text-gray-400">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-cyan-400 flex-shrink-0" />
                    <span>Be specific about your context and constraints</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-cyan-400 flex-shrink-0" />
                    <span>Push back if the AI's suggestions don't fit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 mt-0.5 text-cyan-400 flex-shrink-0" />
                    <span>Ask for alternatives when stuck</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Main Chat Area */}
            <div className="lg:col-span-2">
              <div className="glass rounded-2xl overflow-hidden min-h-[600px] flex flex-col">
                {/* Messages */}
                <div className="flex-1 p-6 space-y-6 overflow-y-auto max-h-[600px]">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-4 ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {message.role === "assistant" && (
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ 
                            backgroundColor: `${selectedPartner.color}20`,
                            border: `1px solid ${selectedPartner.color}40`
                          }}
                        >
                          <MessageSquare 
                            className="w-5 h-5" 
                            style={{ color: selectedPartner.color }}
                          />
                        </div>
                      )}
                      
                      <div 
                        className={`max-w-[80%] p-4 rounded-2xl ${
                          message.role === "user"
                            ? "bg-cyan-400/20 text-white border border-cyan-400/30"
                            : "bg-white/5 text-gray-200 border border-white/10"
                        }`}
                      >
                        <div className="prose prose-invert prose-sm max-w-none">
                          {message.content.split('\n').map((line, i) => (
                            <p key={i} className={line.startsWith('**') ? 'font-bold text-white mb-2' : 'mb-2'}>
                              {line.replace(/\*\*/g, '')}
                            </p>
                          ))}
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-white/10 bg-black/20">
                  <div className="flex gap-3">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSend();
                        }
                      }}
                      placeholder="Type your message..."
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 resize-none"
                      rows={2}
                    />
                    <button
                      onClick={handleSend}
                      disabled={!input.trim()}
                      className="px-6 py-3 bg-cyan-400/20 text-cyan-400 rounded-xl font-medium hover:bg-cyan-400/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
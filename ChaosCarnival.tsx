import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Zap, Skull, Flame, Star, Trophy, AlertCircle, PartyPopper } from 'lucide-react';

// FAKE PRODUCTS FOR ABSURD ADS
const FAKE_ADS = [
  { title: "OXYGEN 2.0", tagline: "Now with 30% more breathing!", price: "$999/breath" },
  { title: "Premium Button Clicking", tagline: "Click buttons FASTER", price: "$49.99/click" },
  { title: "Certified Procrastination", tagline: "Professional time-wasting license", price: "FREE (your soul)" },
  { title: "Digital Regret Insurance", tagline: "Cover all your bad decisions", price: "$0.01/regret" },
  { title: "Anxiety Pro Max", tagline: "Upgrade your worries today", price: "3 payments of $13.37" },
  { title: "Existential Crisis DLC", tagline: "New questions. No answers.", price: "Your peace of mind" },
];

// CHAOTIC BUTTON ACTIONS
const BUTTON_ACTIONS = [
  { text: "DO NOT CLICK", emoji: "🚫" },
  { text: "MYSTERY BUTTON", emoji: "❓" },
  { text: "REGRET GENERATOR", emoji: "😭" },
  { text: "CHAOS LEVER", emoji: "🎰" },
  { text: "VOID PORTAL", emoji: "🕳️" },
  { text: "DISAPPOINTMENT", emoji: "💀" },
  { text: "BAD IDEA BUTTON", emoji: "💡" },
  { text: "SUFFER BUTTON", emoji: "🔥" },
];

// RANDOM OUTPUTS FOR AI-STYLE CHAOS
const AI_ROASTS = [
  "AI ANALYSIS: You have the decision-making skills of a goldfish with amnesia.",
  "SYSTEM REPORT: 87% chance you're avoiding something important right now.",
  "AI VERDICT: This is literally the worst possible use of your time. Impressive.",
  "NEURAL NET SAYS: Your productivity score just divided by zero.",
  "DEEP LEARNING RESULT: You clicked a button. Revolutionary. Groundbreaking. Useless.",
  "AI PREDICTION: You will click again. And again. And you'll hate yourself for it.",
  "MACHINE LEARNING: I've analyzed 10,000 clicks. Conclusion: Why?",
  "GPT-INFINITY: Even I don't understand why you're here.",
];

const FAKE_ACHIEVEMENTS = [
  "🏆 MASTER PROCRASTINATOR - Wasted 5 minutes",
  "⭐ CHRONIC CLICKER - 10 pointless clicks",
  "💀 VOID GAZER - Stared into nothingness",
  "🎪 CARNIVAL VICTIM - Fell for everything",
  "🤡 CERTIFIED FOOL - No explanation needed",
  "👑 TIME MURDERER - Killed 60 seconds",
  "🔥 CHAOS CHAMPION - Embraced the madness",
  "💸 MONEY WASTER - Almost bought Oxygen 2.0",
];

const FAKE_NEWS = [
  "BREAKING: Local person wastes time on weird website, more at 11",
  "SCIENTISTS DISCOVER: Clicking buttons doesn't solve problems",
  "STUDY SHOWS: 100% of users regret being here",
  "EXPERTS WARN: This app may cause existential dread",
  "SHOCKING: Man discovers productivity by leaving this site",
  "INVESTIGATION: Why are you still reading this?",
];

const MEME_PHRASES = [
  "no thoughts, head empty",
  "this is fine 🔥",
  "I am in danger",
  "why are we here, just to suffer?",
  "congratulations, you played yourself",
  "task failed successfully",
  "we do a little trolling",
  "you weren't supposed to do that",
];

interface Meme {
  id: number;
  text: string;
  x: number;
  y: number;
  rotation: number;
  emoji: string;
}

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  emoji: string;
}

export default function ChaosCarnival() {
  const [clicks, setClicks] = useState(0);
  const [currentRoast, setCurrentRoast] = useState("");
  const [showAd, setShowAd] = useState(false);
  const [currentAd, setCurrentAd] = useState(FAKE_ADS[0]);
  const [achievement, setAchievement] = useState("");
  const [newsHeadline, setNewsHeadline] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [glitchMode, setGlitchMode] = useState(false);
  const [floatingMemes, setFloatingMemes] = useState<Meme[]>([]);
  const [cursorEmoji, setCursorEmoji] = useState("👆");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [vibrating, setVibrating] = useState(false);
  const [randomColor, setRandomColor] = useState("purple");
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [currentButton, setCurrentButton] = useState(BUTTON_ACTIONS[0]);

  const audioRef = useRef(null);
  const colors = ["purple", "pink", "blue", "green", "red", "yellow", "orange"];
  const emojis = ["🤡", "💀", "🔥", "⭐", "💩", "🎪", "🎰", "👹", "🤯", "😵", "🌈"];

  // RANDOM COLOR CHAOS
  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];
  const getRandomEmoji = () => emojis[Math.floor(Math.random() * emojis.length)];

  // SPAWN FLOATING MEME
  const spawnMeme = () => {
    const meme = {
      id: Date.now(),
      text: MEME_PHRASES[Math.floor(Math.random() * MEME_PHRASES.length)],
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      rotation: Math.random() * 360,
      emoji: getRandomEmoji(),
    };
    setFloatingMemes(prev => [...prev, meme]);
    setTimeout(() => {
      setFloatingMemes(prev => prev.filter(m => m.id !== meme.id));
    }, 3000);
  };

  // CONFETTI EXPLOSION
  const explodeConfetti = () => {
    const pieces = Array.from({ length: 30 }, (_, i) => ({
      id: Date.now() + i,
      x: 50,
      y: 50,
      vx: (Math.random() - 0.5) * 20,
      vy: Math.random() * -15 - 5,
      color: getRandomColor(),
      emoji: getRandomEmoji(),
    }));
    setConfetti(pieces);
    setTimeout(() => setConfetti([]), 2000);
  };

  // MAIN CHAOS BUTTON HANDLER
  const handleChaosClick = () => {
    const newClicks = clicks + 1;
    setClicks(newClicks);
    setScore(score + Math.floor(Math.random() * 100));
    setStreak(streak + 1);

    // Change button randomly
    setCurrentButton(BUTTON_ACTIONS[Math.floor(Math.random() * BUTTON_ACTIONS.length)]);

    // Random effects based on RNG
    const chaos = Math.random();

    if (chaos < 0.15) {
      // Show absurd ad
      setCurrentAd(FAKE_ADS[Math.floor(Math.random() * FAKE_ADS.length)]);
      setShowAd(true);
      setTimeout(() => setShowAd(false), 4000);
    }

    if (chaos < 0.3) {
      // AI roast
      setCurrentRoast(AI_ROASTS[Math.floor(Math.random() * AI_ROASTS.length)]);
    }

    if (chaos < 0.4) {
      // Achievement unlock
      setAchievement(FAKE_ACHIEVEMENTS[Math.floor(Math.random() * FAKE_ACHIEVEMENTS.length)]);
      setTimeout(() => setAchievement(""), 3000);
    }

    if (chaos < 0.5) {
      // Fake news
      setNewsHeadline(FAKE_NEWS[Math.floor(Math.random() * FAKE_NEWS.length)]);
    }

    if (chaos < 0.6) {
      // Spawn floating meme
      spawnMeme();
    }

    if (chaos < 0.7) {
      // Color chaos
      setRandomColor(getRandomColor());
    }

    if (chaos < 0.8) {
      // Glitch mode
      setGlitchMode(true);
      setTimeout(() => setGlitchMode(false), 500);
    }

    if (chaos < 0.85) {
      // Confetti
      explodeConfetti();
    }

    // Always do these
    setSpinning(true);
    setVibrating(true);
    setCursorEmoji(getRandomEmoji());

    setTimeout(() => {
      setSpinning(false);
      setVibrating(false);
    }, 500);

    // Beep boop sounds (simulated)
    playSound();
  };

  // FAKE SOUND EFFECT
  const playSound = () => {
    const sounds = ['boop', 'beep', 'blop', 'bonk', 'bruh'];
    console.log(`🔊 ${sounds[Math.floor(Math.random() * sounds.length)]}`);
  };

  // Auto-spawn chaos periodically
  useEffect(() => {
    if (clicks > 5) {
      const interval = setInterval(() => {
        if (Math.random() < 0.3) spawnMeme();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [clicks]);

  // Confetti physics
  useEffect(() => {
    if (confetti.length > 0) {
      const interval = setInterval(() => {
        setConfetti(prev =>
          prev.map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.5,
          })).filter(p => p.y < 100)
        );
      }, 50);
      return () => clearInterval(interval);
    }
  }, [confetti]);

  return (
    <div className={`min-h-screen overflow-hidden relative ${vibrating ? 'animate-shake' : ''}`}
      style={{
        background: `radial-gradient(circle at ${50 + Math.sin(clicks) * 20}% ${50 + Math.cos(clicks) * 20}%, 
          rgb(0,0,0), rgb(20,0,40))`,
        cursor: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32'><text y='24' font-size='24'>${cursorEmoji}</text></svg>") 16 16, auto`,
      }}>

      {/* GLITCH OVERLAY */}
      {glitchMode && (
        <div className="fixed inset-0 z-50 pointer-events-none animate-glitch"
          style={{
            background: `repeating-linear-gradient(0deg, rgba(255,0,0,0.1) 0px, transparent 2px, rgba(0,255,0,0.1) 4px)`,
            mixBlendMode: 'difference',
          }} />
      )}

      {/* FLOATING MEMES */}
      {floatingMemes.map(meme => (
        <div
          key={meme.id}
          className="fixed z-30 pointer-events-none animate-float-away text-2xl font-black"
          style={{
            left: `${meme.x}%`,
            top: `${meme.y}%`,
            transform: `rotate(${meme.rotation}deg)`,
            textShadow: '0 0 20px rgba(255,255,255,0.8)',
          }}>
          <div className="text-white">{meme.emoji} {meme.text}</div>
        </div>
      ))}

      {/* CONFETTI */}
      {confetti.map(piece => (
        <div
          key={piece.id}
          className="fixed z-20 pointer-events-none text-3xl"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            transition: 'all 0.05s linear',
          }}>
          {piece.emoji}
        </div>
      ))}

      {/* ABSURD AD POPUP */}
      {showAd && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-md animate-scale-in">
          <div className="bg-gradient-to-br from-yellow-400 via-red-500 to-pink-600 p-1 rounded-2xl max-w-md mx-4 animate-pulse-rainbow">
            <div className="bg-black p-8 rounded-xl">
              <div className="text-6xl text-center mb-4 animate-spin-slow">🛒</div>
              <h3 className="text-4xl font-black text-yellow-400 mb-2 text-center uppercase tracking-wider">
                {currentAd.title}
              </h3>
              <p className="text-xl text-white mb-4 text-center italic">
                {currentAd.tagline}
              </p>
              <div className="text-3xl font-black text-green-400 text-center mb-6">
                {currentAd.price}
              </div>
              <button
                onClick={() => setShowAd(false)}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black py-4 rounded-lg hover:scale-105 transition-transform">
                BUY NOW (jk)
              </button>
              <p className="text-xs text-gray-500 text-center mt-4">
                *Not a real product. Nothing here is real.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ACHIEVEMENT NOTIFICATION */}
      {achievement && (
        <div className="fixed top-4 right-4 z-30 animate-slide-in">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-lg shadow-2xl border-4 border-yellow-300">
            <div className="text-xl font-black text-black flex items-center gap-2">
              <Trophy className="w-6 h-6" />
              ACHIEVEMENT UNLOCKED
            </div>
            <div className="text-lg text-black mt-1">{achievement}</div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">

        {/* CURSED HEADER */}
        <div className="text-center mb-8">
          <h1 className={`text-5xl md:text-8xl font-black mb-4 ${spinning ? 'animate-spin-crazy' : ''}`}
            style={{
              textShadow: `0 0 40px rgba(255,0,255,0.8), 0 0 80px rgba(0,255,255,0.6)`,
              fontFamily: 'Impact, sans-serif',
              transform: glitchMode ? 'scaleX(1.1) skewX(-5deg)' : 'none',
            }}>
            <span className={`text-transparent bg-clip-text bg-gradient-to-r from-${randomColor}-400 via-pink-500 to-blue-500 animate-gradient`}>
              THE VOID
            </span>
          </h1>
          <h2 className="text-3xl md:text-5xl font-black text-green-400 animate-pulse-slow">
            SCREAMS BACK™
          </h2>
          <p className="text-gray-400 mt-4 text-lg italic">
            Welcome to the most useless place on the internet
          </p>
        </div>

        {/* STATS DASHBOARD */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mb-8">
          <div className="bg-purple-900/30 border-2 border-purple-500 p-4 rounded-lg backdrop-blur-sm">
            <div className="text-purple-400 text-xs uppercase">Clicks</div>
            <div className="text-4xl font-black text-white">{clicks}</div>
          </div>
          <div className="bg-green-900/30 border-2 border-green-500 p-4 rounded-lg backdrop-blur-sm">
            <div className="text-green-400 text-xs uppercase">Score</div>
            <div className="text-4xl font-black text-white">{score}</div>
          </div>
          <div className="bg-red-900/30 border-2 border-red-500 p-4 rounded-lg backdrop-blur-sm">
            <div className="text-red-400 text-xs uppercase">Streak</div>
            <div className="text-4xl font-black text-white">{streak}</div>
          </div>
          <div className="bg-yellow-900/30 border-2 border-yellow-500 p-4 rounded-lg backdrop-blur-sm">
            <div className="text-yellow-400 text-xs uppercase">Regret</div>
            <div className="text-4xl font-black text-white">∞</div>
          </div>
        </div>

        {/* MEGA CHAOS BUTTON */}
        <button
          onClick={handleChaosClick}
          className={`
            relative group
            w-full max-w-xl h-64
            bg-gradient-to-br from-purple-600 via-pink-600 to-red-600
            rounded-3xl
            border-8 border-white
            shadow-[0_0_80px_rgba(255,0,255,0.8)]
            hover:shadow-[0_0_150px_rgba(255,0,255,1)]
            transform hover:scale-110 active:scale-90
            transition-all duration-300
            ${spinning ? 'animate-spin-360' : ''}
            ${glitchMode ? 'animate-glitch-severe' : ''}
          `}>
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-green-500 to-blue-600 opacity-0 group-hover:opacity-50 rounded-3xl animate-pulse-fast" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center gap-4 p-8">
            <span className="text-7xl animate-bounce">{currentButton.emoji}</span>
            <span className="text-3xl md:text-5xl font-black text-white text-center drop-shadow-2xl uppercase tracking-wider">
              {currentButton.text}
            </span>
          </div>
        </button>

        {/* AI ROAST OUTPUT */}
        {currentRoast && (
          <div className="w-full max-w-2xl mt-8 animate-scale-in">
            <div className="bg-black/90 border-4 border-cyan-400 p-6 rounded-lg backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 animate-loading" />
              <div className="flex items-start gap-3">
                <Zap className="w-8 h-8 text-cyan-400 animate-pulse" />
                <div>
                  <div className="text-cyan-400 text-xs uppercase tracking-wider mb-2 font-bold">
                    🤖 AI-POWERED ANALYSIS
                  </div>
                  <p className="text-white text-xl font-bold leading-relaxed">
                    {currentRoast}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FAKE NEWS TICKER */}
        {newsHeadline && (
          <div className="w-full max-w-4xl mt-6 animate-slide-in">
            <div className="bg-red-600 p-4 rounded-lg border-2 border-white">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-white animate-pulse" />
                <p className="text-white font-bold text-lg uppercase">
                  {newsHeadline}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* FOOTER CHAOS */}
        <footer className="mt-12 text-center">
          <p className="text-gray-600 text-sm mb-2 italic">
            This app is certified 100% useless by the International Bureau of Pointlessness
          </p>
          <p className="text-gray-700 text-xs">
            No productivity was harmed in the making of this website (because there was none)
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Sparkles className="w-5 h-5 text-purple-500 animate-pulse" />
            <Flame className="w-5 h-5 text-orange-500 animate-bounce" />
            <Skull className="w-5 h-5 text-white animate-pulse" />
          </div>
        </footer>
      </div>

      {/* CHAOS ANIMATIONS */}
      <style>{`
        @keyframes shake { 
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-10px, 5px) rotate(-2deg); }
          50% { transform: translate(10px, -5px) rotate(2deg); }
          75% { transform: translate(-5px, 10px) rotate(-1deg); }
        }
        @keyframes glitch {
          0%, 100% { transform: translate(0); filter: hue-rotate(0deg); }
          25% { transform: translate(-5px, 5px); filter: hue-rotate(90deg); }
          50% { transform: translate(5px, -5px); filter: hue-rotate(180deg); }
          75% { transform: translate(-5px, -5px); filter: hue-rotate(270deg); }
        }
        @keyframes glitch-severe {
          0%, 100% { transform: translate(0) scale(1); }
          10% { transform: translate(-20px, 10px) scale(1.1); }
          20% { transform: translate(20px, -10px) scale(0.9); }
          30% { transform: translate(-10px, -20px) scale(1.05); }
          40% { transform: translate(10px, 20px) scale(0.95); }
          50% { transform: translate(-15px, 5px) scale(1.1); }
          60% { transform: translate(15px, -5px) scale(0.9); }
          70% { transform: translate(-5px, -15px) scale(1.05); }
          80% { transform: translate(5px, 15px) scale(0.95); }
          90% { transform: translate(-10px, 10px) scale(1.02); }
        }
        @keyframes spin-360 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-crazy {
          from { transform: rotate(0deg) scale(1); }
          to { transform: rotate(720deg) scale(1.2); }
        }
        @keyframes float-away {
          0% { opacity: 1; transform: translateY(0) scale(1) rotate(0deg); }
          100% { opacity: 0; transform: translateY(-200px) scale(1.5) rotate(360deg); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(100px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulse-rainbow {
          0%, 100% { filter: hue-rotate(0deg); }
          50% { filter: hue-rotate(360deg); }
        }
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes pulse-fast {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .animate-glitch { animation: glitch 0.3s ease-in-out infinite; }
        .animate-glitch-severe { animation: glitch-severe 0.5s ease-in-out; }
        .animate-spin-360 { animation: spin-360 1s ease-in-out; }
        .animate-spin-crazy { animation: spin-crazy 0.5s ease-out; }
        .animate-float-away { animation: float-away 3s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.3s ease-out; }
        .animate-slide-in { animation: slide-in 0.5s ease-out; }
        .animate-pulse-rainbow { animation: pulse-rainbow 2s linear infinite; }
        .animate-loading { animation: loading 2s ease-in-out infinite; }
        .animate-gradient { animation: gradient 3s ease infinite; background-size: 200% 200%; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-pulse-fast { animation: pulse-fast 0.5s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
      `}</style>
    </div>
  );
}
import { useState } from 'react';
import { Mail, CheckCircle, Shield, Gift, Sparkles, Bell, Zap, Users } from 'lucide-react';

const FreeUpdates = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => setSubmitted(true))
      .catch((error) => alert(error))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 text-cyan-400 font-medium text-sm animate-fade-in">
            <Sparkles size={16} />
            <span>Join 10,000+ Creators</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-purple-200 leading-tight">
            Get Free AI Tools, <br className="hidden md:block" />
            Credits & Premium Updates
          </h1>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Join thousands of creators using <span className="text-white font-semibold">Fusion Tools AI</span> to work faster and smarter.
          </p>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm md:text-base text-gray-300 mt-8">
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
              <Sparkles className="text-yellow-400" size={18} />
              <span>Early access to tools</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
              <Gift className="text-purple-400" size={18} />
              <span>Free credits & unlocks</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
              <Zap className="text-cyan-400" size={18} />
              <span>Productivity workflows</span>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Capture Form Section */}
      <section className="max-w-2xl mx-auto px-4 -mt-4 mb-20 relative z-10">
        <div className="bg-[#0b1221] border border-gray-800 p-6 md:p-8 rounded-2xl shadow-2xl shadow-cyan-900/20">
          
          {/* Success Message or Form */}
          {submitted ? (
            <div className="text-center py-8 animate-fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-400 mb-6 border border-green-500/30">
                <CheckCircle size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">You're in! 🎉</h2>
              <p className="text-gray-400 mb-8 max-w-sm mx-auto">
                Check your inbox for a welcome email and your first free resource.
              </p>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-400">
                <p>While you wait, why not try our <a href="/caption" className="text-cyan-400 hover:underline">Caption Generator</a>?</p>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Free Newsletter</p>
                <h2 className="text-xl font-bold text-white">Join the Inner Circle</h2>
              </div>

              <iframe 
                src="https://docs.google.com/forms/d/e/1FAIpQLSdj01MDDDhpQ2-VLKwlI3qAZBAvFlVM9sjEMwqRnZOC-E22TQ/viewform?embedded=true" 
                width="100%" 
                height="500" 
                frameBorder="0" 
                marginHeight="0" 
                marginWidth="0"
                title="Join Inner Circle"
                className="filter invert-[.95] hue-rotate-180 rounded-xl"
              >
                Loading…
              </iframe>
            </>
          )}
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-12 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Join Free Updates?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
              <div className="p-3 bg-cyan-500/10 rounded-lg h-fit text-cyan-400">
                <Bell size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">First to Know</h3>
                <p className="text-gray-400 text-sm">Be the first to know when new AI tools launch before they go public.</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
              <div className="p-3 bg-purple-500/10 rounded-lg h-fit text-purple-400">
                <Gift size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Exclusive Perks</h3>
                <p className="text-gray-400 text-sm">Get access to free credits, premium features, and special unlocks.</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
              <div className="p-3 bg-green-500/10 rounded-lg h-fit text-green-400">
                <Sparkles size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Learn & Grow</h3>
                <p className="text-gray-400 text-sm">Learn smart ways to use AI for work, study, and creative growth.</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors">
              <div className="p-3 bg-orange-500/10 rounded-lg h-fit text-orange-400">
                <Users size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Beta Access</h3>
                <p className="text-gray-400 text-sm">Test drive new features and influence the roadmap.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex flex-col items-center gap-2">
             <div className="flex -space-x-4 mb-4">
                {[
                  "https://randomuser.me/api/portraits/women/44.jpg",
                  "https://randomuser.me/api/portraits/men/32.jpg", 
                  "https://randomuser.me/api/portraits/women/68.jpg",
                  "https://randomuser.me/api/portraits/men/86.jpg",
                  "https://randomuser.me/api/portraits/women/17.jpg"
                ].map((src, i) => (
                  <div key={i} className="relative w-10 h-10 rounded-full border-2 border-[#0f172a] overflow-hidden">
                    <img src={src} alt="User" className="w-full h-full object-cover" />
                  </div>
                ))}
            </div>
            <p className="text-xl font-medium">Trusted by <span className="text-white font-bold">10,000+ creators</span> worldwide</p>
            <p className="text-sm text-gray-400">Students • Developers • Marketers • Founders</p>
          </div>
        </div>
      </section>

      {/* Bonus Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto rounded-3xl p-8 md:p-12 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-cyan-900/40 opacity-50"></div>
          <div className="absolute inset-0 border border-white/10 rounded-3xl"></div>
          
          <div className="relative z-10 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Gift size={12} /> Subscriber Bonus
            </div>
            <h2 className="text-3xl font-bold text-white">Unlock the AI Starter Pack</h2>
            <p className="text-gray-300 max-w-lg mx-auto">
              All new subscribers get a free <span className="text-white font-semibold">Premium AI Prompt Pack</span> + early invites to our next big feature release.
            </p>
            <div className="pt-4">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-8 py-3 rounded-full bg-white text-gray-900 font-bold hover:bg-gray-100 transition-colors">
                Claim My Bonus
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Info */}
      <section className="py-8 text-center text-gray-600 text-sm border-t border-white/5">
        <div className="flex justify-center gap-6 mb-4">
            <span className="flex items-center gap-1"><Shield size={14} /> We never sell your data</span>
            <span className="flex items-center gap-1"><Users size={14} /> No spam, ever</span>
            <span className="flex items-center gap-1"><CheckCircle size={14} /> Unsubscribe in one click</span>
        </div>
      </section>
    </div>
  );
};

export default FreeUpdates;

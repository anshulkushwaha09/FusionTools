import { useState, useEffect } from 'react';
import { Mail, X, CheckCircle, Sparkles } from 'lucide-react';

const LeadCapture = ({ variant = "default" }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Check subscription status on mount
  useEffect(() => {
    const subscribed = localStorage.getItem('hasSubscribed');
    if (subscribed) {
      setIsSubscribed(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  const handleSubscribe = () => {
    // In a real iframe scenario, we can't easily know when they submit.
    // For this UX, we'll assume if they interact/click "I'm interested" they might have.
    // However, the prompt asks for "Unsubscribe anytime" inside the form context.
    // Since we can't detect Google Form submission cross-origin, we will provide a manual "I've Subscribed" button
    // or simply rely on the user closing it if they are done. 
    // To meet requirement 6 ("If true: Show text 'Thanks...'"), we might add a manual toggle 
    // or just checking if they clicked a "Done" button if we add one.
    // For now, we'll auto-mark as subscribed if they explicitly say so or we can't track it.
    // Let's add a "Mark as Subscribed" small link or button for improved UX if the user wants to hide it permanently.
  };
  
  const markAsSubscribed = () => {
      localStorage.setItem('hasSubscribed', 'true');
      setIsSubscribed(true);
  };

  if (!isVisible && !isSubscribed) return null;

  // If subscribed, we can either hide it or show a thank you message.
  // Requirement 6 says: "Show text: 'Thanks for supporting FusionTools ❤️'"
  if (isSubscribed) {
      if (variant === "tool-output") {
          return (
            <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 text-center">
                <p className="text-green-400 font-medium flex items-center justify-center gap-2">
                    <CheckCircle size={18} /> Thanks for supporting Fusion Tools AI ❤️
                </p>
            </div>
          );
      }
      return null; // Hide completely in other contexts to be non-intrusive
  }

  // Styles based on variant
  const containerClasses = variant === "hero" 
    ? "bg-gradient-to-b from-[#0e1629] to-[#0a0f1a] border-[#bc13fe]/20" 
    : "bg-gradient-to-r from-[#0e1629] to-[#0a0f1a] border-white/10";

  return (
    <div className={`relative w-full max-w-3xl mx-auto mt-8 p-1 rounded-2xl bg-gradient-to-r from-[#00f3ff] to-[#bc13fe] shadow-[0_0_40px_rgba(188,19,254,0.1)] hover:shadow-[0_0_60px_rgba(0,243,255,0.2)] transition-shadow duration-500 group`}>
      <div className={`relative rounded-xl p-6 md:p-8 h-full border border-white/5 ${containerClasses}`}>
        
        {/* Close Button (Optional based on variant, but user asked for "Maximize conversions without annoying users") */}
        <button 
            onClick={handleDismiss}
            className="absolute top-2 right-2 p-2 text-gray-500 hover:text-white transition-colors"
            title="Dismiss"
        >
            <X size={16} />
        </button>

        <div className="flex flex-col md:flex-row gap-8 items-center">
            
            {/* Text Content */}
            <div className="flex-1 space-y-4 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[#00f3ff]">
                    <Sparkles size={12} /> Free Premium Access
                </div>
                <h3 className="text-2xl font-bold text-white">
                    🎁 Get Free AI Tools & Premium Updates
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                    Join <span className="text-white font-medium">10,000+ creators</span> using Fusion Tools AI to work smarter. Get notified about new tools, free credits, and pro tips.
                </p>
                <div className="flex items-center justify-center md:justify-start gap-4 text-xs text-gray-500 mt-2">
                    <span className="flex items-center gap-1"><CheckCircle size={12} className="text-green-500" /> No spam</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><CheckCircle size={12} className="text-green-500" /> Unsubscribe anytime</span>
                </div>
                
                <button 
                    onClick={markAsSubscribed}
                    className="text-xs text-gray-600 hover:text-gray-400 underline underline-offset-2 transition-colors"
                >
                    Already joined? Hide this.
                </button>
            </div>

            {/* Google Form Iframe */}
                 <iframe 
                    src="https://docs.google.com/forms/d/e/1FAIpQLSdj01MDDDhpQ2-VLKwlI3qAZBAvFlVM9sjEMwqRnZOC-E22TQ/viewform?embedded=true" 
                    width="100%" 
                    height="320" 
                    frameBorder="0" 
                    marginHeight="0" 
                    marginWidth="0"
                    title="Newsletter Signup"
                    className="filter invert-[.95] hue-rotate-180" // Dark mode hack for Google Forms
                    style={{ background: 'transparent' }}
                 >
                    Loading…
                 </iframe>
                 <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
            </div>

        </div>
      </div>
  );
};

export default LeadCapture;

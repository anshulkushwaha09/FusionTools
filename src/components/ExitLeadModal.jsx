import { useState, useEffect } from 'react';
import { X, Sparkles, ArrowRight } from 'lucide-react';

const ExitLeadModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    // Check local storage
    const subscribed = localStorage.getItem('hasSubscribed');
    if (subscribed) {
      setIsSubscribed(true);
      return;
    }

    const modalSeen = sessionStorage.getItem('exitModalSeen');
    if (modalSeen) {
      setHasTriggered(true);
      return;
    }

    // Desktop: Mouse Leave Logic
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !hasTriggered && !isOpen) {
        triggerModal();
      }
    };

    // Mobile: Timer Logic
    const mobileTimer = setTimeout(() => {
        if (window.innerWidth < 768 && !hasTriggered && !isOpen) {
            triggerModal();
        }
    }, 60000); // 60 seconds

    // Custom Event for Manual Open
    const handleManualOpen = () => {
        setIsOpen(true);
    };
    window.addEventListener('open-lead-modal', handleManualOpen);

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('open-lead-modal', handleManualOpen);
      clearTimeout(mobileTimer);
    };
  }, [hasTriggered, isOpen, isSubscribed]);

  const triggerModal = () => {
    setIsOpen(true);
    setHasTriggered(true);
    sessionStorage.setItem('exitModalSeen', 'true');
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const markAsSubscribed = () => {
    localStorage.setItem('hasSubscribed', 'true');
    setIsSubscribed(true);
    setIsOpen(false);
  };

  if (!isOpen || isSubscribed) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeModal}
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-[#0e1629] border border-[#bc13fe]/30 rounded-2xl shadow-[0_0_50px_rgba(188,19,254,0.3)] transform transition-all scale-100 overflow-hidden">
        
        {/* Decorative Gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00f3ff] to-[#bc13fe]"></div>

        <button 
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-1"
        >
            <X size={20} />
        </button>

        <div className="p-8 space-y-6 text-center">
            
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-[#00f3ff]/20 to-[#bc13fe]/20 flex items-center justify-center border border-white/10 ring-1 ring-white/5">
                <Sparkles className="text-[#00f3ff] fill-[#00f3ff]" size={32} />
            </div>

            <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white">Wait! Before you go...</h2>
                <p className="text-gray-400">
                    Want to get the latest AI tools delivered straight to your inbox? 
                    Join 10,000+ creators level up their workflow.
                </p>
            </div>

            {/* Embed or Simple CTA */}
            <div className="w-full h-[200px] overflow-hidden rounded-xl bg-white/5 border border-white/10 relative">
               <iframe 
                  src="https://docs.google.com/forms/d/e/1FAIpQLSfD_YOUR_FORM_ID/viewform?embedded=true" 
                  width="100%" 
                  height="250" 
                  frameBorder="0" 
                  className="filter invert-[.95] hue-rotate-180 -mt-2"
                  title="Exit Popup Form"
               >
                  Loading...
               </iframe>
            </div>

            <div className="flex flex-col gap-3">
                <button 
                    onClick={markAsSubscribed}
                    className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                >
                    No thanks, I'll miss out on updates
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ExitLeadModal;

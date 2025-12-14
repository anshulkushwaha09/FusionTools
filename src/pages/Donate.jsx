import { useState } from 'react';
import { 
  Heart, Coffee, Wallet, Zap, Star, ArrowRight, 
  Copy, Check, Divide, CreditCard, Smartphone, Globe 
} from 'lucide-react';
import Button from '../components/ui/Button';

const Donate = () => {
  const [selectedAmount, setSelectedAmount] = useState(5);
  const [copiedField, setCopiedField] = useState(null);

  // Configuration for Donation Addresses
  const donationInfo = {
    upi: "anshulkushwah092@axl",
    paypalMeHandle: "anshulkushwaha09", // REPLACE with your actual PayPal.me handle (e.g., 'johndoe')
    bmcUsername: "anshulkushwah",    // REPLACE with your Buy Me a Coffee username
  };

  const amounts = [3, 5, 10, 25];

  const handleCopy = (text, fieldId) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-10">
      
      {/* 1. Hero Section */}
      <div className="text-center space-y-6 pt-10">
        <div className="relative inline-block">
            <div className="absolute inset-0 bg-[#00f3ff] blur-xl opacity-20 animate-pulse"></div>
            <div className="relative inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-br from-[#00f3ff]/10 to-[#bc13fe]/10 border border-white/10 ring-1 ring-white/20 mb-4">
                <Heart className="w-10 h-10 text-[#bc13fe] fill-[#bc13fe] animate-[pulse_3s_ease-in-out_infinite]" />
            </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400 tracking-tight leading-tight">
          Support the <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#bc13fe]">Future of AI Tools</span>
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Fusion Tools AI is 100% free and ad-free. Your support directly funds the high-performance GPUs and API tokens that keep these tools running for everyone.
        </p>

        {/* Social Proof */}
        <div className="flex items-center justify-center gap-2 text-sm font-medium text-gray-500 bg-white/5 w-fit mx-auto px-4 py-2 rounded-full border border-white/5">
            <div className="flex -space-x-2">
                {[
                  "https://randomuser.me/api/portraits/women/42.jpg",
                  "https://randomuser.me/api/portraits/men/32.jpg",
                  "https://randomuser.me/api/portraits/women/15.jpg",
                  "https://randomuser.me/api/portraits/men/86.jpg",
                  "https://randomuser.me/api/portraits/women/64.jpg",
                ].map((src, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0a0f1a] overflow-hidden">
                      <img src={src} alt="Supporter" className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>
            <span><span className="text-white">150+ creators</span> support Fusion Tools monthly.</span>
        </div>
      </div>

      {/* 2. Impact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {[
            { icon: <Zap className="text-[#febd13]" />, title: "Keeps Tools Free", desc: "Covers the $500+ monthly API & server costs." },
            { icon: <RocketIcon className="text-[#00f3ff]" />, title: "Accelerates Dev", desc: "Helps us build Video & Agent tools faster." },
            { icon: <ShieldIcon className="text-[#bc13fe]" />, title: "100% Ad-Free", desc: "Ensures a clean, professional user experience." }
        ].map((item, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-2xl border border-white/5 bg-[#0e1629]/50 hover:bg-[#0e1629]/80 transition-all hover:-translate-y-1 hover:border-[#00f3ff]/30 group">
                <div className="mb-4 p-3 bg-white/5 w-fit rounded-xl group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
        ))}
      </div>

      {/* 3. Donation Amount Selector */}
      <div className="max-w-2xl mx-auto w-full px-4">
        <label className="block text-center text-sm font-medium text-gray-400 mb-4 uppercase tracking-wider">Select Contribution Amount</label>
        <div className="grid grid-cols-4 gap-4">
            {amounts.map((amount) => (
                <button 
                    key={amount}
                    onClick={() => setSelectedAmount(amount)}
                    className={`relative py-4 rounded-xl font-bold text-lg transition-all duration-300 border ${
                        selectedAmount === amount 
                        ? 'bg-gradient-to-r from-[#00f3ff] to-[#bc13fe] text-white border-transparent shadow-[0_0_20px_rgba(188,19,254,0.4)] scale-105' 
                        : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:border-white/20'
                    }`}
                >
                    ${amount}
                </button>
            ))}
        </div>
      </div>

      {/* 4. Donation Methods Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
        
        {/* Left Column: Easy Payments */}
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <CreditCard className="text-[#00f3ff]" /> Direct Support
            </h2>

            {/* Buy Me a Coffee */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-[#febd13]/50 transition-all group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#febd13]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative z-10 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                         <div className="p-3 bg-[#febd13]/20 text-[#febd13] rounded-xl">
                            <Coffee size={24} />
                         </div>
                         <div>
                             <h3 className="font-bold text-white">Buy Me a Coffee</h3>
                             <p className="text-xs text-gray-400">One-time donation via Card/PayPal</p>
                         </div>
                    </div>
                    <a 
                        href={`https://buymeacoffee.com/${donationInfo.bmcUsername}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-lg bg-[#febd13] text-black font-bold hover:bg-[#ffcd42] transition-colors"
                    >
                        Support ${selectedAmount}
                    </a>
                </div>
            </div>

            {/* PayPal & Patreon */}
            <div className="space-y-4">
                <a 
                    href={`https://paypal.me/${donationInfo.paypalMeHandle}/${selectedAmount}`}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="glass-panel p-4 rounded-xl border border-white/10 hover:border-[#003087]/50 hover:bg-[#003087]/10 transition-all flex items-center justify-center gap-3 group w-full"
                >
                    <Globe className="text-[#003087] group-hover:scale-110 transition-transform" />
                    <span className="font-bold text-white">Donate via PayPal ({selectedAmount} USD)</span>
                </a>

                <a href="#" className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-[#f96854]/50 transition-all group flex items-center justify-between">
                     <div className="flex items-center gap-4">
                         <div className="p-3 bg-[#f96854]/20 text-[#f96854] rounded-xl">
                            <Star size={24} />
                         </div>
                         <div>
                             <h3 className="font-bold text-white">Become a Patron</h3>
                             <p className="text-xs text-gray-400">Monthly support & exclusive updates</p>
                         </div>
                    </div>
                     <ArrowRight className="text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </a>
            </div>
        </div>

        {/* Right Column: Local & Crypto */}
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Smartphone className="text-[#00f3ff]" /> UPI Payment
            </h2>

            {/* UPI Section */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent">
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                    {/* QR Code */}
                    <div className="flex flex-col items-center justify-center w-48 h-48 bg-white p-2 rounded-xl shrink-0 overflow-hidden shadow-xl">
                        <img 
                            src="/images/upi_qr.png" 
                            alt="UPI QR Code" 
                            className="w-full h-full object-contain"
                        />
                    </div>

                    <div className="flex-grow space-y-4 w-full">
                        <div className="flex items-center gap-2 mb-2 justify-center sm:justify-start">
                             <div className="p-1.5 bg-green-500/20 text-green-500 rounded-lg">
                                <Smartphone size={16} />
                             </div>
                             <span className="font-bold text-white">UPI (India)</span>
                        </div>
                        
                        <p className="text-xs text-gray-400 mb-2 leading-relaxed">
                            Scan with GPay, PhonePe, Paytm, or copy the ID below. <br/>
                            <span className="text-[#00f3ff]">Direct Number: 8273693152</span>
                        </p>
                        
                        <div className="flex items-center gap-2 bg-black/40 p-3 rounded-xl border border-white/5 relative">
                            <code className="text-sm text-[#00f3ff] font-mono flex-grow px-2 truncate text-center sm:text-left">{donationInfo.upi}</code>
                            <button 
                                onClick={() => handleCopy(donationInfo.upi, 'upi')} 
                                className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors absolute right-2"
                            >
                                {copiedField === 'upi' ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

// Simple Icon Helpers
const RocketIcon = ({className}) => (
    <svg className={`w-6 h-6 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
);

const ShieldIcon = ({className}) => (
    <svg className={`w-6 h-6 ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
);

export default Donate;

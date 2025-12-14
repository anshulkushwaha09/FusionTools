import { ArrowRight, Sparkles, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import LeadCapture from '../components/LeadCapture';

const Home = () => {
  const features = [
    {
      title: "Caption Generator",
      desc: "Create viral social media captions in seconds.",
      icon: <Sparkles className="text-[#00f3ff]" size={32} />,
      link: "/caption",
      color: "from-[#00f3ff] to-[#00f3ff]"
    },
    {
      title: "Story Generator",
      desc: "Weave compelling narratives with AI assistance.",
      icon: <Zap className="text-[#bc13fe]" size={32} />,
      link: "/story",
      color: "from-[#bc13fe] to-[#bc13fe]"
    },
    {
      title: "Resume Builder",
      desc: "Craft professional resumes that stand out.",
      icon: <Shield className="text-[#00f3ff]" size={32} />,
      link: "/resume",
      color: "from-[#00f3ff] to-[#bc13fe]"
    },
    {
      title: "Grammar Fixer",
      desc: "Perfect your writing with instant corrections.",
      icon: <Sparkles className="text-[#bc13fe]" size={32} />,
      link: "/grammar",
      color: "from-[#bc13fe] to-[#00f3ff]"
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-6 max-w-3xl">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-[rgba(0,243,255,0.1)] border border-[rgba(0,243,255,0.2)] text-[#00f3ff] text-sm mb-4">
          <Sparkles size={14} className="mr-2" />
          Powered by Llama 3 & Groq
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
            Craft Perfect Text with
          </span>
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00f3ff] to-[#bc13fe]">
            AI Precision
          </span>
        </h1>
        
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Unlock your creative potential with our suite of free AI tools. 
          Generate stories, captions, resumes, and fix grammar instantly.
        </p>
        
        <div className="flex gap-4 justify-center pt-4">
          <Link 
            to="/story" 
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#00f3ff] to-[#bc13fe] text-white font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-[0_0_20px_rgba(0,243,255,0.3)]"
          >
            Start Creating <ArrowRight size={20} />
          </Link>
        </div>
      </div>

      {/* Hero Lead Capture */}
      <div className="w-full px-4 transform translate-y-[-20px]">
        <LeadCapture variant="hero" />
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {features.map((feature, index) => (
          <Link 
            key={index} 
            to={feature.link}
            className="glass-panel p-6 rounded-2xl hover:bg-[rgba(255,255,255,0.08)] transition-all duration-300 group border border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.2)]"
          >
            <div className={`w-12 h-12 rounded-xl bg-[rgba(255,255,255,0.05)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
            <p className="text-gray-400 text-sm">{feature.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;

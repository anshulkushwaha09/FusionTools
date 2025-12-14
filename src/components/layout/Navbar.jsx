import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ChevronDown, 
  Menu, 
  X, 
  Heart,
  FileText, 
  File, 
  Image as ImageIcon, 
  Briefcase,
  Wand2,
  BookOpen,
  User,
  CheckCircle,
  Minimize,
  FileType,
  Maximize,
  Scissors,
  Music,
  Receipt,
  Lightbulb,
  Type
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);


  const toolCategories = [
    {
      title: "Text Tools",
      icon: <FileText className="text-[#00f3ff]" size={20} />,
      items: [
        { name: "Caption Generator", link: "/caption", icon: <Wand2 size={16} /> },
        { name: "Story Generator", link: "/story", icon: <BookOpen size={16} /> },
        { name: "Resume Builder", link: "/resume", icon: <User size={16} /> },
        { name: "Grammar Fixer", link: "/grammar", icon: <CheckCircle size={16} /> }
      ]
    },
    {
      title: "PDF Tools",
      icon: <File className="text-[#bc13fe]" size={20} />,
      items: [
        { name: "Merge PDF", link: "/tools/merge-pdf", icon: <Minimize size={16} /> },
        { name: "PDF to Word", link: "/tools/pdf-to-word", icon: <FileType size={16} /> },
        { name: "Compress PDF", link: "/tools/compress-pdf", icon: <Maximize size={16} /> }
      ]
    },
    {
      title: "Image / Media",
      icon: <ImageIcon className="text-[#00f3ff]" size={20} />,
      items: [
        { name: "Remove Background", link: "/tools/remove-bg", icon: <Scissors size={16} /> },
        { name: "Image Upscaler", link: "/tools/image-upscaler", icon: <Maximize size={16} /> },
        { name: "Video to Audio", link: "/tools/video-audio", icon: <Music size={16} /> }
      ]
    },
    {
      title: "Business Tools",
      icon: <Briefcase className="text-[#bc13fe]" size={20} />,
      items: [
        { name: "Invoice Generator", link: "/tools/invoice", icon: <Receipt size={16} /> },
        { name: "Slogan Maker", link: "/tools/slogan", icon: <Type size={16} /> },
        { name: "Idea Generator", link: "/tools/business-ideas", icon: <Lightbulb size={16} /> }
      ]
    }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#0a0f1a]/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-[#00f3ff]/5">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Sparkles className="text-[#00f3ff] transition-transform group-hover:rotate-12 duration-500" size={24} />
              <div className="absolute inset-0 bg-[#00f3ff] blur-md opacity-20 animate-pulse"></div>
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-400 tracking-tight">
              Fusion Tools AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            
            {/* Dynamic Category Dropdowns */}
            {toolCategories.map((category, idx) => (
              <div 
                key={idx}
                className="relative group h-20 flex items-center"
                onMouseEnter={() => setActiveDropdown(category.title)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors font-medium py-2">
                  {category.title}
                  <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === category.title ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Content */}
                <AnimatePresence>
                  {activeDropdown === category.title && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 w-[280px] p-2 rounded-xl bg-[#0e1629]/95 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/50"
                    >
                      <div className="flex flex-col gap-1">
                        {category.items.map((item, itemIdx) => (
                          <Link 
                            key={itemIdx} 
                            to={item.link}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 text-gray-400 hover:text-[#00f3ff] transition-all group/item"
                          >
                            <span className="p-1.5 rounded-md bg-white/5 group-hover/item:bg-[#00f3ff]/10 transition-colors">
                              {item.icon}
                            </span>
                            <span className="text-sm font-medium text-white/90">{item.name}</span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Free Updates Trigger */}
            {/* Free Updates Link */}
            <Link 
                to="/free-updates"
                className="text-gray-400 hover:text-[#00f3ff] font-medium text-sm transition-colors"
            >
                Free Updates
            </Link>

            {/* Donate Button */}
            <Link 
              to="/donate"
              className="relative px-6 py-2.5 rounded-full bg-gradient-to-r from-[#00f3ff] to-[#bc13fe] text-white font-semibold flex items-center gap-2 hover:opacity-90 transition-all hover:scale-105 shadow-[0_0_20px_rgba(0,243,255,0.3)] group"
            >
              <span>Donate</span>
              <Heart size={16} className="fill-white group-hover:animate-bounce" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0d121f] border-b border-white/10 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 space-y-6">
              {toolCategories.map((category, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="flex items-center gap-2 text-[#00f3ff] font-medium">
                    {category.icon}
                    {category.title}
                  </div>
                  <div className="grid grid-cols-1 gap-2 pl-4 border-l border-white/10">
                    {category.items.map((item, itemIdx) => (
                      <Link 
                        key={itemIdx}
                        to={item.link}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 py-2 text-gray-400 hover:text-white"
                      >
                        {item.icon}
                        <span className="text-sm">{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="pt-4 border-t border-white/10 space-y-4">
                <Link 
                  to="/free-updates" 
                  onClick={() => setIsOpen(false)}
                  className="flex justify-center items-center gap-2 w-full py-3 rounded-xl bg-[#0e1629] border border-white/10 text-white font-bold hover:bg-white/5"
                >
                  <Sparkles size={18} className="text-[#00f3ff]" /> Free Updates
                </Link>
                <Link to="/donate" className="flex justify-center items-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-[#00f3ff] to-[#bc13fe] text-white font-bold">
                  Donate <Heart size={18} className="fill-white" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

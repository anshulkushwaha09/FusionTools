import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.1)] bg-[rgba(10,15,26,0.5)] backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} FusionTools AI. All rights reserved.
          </p>
          
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Made with</span>
            <Heart size={16} className="text-[#bc13fe] fill-[#bc13fe]" />
            <span>by Anshul Kushwaha</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

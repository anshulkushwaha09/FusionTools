import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import CaptionGenerator from './pages/CaptionGenerator';
import StoryGenerator from './pages/StoryGenerator';
import ResumeBuilder from './pages/ResumeBuilder';
import GrammarFixer from './pages/GrammarFixer';

// PDF Tools
import MergePdf from './pages/pdf/MergePdf';
import PdfToWord from './pages/pdf/PdfToWord';
import CompressPdf from './pages/pdf/CompressPdf';

// Media Tools
import RemoveBackground from './pages/media/RemoveBackground';
import ImageUpscaler from './pages/media/ImageUpscaler';
import VideoToAudio from './pages/media/VideoToAudio';

// Business Tools
import InvoiceGenerator from './pages/business/InvoiceGenerator';
import SloganMaker from './pages/business/SloganMaker';
import BusinessIdeas from './pages/business/BusinessIdeas';
import Donate from './pages/Donate';
import ExitLeadModal from './components/ExitLeadModal';
import FreeUpdates from './pages/FreeUpdates';

import { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.title = "Fusion Tools AI";
  }, []);

  return (
    <Router basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <div className="flex flex-col min-h-screen">
        <ExitLeadModal />
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 pt-24">
          <Routes>
            {/* Existing Tools */}
            <Route path="/" element={<Home />} />
            <Route path="/caption" element={<CaptionGenerator />} />
            <Route path="/story" element={<StoryGenerator />} />
            <Route path="/resume" element={<ResumeBuilder />} />
            <Route path="/grammar" element={<GrammarFixer />} />
            
            {/* PDF Tools */}
            <Route path="/tools/merge-pdf" element={<MergePdf />} />
            <Route path="/tools/pdf-to-word" element={<PdfToWord />} />
            <Route path="/tools/compress-pdf" element={<CompressPdf />} />

            {/* Media Tools */}
            <Route path="/tools/remove-bg" element={<RemoveBackground />} />
            <Route path="/tools/image-upscaler" element={<ImageUpscaler />} />
            <Route path="/tools/video-audio" element={<VideoToAudio />} />

            {/* Business Tools */}
            <Route path="/tools/invoice" element={<InvoiceGenerator />} />
            <Route path="/tools/slogan" element={<SloganMaker />} />
            <Route path="/tools/business-ideas" element={<BusinessIdeas />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/free-updates" element={<FreeUpdates />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

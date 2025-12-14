import { useState } from 'react';
import { MessageSquareText, Copy, RotateCcw, Check } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { generateCaptions } from '../services/groq';
import LeadCapture from '../components/LeadCapture';

const CaptionGenerator = () => {
  const [topic, setTopic] = useState('');
  const [captions, setCaptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    setError('');
    try {
      const results = await generateCaptions(topic);
      setCaptions(results);
    } catch (err) {
      setError("Failed to generate captions. Please check your API key.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 fade-in">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00f3ff] to-[#bc13fe]">
          Caption Generator
        </h1>
        <p className="text-gray-400">Instantly generate catchy captions for your social media.</p>
      </div>

      <Card>
        <div className="space-y-6">
          <Input 
            label="What's your post about?" 
            placeholder="e.g., A sunset at the beach, working from home, new product launch..." 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <Button 
            onClick={handleGenerate} 
            isLoading={loading} 
            className="w-full"
            icon={<MessageSquareText size={18} />}
          >
            Generate Captions
          </Button>
        </div>
      </Card>

      {captions.length > 0 && (
        <div className="space-y-4">
          {captions.map((caption, idx) => (
            <div 
              key={idx} 
              className="glass-panel p-4 rounded-xl flex justify-between items-center group hover:bg-[rgba(255,255,255,0.08)] transition-all"
            >
              <p className="text-gray-200">{caption}</p>
              <button 
                onClick={() => copyToClipboard(caption, idx)}
                className="p-2 rounded-lg hover:bg-[rgba(255,255,255,0.1)] text-gray-400 hover:text-[#00f3ff] transition-colors"
                title="Copy"
              >
                {copiedIndex === idx ? <Check size={18} /> : <Copy size={18} />}
              </button>
            </div>
          ))}
          <div className="flex justify-center pt-4">
            <Button variant="secondary" onClick={handleGenerate} icon={<RotateCcw size={18} />}>
              Regenerate
            </Button>
          </div>

          <div className="pt-4">
             <LeadCapture variant="tool-output" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CaptionGenerator;

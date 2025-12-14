import { useState } from 'react';
import { PenTool, Download, Copy, Check } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import ReactMarkdown from 'react-markdown';
import { generateStory } from '../services/groq';
import LeadCapture from '../components/LeadCapture';

const StoryGenerator = () => {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('dramatic');
  const [length, setLength] = useState(300);
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    setError('');
    try {
      const result = await generateStory(topic, tone, length);
      setStory(result);
    } catch (err) {
      setError("Failed to generate story. Please check your API key.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(story);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([story], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "story.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="container mx-auto max-w-4xl space-y-8 fade-in">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#bc13fe] to-[#00f3ff]">
          Story Generator
        </h1>
        <p className="text-gray-400">Weave compelling narratives with AI assistance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <Card title="Settings" icon={<PenTool size={20} />}>
            <div className="space-y-4">
              <Input 
                label="Story Topic" 
                placeholder="A robot discovering emotions..." 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                textarea
                rows={3}
              />
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300 ml-1">Tone</label>
                <select 
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.1)] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#bc13fe] appearance-none cursor-pointer"
                >
                  <option value="dramatic">Dramatic</option>
                  <option value="funny">Funny</option>
                  <option value="emotional">Emotional</option>
                  <option value="scary">Scary</option>
                  <option value="motivational">Motivational</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300 ml-1">Length: {length} words</label>
                <input 
                  type="range" 
                  min="100" 
                  max="1000" 
                  step="50" 
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-full accent-[#bc13fe]"
                />
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <Button 
                onClick={handleGenerate} 
                isLoading={loading} 
                className="w-full"
              >
                Write Story
              </Button>
            </div>
          </Card>
        </div>

        {/* Output */}
        <div className="lg:col-span-2">
          <Card className="h-full min-h-[500px] flex flex-col">
            <div className="flex justify-between items-center mb-4 border-b border-[rgba(255,255,255,0.1)] pb-2">
              <span className="text-gray-400 text-sm">Generated Story</span>
              <div className="flex gap-2">
                <button onClick={handleCopy} className="p-2 hover:bg-[rgba(255,255,255,0.1)] rounded-lg text-gray-400 transition-colors">
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
                <button onClick={handleDownload} className="p-2 hover:bg-[rgba(255,255,255,0.1)] rounded-lg text-gray-400 transition-colors">
                  <Download size={18} />
                </button>
              </div>
            </div>
            
            <div className="prose prose-invert prose-sm max-w-none flex-grow overflow-y-auto pr-2 custom-scrollbar">
              {story ? (
                <ReactMarkdown>{story}</ReactMarkdown>
              ) : (
                <div className="h-full flex items-center justify-center text-gray-600">
                  <p>Your story will appear here...</p>
                </div>
              )}
            </div>
          </Card>
          
          {story && <LeadCapture variant="tool-output" />}
        </div>
      </div>
    </div>
  );
};

export default StoryGenerator;

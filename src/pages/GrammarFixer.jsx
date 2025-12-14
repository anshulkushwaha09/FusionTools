import { useState } from 'react';
import { Wand2, Check, Copy, ArrowRight } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { fixGrammar } from '../services/groq';
import LeadCapture from '../components/LeadCapture';

const GrammarFixer = () => {
  const [text, setText] = useState('');
  const [fixedText, setFixedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleFix = async () => {
    if (!text) return;
    setLoading(true);
    setError('');
    try {
      const result = await fixGrammar(text);
      setFixedText(result);
    } catch (err) {
      setError("Failed to fix grammar. Please check your API key.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(fixedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto max-w-5xl space-y-8 fade-in">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#bc13fe] to-[#00f3ff]">
          Grammar Fixer
        </h1>
        <p className="text-gray-400">Polish your writing with AI-powered grammar correction.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input */}
        <div className="space-y-4">
          <Card title="Input Text" icon={<Wand2 size={20} />}>
            <Input 
              placeholder="Paste your text here to check grammar..." 
              value={text}
              onChange={(e) => setText(e.target.value)}
              textarea
              rows={12}
              className="h-full"
            />
          </Card>
           {error && <p className="text-red-400 text-sm">{error}</p>}
          <Button onClick={handleFix} isLoading={loading} className="w-full">
            Fix Grammar <ArrowRight size={18} />
          </Button>
        </div>

        {/* Output */}
        <div className="space-y-4">
          <Card title="Corrected Version" icon={<Check size={20} />}>
            <div className="relative">
              <textarea
                readOnly
                value={fixedText}
                className="w-full bg-[rgba(0,255,100,0.05)] border border-[rgba(0,255,100,0.2)] rounded-xl px-4 py-3 text-white focus:outline-none resize-none h-[calc(100%-8px)] min-h-[300px]"
                placeholder="Corrected text will appear here..."
              />
              {fixedText && (
                <button 
                  onClick={handleCopy}
                  className="absolute top-2 right-2 p-2 bg-[rgba(0,0,0,0.5)] rounded-lg text-white hover:bg-[#00f3ff] transition-colors"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              )}
            </div>
          </Card>
          {fixedText && <LeadCapture variant="tool-output" />}
        </div>
      </div>
    </div>
  );
};

export default GrammarFixer;

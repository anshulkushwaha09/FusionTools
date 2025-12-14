import { useState } from 'react';
import { Type, ArrowRight, Sparkles, Copy, Check } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { generateSlogans } from '../../services/groq';
import { motion } from 'framer-motion';
import LeadCapture from '../../components/LeadCapture';

const SloganMaker = () => {
    const [topic, setTopic] = useState('');
    const [slogans, setSlogans] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState(null);

    const handleGenerate = async () => {
        if (!topic.trim()) return;
        setIsLoading(true);
        try {
            const result = await generateSlogans(topic);
            setSlogans(result);
        } catch (error) {
            console.error("Failed to generate slogans", error);
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    Slogan Maker
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Generate catchy, professional slogans for your brand or product in seconds.
                </p>
            </div>

            <div className="glass-panel p-8 rounded-2xl border border-white/10 space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-grow">
                        <Input
                            placeholder="Enter your brand name or product keyword (e.g. 'Coffee Shop', 'Eco Sneakers')"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                        />
                    </div>
                    <Button onClick={handleGenerate} disabled={isLoading || !topic.trim()}>
                        {isLoading ? 'Generating...' : 'Create Slogans'}
                        {!isLoading && <Sparkles size={18} />}
                    </Button>
                </div>

                {slogans.length > 0 && (
                    <div className="space-y-3 pt-4">
                        {slogans.map((slogan, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#00f3ff]/50 hover:bg-white/10 transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="text-[#00f3ff] font-bold text-lg">#{index + 1}</div>
                                    <p className="text-white text-lg font-medium tracking-wide">{slogan.replace(/^\d+\.\s*/, '').replace(/"/g, '')}</p>
                                </div>
                                <button 
                                    onClick={() => copyToClipboard(slogan, index)}
                                    className="p-2 text-gray-400 hover:text-white transition-colors"
                                >
                                    {copiedIndex === index ? <Check className="text-green-400" size={20} /> : <Copy size={20} />}
                                </button>
                            </motion.div>
                        ))}
                        <LeadCapture variant="tool-output" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SloganMaker;

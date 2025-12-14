import { useState } from 'react';
import { Lightbulb, ArrowRight, Sparkles, Briefcase } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { generateBusinessIdeas } from '../../services/groq';
import { motion } from 'framer-motion';
import LeadCapture from '../../components/LeadCapture';

const BusinessIdeas = () => {
    const [topic, setTopic] = useState('');
    const [ideas, setIdeas] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = async () => {
        if (!topic.trim()) return;
        setIsLoading(true);
        try {
            const result = await generateBusinessIdeas(topic);
            const parsedIdeas = result.map(line => {
                const [title, desc] = line.split(':');
                return { title: title?.trim(), desc: desc?.trim() || line };
            });
            setIdeas(parsedIdeas);
        } catch (error) {
            console.error("Failed to generate ideas", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    Business Idea Generator
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Stuck? Get 5 innovative business ideas based on your interests or industry.
                </p>
            </div>

            <div className="glass-panel p-8 rounded-2xl border border-white/10 space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-grow">
                        <Input
                            placeholder="Enter an industry, interest, or problem (e.g. 'Sustainable Fashion', 'Remote Work')"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                        />
                    </div>
                    <Button onClick={handleGenerate} disabled={isLoading || !topic.trim()}>
                        {isLoading ? 'Ideating...' : 'Generate Ideas'}
                        {!isLoading && <Sparkles size={18} />}
                    </Button>
                </div>

                {ideas.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        {ideas.map((idea, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-[#bc13fe]/50 hover:bg-white/10 transition-all group"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-lg bg-[#bc13fe]/20 text-[#bc13fe]">
                                        <Lightbulb size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#bc13fe] transition-colors">{idea.title}</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">{idea.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BusinessIdeas;

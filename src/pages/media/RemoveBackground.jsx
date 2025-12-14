import { useState, useEffect } from 'react';
import { Image, Upload, Wand2, Download, Eraser, AlertTriangle } from 'lucide-react';
import FileUploader from '../../components/ui/FileUploader';
import Button from '../../components/ui/Button';
import { removeBackground } from '@imgly/background-removal';
import LeadCapture from '../../components/LeadCapture';

const RemoveBackground = () => {
    const [file, setFile] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [processedImage, setProcessedImage] = useState(null);
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState(0);

    // Cleanup object URL
    useEffect(() => {
        return () => {
            if (processedImage) URL.revokeObjectURL(processedImage);
        };
    }, [processedImage]);

    const processImage = async () => {
        if(!file) return;
        setProcessing(true);
        setError(null);
        setProgress(10); // Start progress

        try {
            // @imgly/background-removal configuration
            const config = {
                progress: (key, current, total) => {
                    // Approximate progress based on download/inference
                    const percent = Math.round((current / total) * 100);
                    setProgress(percent);
                },
                debug: true
            };

            const blob = await removeBackground(file, config);
            const url = URL.createObjectURL(blob);
            setProcessedImage(url);
            setProgress(100);
        } catch (err) {
            console.error("Background removal failed:", err);
            setError("Failed to remove background. Please try a different image.");
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    Remove Background
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Powerfully remove image backgrounds directly in your browser using AI. No data leaves your device.
                </p>
            </div>

            <div className="glass-panel p-8 rounded-2xl border border-white/10">
                {!file ? (
                    <FileUploader 
                        onFileSelect={setFile} 
                        accept="image/*" 
                        label="Upload Image"
                    />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        <div className="space-y-4">
                            <h3 className="text-white font-medium flex items-center gap-2">
                                <Image size={18} className="text-[#00f3ff]" /> Original
                            </h3>
                            <div className="relative rounded-lg overflow-hidden border border-white/10 bg-black/40">
                                <img src={URL.createObjectURL(file)} alt="Original" className="w-full object-contain max-h-[400px]" />
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <h3 className="text-white font-medium flex items-center gap-2">
                                <Wand2 size={18} className="text-[#bc13fe]" /> Processed Result
                            </h3>
                            
                            {processing ? (
                                <div className="w-full aspect-square rounded-lg bg-white/5 flex flex-col items-center justify-center border border-white/10 gap-4">
                                    <div className="relative w-16 h-16">
                                        <div className="absolute inset-0 border-4 border-[#00f3ff]/20 rounded-full"></div>
                                        <div className="absolute inset-0 border-4 border-[#00f3ff] border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                    <div className="text-center space-y-2">
                                        <p className="text-[#00f3ff] font-medium animate-pulse">Processing Image...</p>
                                        <p className="text-gray-500 text-xs max-w-[200px]">
                                            Downloading AI models (100MB+) on first run. This may take a moment.
                                        </p>
                                    </div>
                                </div>
                            ) : error ? (
                                <div className="w-full aspect-square rounded-lg bg-red-500/5 flex flex-col items-center justify-center border border-red-500/20 p-6 text-center gap-2">
                                    <AlertTriangle size={32} className="text-red-500" />
                                    <p className="text-red-400 font-medium">{error}</p>
                                    <Button onClick={processImage} variant="secondary" className="mt-2">Try Again</Button>
                                </div>
                            ) : processedImage ? (
                                <div className="relative group rounded-lg overflow-hidden border border-white/10">
                                     {/* Checkerboard background for transparency */}
                                     <div className="absolute inset-0 bg-[url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.Fk7kL5s4H0qMv8m0xW7tYgHaHa%26pid%3DApi&f=1&ipt=e8654c6020556f432049615024775249488424268e36780838127f8728448574&ipo=images')] opacity-50"></div>
                                     <img src={processedImage} alt="Processed" className="relative z-10 w-full object-contain max-h-[400px]" />
                                     
                                     <div className="absolute inset-0 z-20 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <a 
                                            href={processedImage} 
                                            download={`nobg-${file.name.split('.')[0]}.png`}
                                            className="px-6 py-3 bg-white text-black rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform"
                                        >
                                            <Download size={18} /> Download PNG
                                        </a>
                                     </div>
                                </div>
                            ) : (
                                <div className="w-full aspect-square rounded-lg bg-white/5 flex items-center justify-center border border-white/10 flex-col gap-2">
                                    <Eraser size={32} className="text-gray-600" />
                                    <p className="text-gray-500 text-sm">Result will appear here</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                
                {file && !processedImage && !processing && (
                    <div className="flex justify-center pt-8 gap-4">
                         <button onClick={() => setFile(null)} className="px-6 py-2 text-gray-400 hover:text-white transition-colors">Cancel</button>
                         <Button onClick={processImage}>Remove Background <Eraser size={18} /></Button>
                    </div>
                )}
                 {processedImage && (
                    <div className="flex justify-center pt-8 gap-4 flex-col">
                         <div className="flex justify-center">
                            <button onClick={() => {setFile(null); setProcessedImage(null);}} className="text-gray-400 hover:text-white text-sm transition-colors">
                                Process Another Image
                            </button>
                         </div>
                         <LeadCapture variant="tool-output" />
                    </div>
                )}
            </div>
            
            <p className="text-center text-xs text-gray-600">
                Powered by @imgly/background-removal. Runs 100% locally.
            </p>
        </div>
    );
};

export default RemoveBackground;

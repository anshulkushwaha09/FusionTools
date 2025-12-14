import { useState } from 'react';
import { Image, Upload, Wand2, Download, Scaling, AlertTriangle } from 'lucide-react';
import FileUploader from '../../components/ui/FileUploader';
import Button from '../../components/ui/Button';
import '@tensorflow/tfjs'; // Explicit backend registration
import Upscaler from 'upscaler';
import LeadCapture from '../../components/LeadCapture';

const ImageUpscaler = () => {
    const [file, setFile] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [processedImage, setProcessedImage] = useState(null);
    const [scaleFactor, setScaleFactor] = useState(2);
    const [error, setError] = useState(null);

    const processImage = async () => {
        if(!file) return;
        setProcessing(true);
        setError(null);

        try {
            const upscaler = new Upscaler(); // Use default 2x model automatically

            const imageData = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.readAsDataURL(file);
            });

            // UpscalerJS default model is 2x.
            // For 4x, we would need to run it twice or load a different model.
            // For simplicity and stability in this browser demo, we'll stick to 2x AI upscaling.
            const upscaledSrc = await upscaler.upscale(imageData);
            
            setProcessedImage(upscaledSrc);
        } catch (err) {
            console.error("Upscaling failed:", err);
            setError("Failed to upscale image. Ensure your browser supports WebGL.");
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    AI Image Upscaler
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Enhance your images with AI. Uses TensorFlow.js to upscale images directly in your browser.
                </p>
            </div>

            <div className="glass-panel p-8 rounded-2xl border border-white/10">
                {!file ? (
                    <FileUploader 
                        onFileSelect={setFile} 
                        accept="image/*" 
                        label="Upload Image to Upscale"
                    />
                ) : (
                    <div className="space-y-8">
                        <div className="flex justify-between items-center text-sm text-gray-400 bg-white/5 p-4 rounded-xl">
                             <span>Selected: {file.name}</span>
                             <div className="flex items-center gap-2">
                                <span className="text-gray-500">Target Scale:</span>
                                <span className="text-[#00f3ff] font-bold">2x (AI Enhanced)</span>
                             </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                             <div className="space-y-2">
                                <h3 className="text-white font-medium text-center">Original</h3>
                                <div className="border border-white/10 rounded-lg overflow-hidden">
                                     <img src={URL.createObjectURL(file)} alt="Original" className="w-full" />
                                </div>
                            </div>
                             <div className="space-y-2">
                                <h3 className="text-white font-medium text-center">Upscaled Result</h3>
                                {processing ? (
                                    <div className="w-full aspect-square rounded-lg bg-white/5 flex flex-col items-center justify-center border border-white/10 gap-4">
                                        <div className="text-[#bc13fe] flex flex-col items-center gap-2">
                                            <Scaling className="animate-spin" size={32} />
                                            <span className="animate-pulse">Enhancing Details...</span>
                                        </div>
                                        <p className="text-xs text-gray-500 max-w-[200px] text-center">
                                            Running TensorFlow.js neural network in your browser.
                                        </p>
                                    </div>
                                ) : error ? (
                                     <div className="w-full aspect-square rounded-lg bg-red-500/5 flex flex-col items-center justify-center border border-red-500/20 p-6 text-center gap-2">
                                        <AlertTriangle size={32} className="text-red-500" />
                                        <p className="text-red-400 font-medium">{error}</p>
                                        <Button onClick={processImage} variant="secondary" className="mt-2">Try Again</Button>
                                    </div>
                                ) : processedImage ? (
                                    <div className="relative group">
                                         <img src={processedImage} alt="Upscaled" className="w-full rounded-lg border border-white/10 shadow-[0_0_30px_rgba(188,19,254,0.2)]" />
                                         <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                                            <a href={processedImage} download={`upscaled-${file.name}`} className="px-4 py-2 bg-white text-black rounded-full font-bold flex items-center gap-2">
                                                <Download size={16} /> Download
                                            </a>
                                         </div>
                                    </div>
                                ) : (
                                    <div className="w-full aspect-square rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                                        <p className="text-gray-500 text-sm">Upscaled preview</p>
                                    </div>
                                )}
                            </div>
                        </div>

                         {file && !processedImage && !processing && (
                            <div className="flex justify-center gap-4">
                                <button onClick={() => setFile(null)} className="px-6 py-2 text-gray-400 hover:text-white transition-colors">Cancel</button>
                                <Button onClick={processImage}>Upscale Image <Wand2 size={18} /></Button>
                            </div>
                        )}
                        {processedImage && (
                            <div className="flex justify-center flex-col gap-4">
                                 <button onClick={() => {setFile(null); setProcessedImage(null);}} className="text-gray-400 hover:text-white text-sm transition-colors mx-auto block">Upscale Another</button>
                                 <LeadCapture variant="tool-output" />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageUpscaler;

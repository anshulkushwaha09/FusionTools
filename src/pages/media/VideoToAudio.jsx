import { useState, useRef } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { Music, Upload, Download, ArrowRight, Video } from 'lucide-react';
import FileUploader from '../../components/ui/FileUploader';
import Button from '../../components/ui/Button';
import LeadCapture from '../../components/LeadCapture';

const VideoToAudio = () => {
    const [loaded, setLoaded] = useState(false);
    const [file, setFile] = useState(null);
    const [converting, setConverting] = useState(false);
    const [downloadLink, setDownloadLink] = useState(null);
    const ffmpegRef = useRef(new FFmpeg());
    const [message, setMessage] = useState('Loading FFmpeg core...');

    const load = async () => {
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
        const ffmpeg = ffmpegRef.current;
        
        try {
            await ffmpeg.load({
                coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
                wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
            });
            setLoaded(true);
            setMessage('Ready to convert');
        } catch(e) {
            console.error(e);
            setMessage('Failed to load FFmpeg. Your browser might not support SharedArrayBuffer.');
        }
    };

    // Load FFmpeg on click to save resources/errors
    const initFFmpeg = () => {
        if(!loaded) load();
    };

    const convert = async () => {
        if(!file) return;
        setConverting(true);
        setMessage('Converting video to audio...');
        
        const ffmpeg = ffmpegRef.current;
        await ffmpeg.writeFile('input.mp4', await fetchFile(file));
        await ffmpeg.exec(['-i', 'input.mp4', 'output.mp3']);
        const data = await ffmpeg.readFile('output.mp3');
        
        const url = URL.createObjectURL(new Blob([data.buffer], { type: 'audio/mp3' }));
        setDownloadLink(url);
        setConverting(false);
        setMessage('Conversion complete!');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    Video to Audio Converter
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Extract high-quality MP3 audio from your video files completely offline in your browser.
                </p>
            </div>

            <div className="glass-panel p-8 rounded-2xl border border-white/10">
                {!loaded ? (
                    <div className="text-center py-10 space-y-4">
                        <Button onClick={initFFmpeg} className="mx-auto">
                             Initialize Converter Engine
                        </Button>
                        <p className="text-sm text-gray-500">Requires downloading ~30MB FFmpeg WASM core.</p>
                        {message !== 'Loading FFmpeg core...' && <p className="text-red-400">{message}</p>}
                    </div>
                ) : !file ? (
                    <FileUploader 
                        onFileSelect={setFile} 
                        accept="video/*" 
                        label="Upload Video to Extract Audio"
                    />
                ) : (
                    <div className="text-center space-y-6">
                         <div className="w-16 h-16 mx-auto rounded-2xl bg-[#00f3ff]/20 text-[#00f3ff] flex items-center justify-center mb-4">
                            <Video size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1">{file.name}</h3>
                        
                        {converting ? (
                            <div className="animate-pulse text-[#00f3ff] font-medium">{message}</div>
                        ) : downloadLink ? (
                            <div className="space-y-4">
                                <div className="p-4 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20">
                                    Conversion Successful!
                                </div>
                                <a 
                                    href={downloadLink} 
                                    download={`${file.name.split('.')[0]}.mp3`}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#00f3ff] to-[#bc13fe] text-white font-bold hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all"
                                >
                                    Download MP3 <Download size={20} />
                                </a>
                                <button onClick={() => {setFile(null); setDownloadLink(null);}} className="block mx-auto text-gray-400 hover:text-white mt-4 text-sm">
                                    Convert Another
                                </button>
                                <LeadCapture variant="tool-output" />
                            </div>
                        ) : (
                            <div className="flex justify-center gap-4">
                                <button onClick={() => setFile(null)} className="px-6 py-2 text-gray-400 hover:text-white">Cancel</button>
                                <Button onClick={convert}>Convert to MP3 <ArrowRight size={18} /></Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoToAudio;

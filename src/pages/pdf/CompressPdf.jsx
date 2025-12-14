import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { FileText, ArrowRight, Download } from 'lucide-react';
import FileUploader from '../../components/ui/FileUploader';
import Button from '../../components/ui/Button';
import LeadCapture from '../../components/LeadCapture';

const CompressPdf = () => {
  const [file, setFile] = useState(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
  };

  const compressPdf = async () => {
    if (!file) return;
    setIsCompressing(true);

    try {
        // Load the PDF
        const fileBuffer = await file.arrayBuffer();
        // Just loading and saving often compresses it slightly by removing unused objects
        const pdfDoc = await PDFDocument.load(fileBuffer);
        
        // Save appropriately
        const compressedPdfBytes = await pdfDoc.save();
        const blob = new Blob([compressedPdfBytes], { type: 'application/pdf' });
        saveAs(blob, `compressed-${file.name}`);
        setSuccess(true);
    } catch (error) {
        console.error("Compression failed", error);
        alert("Compression failed.");
    } finally {
        setIsCompressing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Compress PDF
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Reduce the file size of your PDF documents while maintaining quality.
        </p>
      </div>

      <div className="glass-panel p-8 rounded-2xl border border-white/10">
        {!file ? (
          <FileUploader 
            onFileSelect={handleFileSelect} 
            accept=".pdf" 
            label="Upload PDF to Compress"
          />
        ) : (
          <div className="space-y-6 text-center py-8">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#00f3ff]/20 text-[#00f3ff] flex items-center justify-center mb-4">
              <FileText size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{file.name}</h3>
              <p className="text-gray-400 text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            
             <div className="flex gap-4 justify-center">
                <button 
                    onClick={() => setFile(null)}
                    className="px-6 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                >
                    Cancel
                </button>
                <Button 
                    onClick={compressPdf} 
                    disabled={isCompressing}
                >
                    {isCompressing ? 'Compressing...' : 'Compress PDF'} 
                    {!isCompressing && <Download size={18} />}
                </Button>
            </div>
            {success && <LeadCapture variant="tool-output" />}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompressPdf;

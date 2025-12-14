import { useState } from 'react';
import { FileText, ArrowRight, Download, AlertTriangle } from 'lucide-react';
import FileUploader from '../../components/ui/FileUploader';
import Button from '../../components/ui/Button';
import LeadCapture from '../../components/LeadCapture';
import * as pdfjsLib from 'pdfjs-dist';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';

// Use local worker via Vite asset import
import pdfWorker from 'pdfjs-dist/build/pdf.worker?url';
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const PdfToWord = () => {
  const [file, setFile] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile);
    setError(null);
  };

  const convertPdf = async () => {
    if (!file) return;
    setIsConverting(true);
    setError(null);
    
    try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
        const numPages = pdf.numPages;
        const paragraphs = [];

        for (let i = 1; i <= numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            
            // Simple extraction: join items with space. 
            // Advanced extraction would sort by Y position.
            const pageText = textContent.items.map(item => item.str).join(' ');
            
            paragraphs.push(
                new Paragraph({
                    children: [new TextRun(pageText)],
                    spacing: { after: 200 } // Add spacing between pages/paragraphs
                })
            );
            
            // Add page break if not last page
            if (i < numPages) {
                paragraphs.push(new Paragraph({ children: [new TextRun({ break: 1 })] })); // Page break simulation
            }
        }

        const doc = new Document({
            sections: [{
                properties: {},
                children: paragraphs,
            }],
        });

        const blob = await Packer.toBlob(doc);
        saveAs(blob, `${file.name.replace('.pdf', '')}.docx`);
        setSuccess(true);
        
    } catch (err) {
        console.error("PDF Conversion failed:", err);
        setError("Failed to convert PDF. The file might be encrypted or scanned images.");
    } finally {
        setIsConverting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          PDF to Word Converter
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Extract text from your PDF and convert it to an editable Word (.docx) document.
        </p>
      </div>

      <div className="glass-panel p-8 rounded-2xl border border-white/10">
        {!file ? (
          <FileUploader 
            onFileSelect={handleFileSelect} 
            accept=".pdf" 
            label="Upload PDF to Convert"
          />
        ) : (
          <div className="space-y-6 text-center py-8">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#bc13fe]/20 text-[#bc13fe] flex items-center justify-center mb-4">
              <FileText size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{file.name}</h3>
              <p className="text-gray-400 text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            
            {error && (
                <div className="bg-red-500/10 text-red-400 p-3 rounded-lg flex items-center justify-center gap-2 max-w-md mx-auto">
                    <AlertTriangle size={18} /> {error}
                </div>
            )}

            <div className="flex gap-4 justify-center">
                <button 
                    onClick={() => setFile(null)}
                    className="px-6 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                >
                    Cancel
                </button>
                <Button 
                    onClick={convertPdf} 
                    disabled={isConverting}
                >
                    {isConverting ? 'Extracting Text...' : 'Convert to Word'} 
                    {!isConverting && <ArrowRight size={18} />}
                </Button>
            </div>
             <p className="text-xs text-gray-500 mt-4">
                Note: This tool extracts text content. Complex formatting like tables/images may not be preserved perfectly.
            </p>
            {success && <LeadCapture variant="tool-output" />}
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfToWord;

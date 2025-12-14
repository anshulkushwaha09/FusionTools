import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { FileText, ArrowRight, Download, Trash2, Plus } from 'lucide-react';
import FileUploader from '../../components/ui/FileUploader';
import Button from '../../components/ui/Button';
import LeadCapture from '../../components/LeadCapture';

const MergePdf = () => {
  const [files, setFiles] = useState([]);
  const [isMerging, setIsMerging] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFileSelect = (newFiles) => {
    setFiles([...files, ...newFiles]);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const mergePDFs = async () => {
    if (files.length < 2) return;
    setIsMerging(true);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const fileBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(fileBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfFile = await mergedPdf.save();
      const blob = new Blob([mergedPdfFile], { type: 'application/pdf' });
      saveAs(blob, 'merged-document.pdf');
      setSuccess(true);
    } catch (error) {
      console.error('Error merging PDFs:', error);
      alert('Failed to merge PDFs. Please try again.');
    } finally {
      setIsMerging(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Merge PDF Files
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Combine multiple PDF files into a single document. Drag and drop your files, arrange them, and merge instantly.
        </p>
      </div>

      <div className="glass-panel p-8 rounded-2xl border border-white/10">
        <FileUploader 
          onFileSelect={handleFileSelect} 
          accept=".pdf" 
          multiple={true}
          label="Upload PDFs to Merge"
        />

        {files.length > 0 && (
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between text-sm text-gray-400 px-2">
              <span>{files.length} files selected</span>
              <button 
                onClick={() => setFiles([])}
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                Clear All
              </button>
            </div>

            <div className="space-y-3">
              {files.map((file, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 group hover:border-[#00f3ff]/30 transition-all"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 rounded-lg bg-[#bc13fe]/10 text-[#bc13fe]">
                      <FileText size={20} />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-white font-medium truncate">{file.name}</span>
                      <span className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFile(index)}
                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <Button 
                onClick={mergePDFs} 
                className="w-full md:w-auto"
                disabled={files.length < 2 || isMerging}
              >
                {isMerging ? 'Merging...' : 'Merge PDFs'} 
                {!isMerging && <ArrowRight size={18} />}
              </Button>
            </div>
            {success && <LeadCapture variant="tool-output" />}
          </div>
        )}
      </div>
    </div>
  );
};

export default MergePdf;

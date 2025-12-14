import { Upload, X, FileText } from 'lucide-react';
import { useState, useRef } from 'react';

const FileUploader = ({ onFileSelect, accept, multiple = false, label = "Upload File" }) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    if (multiple) {
      onFileSelect(Array.from(files));
    } else {
      onFileSelect(files[0]);
    }
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <div 
      className={`relative w-full h-48 rounded-xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center cursor-pointer
        ${dragActive 
          ? "border-[#00f3ff] bg-[rgba(0,243,255,0.05)]" 
          : "border-gray-700 hover:border-[#00f3ff]/50 hover:bg-white/5"
        }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={onButtonClick}
    >
      <input 
        ref={inputRef}
        className="hidden" 
        type="file" 
        accept={accept} 
        multiple={multiple} 
        onChange={handleChange} 
      />
      
      <div className="p-4 rounded-full bg-white/5 mb-3 group-hover:scale-110 transition-transform">
        <Upload className={`w-8 h-8 ${dragActive ? 'text-[#00f3ff]' : 'text-gray-400'}`} />
      </div>
      
      <p className="text-gray-300 font-medium mb-1">
        {dragActive ? "Drop files here" : label}
      </p>
      <p className="text-gray-500 text-sm">
        {multiple ? "Drag & drop multiple files" : "Drag & drop a file or click to browse"}
      </p>
    </div>
  );
};

export default FileUploader;

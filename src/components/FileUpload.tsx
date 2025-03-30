
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Files, Upload, AlertCircle, CheckCircle2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface FileUploadProps {
  onFilesSelect: (files: File[]) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFilesSelect }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setIsDragActive(false);
    
    if (acceptedFiles.length === 0) {
      return;
    }
    
    // Filter out non-PDF files
    const pdfFiles = acceptedFiles.filter(file => {
      if (file.type !== 'application/pdf') {
        toast.error(`${file.name} is not a PDF file`);
        return false;
      }
      
      // Check file size (max 20MB)
      if (file.size > 20 * 1024 * 1024) {
        toast.error(`${file.name} exceeds the 20MB size limit`);
        return false;
      }
      
      return true;
    });
    
    if (pdfFiles.length === 0) {
      return;
    }
    
    setSelectedFiles(prev => [...prev, ...pdfFiles]);
    onFilesSelect([...selectedFiles, ...pdfFiles]);
    
    if (pdfFiles.length === 1) {
      toast.success('File uploaded successfully');
    } else {
      toast.success(`${pdfFiles.length} files uploaded successfully`);
    }
  }, [selectedFiles, onFilesSelect]);

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false)
  });

  const removeFile = (index: number) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);
    onFilesSelect(newFiles);
  };

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`file-drop-area ${isDragActive ? 'drag-active' : ''} ${
          isDragReject ? 'border-red-500 bg-red-50' : 'border-dashed border-2 border-gray-300 rounded-lg p-6 mb-4 hover:bg-gray-50 transition-colors cursor-pointer'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center">
          <Upload 
            className={`h-12 w-12 mb-4 ${
              isDragReject ? 'text-red-500' : 'text-university-500'
            }`}
          />
          <p className="text-lg font-medium mb-2">
            {isDragReject 
              ? 'Only PDF files are accepted' 
              : 'Drag & drop your PDF files here'}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            or click to browse files (max 20MB each)
          </p>
          <Button 
            variant="outline" 
            className="bg-white hover:bg-gray-50 border-university-300 text-university-700"
          >
            Select PDF Files
          </Button>
        </div>
      </div>
      
      {selectedFiles.length > 0 && (
        <div className="space-y-3 mt-4">
          <h3 className="font-medium">Uploaded Files ({selectedFiles.length})</h3>
          {selectedFiles.map((file, index) => (
            <div key={`${file.name}-${index}`} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-university-100 rounded-md">
                    <Files className="h-6 w-6 text-university-700" />
                  </div>
                  <div>
                    <p className="font-medium line-clamp-1">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-500 hover:text-red-500"
                  onClick={() => removeFile(index)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span className="text-sm text-green-600">Ready to print</span>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {isDragReject && (
        <div className="mt-2 flex items-center gap-2 text-red-600">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm">Please upload PDF files only</span>
        </div>
      )}
    </div>
  );
};

export default FileUpload;

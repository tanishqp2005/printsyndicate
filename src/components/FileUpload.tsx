
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { File, Upload, AlertCircle, CheckCircle2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setIsDragActive(false);
    
    if (acceptedFiles.length === 0) {
      return;
    }
    
    const file = acceptedFiles[0];
    
    // Check if the file is a PDF
    if (file.type !== 'application/pdf') {
      toast.error('Only PDF files are accepted');
      return;
    }
    
    // Check file size (max 20MB)
    if (file.size > 20 * 1024 * 1024) {
      toast.error('File size must be less than 20MB');
      return;
    }
    
    setSelectedFile(file);
    onFileSelect(file);
    toast.success('File uploaded successfully');
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false)
  });

  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="w-full">
      {!selectedFile ? (
        <div
          {...getRootProps()}
          className={`file-drop-area ${isDragActive ? 'drag-active' : ''} ${
            isDragReject ? 'border-red-500 bg-red-50' : ''
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
                : 'Drag & drop your PDF here'}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              or click to browse files (max 20MB)
            </p>
            <Button 
              variant="outline" 
              className="bg-white hover:bg-gray-50 border-university-300 text-university-700"
            >
              Select PDF File
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-university-100 rounded-md">
                <File className="h-6 w-6 text-university-700" />
              </div>
              <div>
                <p className="font-medium line-clamp-1">{selectedFile.name}</p>
                <p className="text-sm text-gray-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-red-500"
              onClick={removeFile}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <span className="text-sm text-green-600">Ready to print</span>
          </div>
        </div>
      )}
      
      {isDragReject && (
        <div className="mt-2 flex items-center gap-2 text-red-600">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm">Please upload a PDF file</span>
        </div>
      )}
    </div>
  );
};

export default FileUpload;

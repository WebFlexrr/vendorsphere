
import React, { useState } from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, FileText, X } from 'lucide-react';

interface PDFPreviewProps {
  document: React.ReactElement;
  title: string;
  open: boolean;
  onClose: () => void;
}

const PDFPreview: React.FC<PDFPreviewProps> = ({ document, title, open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
          <div className="flex gap-2">
            <PDFDownloadLink 
              document={document} 
              fileName={`${title.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`}
              className="no-underline"
            >
              {({ loading }) => (
                <Button className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  {loading ? 'Generating...' : 'Download PDF'}
                </Button>
              )}
            </PDFDownloadLink>
            <Button variant="ghost" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        <div className="flex-1 w-full bg-gray-100 dark:bg-gray-900 rounded-md overflow-hidden">
          <PDFViewer style={{ width: '100%', height: '100%' }}>
            {document}
          </PDFViewer>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PDFPreview;

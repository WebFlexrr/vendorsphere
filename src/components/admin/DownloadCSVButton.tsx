
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { exportToCSV } from '@/utils/exportUtils';
import { useToast } from '@/hooks/use-toast';

interface DownloadCSVButtonProps {
  data: any[];
  filename: string;
  label?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
}

const DownloadCSVButton: React.FC<DownloadCSVButtonProps> = ({ 
  data, 
  filename, 
  label = 'Export CSV', 
  variant = 'outline' 
}) => {
  const { toast } = useToast();

  const handleDownload = () => {
    if (!data || data.length === 0) {
      toast({
        title: "No data available",
        description: "There is no data available to export.",
        variant: "destructive",
      });
      return;
    }

    exportToCSV(data, filename);
    
    toast({
      title: "Export successful",
      description: `${filename}.csv has been downloaded successfully.`,
    });
  };

  return (
    <Button 
      onClick={handleDownload} 
      variant={variant} 
      className="flex items-center gap-2"
    >
      <Download className="h-4 w-4" /> 
      {label}
    </Button>
  );
};

export default DownloadCSVButton;

import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = ({ fullScreen = false, text = 'Loading...' }) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-[100] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-kcsBlue" size={48} />
        <p className="mt-4 text-kcsBlue font-semibold">{text}</p>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center py-8">
      <Loader2 className="animate-spin text-kcsBlue" size={32} />
    </div>
  );
};

export default Loader;
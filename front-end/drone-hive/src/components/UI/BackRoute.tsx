'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface BackRouteProps {
  text: string;
  className?: string;
}

const BackRoute: React.FC<BackRouteProps> = ({ text }) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.push(text);
  };

  return (
    <button
      onClick={handleBackClick}
      className="text-white hover:text-basement-green flex items-center gap-2 uppercase font-ribbon hover:animate-pulse"
    >
      <ArrowLeft className="h-5 w-5" />
      Back
    </button>
  );
};

export default BackRoute;

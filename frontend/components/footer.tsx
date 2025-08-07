import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="text-center text-sm text-gray-500 mt-8 flex justify-center items-center gap-1 flex-wrap">
      <span>Made with</span>
      <Heart className="w-4 h-4 text-red-500 fill-red-500" />
      <span>by</span>
      <a
        href="https://www.linkedin.com/in/sreeramachandran-menon/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-blue-600 hover:underline cursor-pointer transition duration-200"
      >
        Sreeram
      </a>
    </footer>
  );
};

export default Footer;
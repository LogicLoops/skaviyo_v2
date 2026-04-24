import React from "react";

interface LottieLoaderProps {
  size?: number;
  message?: string;
}

const LottieLoader: React.FC<LottieLoaderProps> = ({
  message = "Loading...",
}) => {
  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 h-screen w-screen">
      <div className="relative w-24 h-24 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-emerald-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>
        <div className="absolute inset-4 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-xl">S</span>
        </div>
      </div>
      {message && (
        <p className="mt-2 text-sm text-green-500 font-semibold">{message}</p>
      )}
    </div>
  );
};

export default LottieLoader;

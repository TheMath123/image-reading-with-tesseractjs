import React from 'react';

interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full my-4">
      <div className="h-4 bg-gray-200 rounded">
        <div
          className="h-full bg-green-500 rounded transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-center mt-2 text-sm">{progress}%</p>
    </div>
  );
};

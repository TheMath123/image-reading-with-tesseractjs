import React, { ComponentProps } from 'react';
import { cn } from '../utils/cn';

interface ProgressBarProps extends ComponentProps<'div'> {
  progress: number;
}

export function ProgressBar({ progress, className }: ProgressBarProps) {
  return (
    <div className={cn(className, "w-full my-4 border border-gray-200 rounded p-4")}>
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

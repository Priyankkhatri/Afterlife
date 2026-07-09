import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = 'h-16 w-full' }) => {
  return (
    <div
      className={`shimmer-bg rounded-2xl ${className}`}
      aria-hidden="true"
    />
  );
};

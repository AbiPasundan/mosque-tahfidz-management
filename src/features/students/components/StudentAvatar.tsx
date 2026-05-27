import { useState } from 'react';
import { cn } from '@/utils/cn';
import { getInitials } from '@/features/students/utils/studentTableHelpers';

interface StudentAvatarProps {
  name: string;
  profileImg?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fallbackColorClass?: string;
  className?: string;
}

const sizeMap = {
  xs: 'w-7 h-7 text-[10px]',
  sm: 'w-9 h-9 text-[12px]',
  md: 'w-12 h-12 text-[14px]',
  lg: 'w-16 h-16 text-[18px]',
  xl: 'w-20 h-20 text-[24px]',
};

export function StudentAvatar({
  name,
  profileImg,
  size = 'sm',
  fallbackColorClass = 'bg-primary-container text-on-primary',
  className,
}: StudentAvatarProps) {
  const [imgError, setImgError] = useState(false);
  const hasImage = profileImg && !imgError;

  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center font-bold shrink-0 overflow-hidden',
        sizeMap[size],
        !hasImage && fallbackColorClass,
        className
      )}
    >
      {hasImage ? (
        <img
          src={profileImg}
          alt={name}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        getInitials(name)
      )}
    </div>
  );
}

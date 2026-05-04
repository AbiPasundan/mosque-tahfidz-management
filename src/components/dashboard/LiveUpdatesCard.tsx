import React from 'react';
import { cn } from '@/utils/cn';

export interface LiveUpdateItem {
    icon: React.ReactNode;
    iconBg: string;
    title: string;
    subtitle: string;
}

interface LiveUpdatesCardProps {
    title?: string;
    updates: LiveUpdateItem[];
    className?: string;
}

export function LiveUpdatesCard({
    title = 'Live Updates',
    updates,
    className,
}: LiveUpdatesCardProps) {
    return (
        <div
            className={cn(
                'bg-surface-container-lowest rounded-2xl border border-border-card p-6 shadow-sm',
                className)} >
            <h3 className="text-[16px] font-semibold text-base-content font-[Manrope] mb-4">
                {title}
            </h3>
            <div className="space-y-4">
                {updates.map((update, i) => (
                    <div key={i} className="flex items-start gap-4">
                        <div className={cn(
                            'w-10 h-10 rounded-full flex items-center justify-center shrink-0',
                            update.iconBg)} >
                            {update.icon}
                        </div>
                        <div className="min-w-0 flex-1 pt-1">
                            <p className="text-[13px] font-semibold text-base-content leading-tight">
                                {update.title}
                            </p>
                            <p className="text-[12px] text-base-content/60 mt-1">
                                {update.subtitle}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
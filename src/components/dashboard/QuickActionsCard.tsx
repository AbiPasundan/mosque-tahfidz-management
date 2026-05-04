import React from 'react';
import { LuChevronRight } from 'react-icons/lu';
import { cn } from '@/utils/cn';

export interface QuickActionItem {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
}

interface QuickActionsCardProps {
    title?: string;
    description?: string;
    actions: QuickActionItem[];
    className?: string;
}

export function QuickActionsCard({
    title = 'Quick Actions',
    description = 'Manage your daily tasks efficiently with these quick shortcuts.',
    actions,
    className,
}: QuickActionsCardProps) {
    return (
        <div
            className={cn(
                'bg-linear-to-br from-primary to-primary-container rounded-xl p-lg text-on-primary',
                className)} >
            <h3 className="text-[17px] font-bold font-[Manrope]">{title}</h3>
            <p className="text-[12px] text-primary-content/80 mt-1 mb-4">{description}</p>

            <div className="space-y-2">
                {actions.map((action, index) => (
                    <button
                        key={index}
                        onClick={action.onClick}
                        className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-[13px] font-medium" >
                        <span className="flex items-center gap-3">
                            {action.icon}
                            {action.label}
                        </span>
                        <LuChevronRight className="w-4 h-4 opacity-60" />
                    </button>
                ))}
            </div>
        </div>
    );
}
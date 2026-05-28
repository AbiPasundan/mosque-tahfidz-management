import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { LuX, LuTriangleAlert, LuCircleCheck, LuInfo, LuCircleAlert } from 'react-icons/lu';
import { cn } from '@/utils/cn';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  children?: React.ReactNode;
  variant?: 'default' | 'danger' | 'success' | 'warning' | 'info';
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void | Promise<void>;
  isLoading?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  variant = 'default',
  confirmLabel,
  cancelLabel = 'Batal',
  onConfirm,
  isLoading = false,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
}: ModalProps) {
  const [mounted, setMounted] = useState(false);

  // Ensure portal target exists on client-side
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !isLoading) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, isLoading]);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  // Icon based on variant (for prompt modals like logout, delete)
  const getIcon = () => {
    const iconClass = "w-6 h-6";
    const containerBase = "w-12 h-12 rounded-full flex items-center justify-center mb-4 sm:mb-0 sm:mr-4 shrink-0";

    switch (variant) {
      case 'danger':
        return (
          <div className={cn(containerBase, "bg-error/10 text-error")}>
            <LuCircleAlert className={iconClass} />
          </div>
        );
      case 'success':
        return (
          <div className={cn(containerBase, "bg-success/10 text-success")}>
            <LuCircleCheck className={iconClass} />
          </div>
        );
      case 'warning':
        return (
          <div className={cn(containerBase, "bg-warning/10 text-warning")}>
            <LuTriangleAlert className={iconClass} />
          </div>
        );
      case 'info':
        return (
          <div className={cn(containerBase, "bg-info/10 text-info")}>
            <LuInfo className={iconClass} />
          </div>
        );
      default:
        return null;
    }
  };

  // Size mapping classes
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl',
    '2xl': 'max-w-4xl',
  };

  // Variant confirm button styling
  const confirmButtonClasses = {
    default: 'bg-primary text-on-primary hover:bg-primary/95',
    danger: 'bg-error text-white hover:bg-error/90',
    success: 'bg-success text-white hover:bg-success/90',
    warning: 'bg-warning text-on-surface hover:bg-warning/90',
    info: 'bg-info text-white hover:bg-info/90',
  };

  const modalContent = (
    // Wrapper terluar untuk menangani scroll jika modal sangat panjang
    <div className="fixed inset-0 z-[100] overflow-y-auto">

      {/* Container utama untuk flex-centering */}
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-6">

        {/* Backdrop (Dipisahkan agar tidak mengganggu layout flex anak) */}
        <div
          className="fixed inset-0 bg-neutral-950/60 backdrop-blur-sm transition-opacity"
          aria-hidden="true"
          onClick={() => closeOnOverlayClick && !isLoading && onClose()}
        />

        {/* Modal Card Utama */}
        <div
          role="dialog"
          aria-modal="true"
          className={cn(
            "relative w-full transform overflow-hidden rounded-2xl bg-surface-container-lowest text-left align-middle shadow-2xl border border-border-card/45 transition-all",
            sizeClasses[size]
          )}
        >
          {/* Accent strip based on variant */}
          <div className={cn(
            "h-1.5 w-full",
            variant === 'danger' && "bg-error",
            variant === 'success' && "bg-success",
            variant === 'warning' && "bg-warning",
            variant === 'info' && "bg-info",
            variant === 'default' && "bg-primary"
          )} />

          {/* Close button inside modal */}
          {showCloseButton && (
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="absolute top-4 right-4 p-1.5 rounded-xl text-muted hover:text-on-surface hover:bg-surface-container-high transition-all duration-150 focus:outline-none"
              aria-label="Close"
            >
              <LuX className="w-5 h-5" />
            </button>
          )}

          {/* Content Wrapper */}
          <div className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-start">
              {/* Custom/Variant status icon */}
              {getIcon()}

              {/* Title & Children Body */}
              <div className="flex-1">
                <h3 className="text-[18px] font-bold text-on-surface font-[Manrope] tracking-tight mb-1 pr-6">
                  {title}
                </h3>

                {children && (
                  <div className="text-[14px] text-muted leading-relaxed font-normal mt-3">
                    {children}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          {(onConfirm || cancelLabel) && (
            <div className="px-6 py-4 bg-surface-container-low/40 border-t border-border-card/20 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
              {cancelLabel && (
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isLoading}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-border-card text-[14px] font-semibold text-on-surface hover:bg-surface-container-high transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {cancelLabel}
                </button>
              )}

              {onConfirm && (
                <button
                  type="button"
                  onClick={() => !isLoading && onConfirm()}
                  disabled={isLoading}
                  className={cn(
                    "w-full sm:w-auto px-5 py-2.5 rounded-xl text-[14px] font-semibold flex items-center justify-center gap-2 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed shadow-md cursor-pointer min-w-[120px]",
                    confirmButtonClasses[variant]
                  )}
                >
                  {isLoading ? (
                    <>
                      <span className="loading loading-spinner loading-xs"></span>
                      <span>Memproses...</span>
                    </>
                  ) : (
                    confirmLabel || 'Konfirmasi'
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
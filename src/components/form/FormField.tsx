import { cn } from '@/utils/cn';
import type { RegisterOptions, UseFormRegister } from 'react-hook-form';

interface FormFieldProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
  errors?: Record<string, { message?: string }>;
  type?: string;
  placeholder?: string;
  icon?: React.ReactNode;
}

export function FormField({
  label,
  name,
  register,
  rules,
  errors,
  type = 'text',
  placeholder,
  icon,
}: FormFieldProps) {
  const error = errors?.[name];

  return (
    <div>
      <label htmlFor={name} className="block text-label-sm text-on-surface-variant mb-sm">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-md top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant">
            {icon}
          </div>
        )}
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          className={cn(
            'w-full p-md rounded-lg border bg-surface-container-low text-body-md text-on-surface',
            'placeholder:text-on-surface-variant',
            'focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary',
            'transition-colors',
            icon && 'pl-10',
            error && 'border-error focus:border-error focus:ring-error'
          )}
          {...register(name, rules)}
          aria-invalid={error ? 'true' : 'false'}
        />
      </div>
      {error && <p className="mt-sm text-label-sm text-error">{error.message}</p>}
    </div>
  );
}

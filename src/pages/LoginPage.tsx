import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/utils/cn';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { LuMail, LuLock, LuEye, LuEyeOff, LuTrendingUp, LuLayoutDashboard } from 'react-icons/lu';
import { useLogin } from '@/features/auth/hooks/useLogin';
import { loginSchema, type LoginFormValues } from '@/validations/auth';
import axios from 'axios';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@tahfidz.com',
      password: 'admin123',
    },
  });

  const onSubmit = async (formData: LoginFormValues) => {
    try {
      await loginMutation.mutateAsync(formData);
      navigate("/");
    } catch (error: unknown) {
      let message = "Invalid credentials";

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }

      setError("email", { type: "server", message });
      setError("password", { type: "server", message });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Kiri: Form Login */}
      <div className="flex-1 flex items-center justify-center p-gutter">
        <div className="w-full max-w-105">
          <div className="flex items-center gap-sm mb-xl">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <LuLayoutDashboard className="w-5 h-5 text-on-primary" />
            </div>
            <h1 className="text-[24px] font-bold text-primary font-[Manrope] tracking-tight">
              Management Siswa
            </h1>
          </div>

          <p className="text-[14px] text-muted mb-xl">
            Welcome back. Please enter your details.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-lg">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-[13px] font-medium text-on-surface mb-1.5" >
                Email Address
              </label>
              <div className="relative">
                <LuMail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register('email')}
                  className={cn(
                    'w-full pl-10 pr-md py-2.5 rounded-xl border text-[14px] text-on-surface',
                    'bg-surface-container-lowest',
                    'placeholder:text-muted',
                    'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20',
                    'transition-all duration-150',
                    errors.email?.message ? 'border-error' : 'border-border-card'
                  )}
                  placeholder="name@example.com"
                  aria-invalid={errors.email ? 'true' : 'false'}
                />
              </div>
              {errors.email && (
                <p className="mt-[4px] text-[12px] text-error">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-[13px] font-medium text-on-surface mb-1.5" >
                Password
              </label>
              <div className="relative">
                <LuLock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  {...register('password')}
                  className={cn(
                    'w-full pl-10 pr-10 py-2.5 rounded-xl border text-[14px] text-on-surface',
                    'bg-surface-container-lowest',
                    'placeholder:text-muted',
                    'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20',
                    'transition-all duration-150',
                    errors.password ? 'border-error' : 'border-border-card'
                  )}
                  placeholder="••••••••"
                  aria-invalid={errors.password ? 'true' : 'false'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-on-surface-variant transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <LuEyeOff className="w-4 h-4" /> : <LuEye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-[4px] text-[12px] text-error">{errors.password.message}</p>
              )}
            </div>

            {/* Remember me + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-sm cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border-card text-primary focus:ring-primary/30" />
                <span className="text-[13px] text-on-surface-variant">Remember me</span>
              </label>
              <button type="button" className="text-[13px] font-semibold text-primary hover:underline">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className={cn(
                'w-full py-3 rounded-xl text-[15px] font-semibold',
                'bg-primary text-on-primary',
                'hover:bg-primary-container transition-all duration-150',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'shadow-md hover:shadow-lg flex justify-center items-center'
              )} >
              {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="mt-xl text-center text-[13px] text-muted">
            Don't have an account?{' '}
            <button className="text-primary font-semibold hover:underline">
              Contact Administrator
            </button>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 bg-linear-to-br from-primary to-primary-focus items-center justify-center relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-white/20" />
          <div className="absolute bottom-32 left-16 w-48 h-48 rounded-full bg-white/10" />
          <div className="absolute top-1/2 right-1/3 w-24 h-24 rounded-full bg-white/15" />
        </div>

        <div className="relative z-10 max-w-md px-8">
          {/* Mock dashboard card */}
          <div className="card bg-base-100/95 shadow-xl mb-8 backdrop-blur-sm text-base-content">
            <div className="card-body p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-error" />
                <div className="w-3 h-3 rounded-full bg-warning" />
                <div className="w-3 h-3 rounded-full bg-success" />
              </div>
              <div className="flex gap-4 mb-6">
                {[
                  { icon: '👥', color: 'bg-primary/10' },
                  { icon: '📊', color: 'bg-warning/10' },
                  { icon: '✅', color: 'bg-success/10' },
                ].map((item, i) => (
                  <div key={i} className={cn('flex-1 p-4 rounded-xl flex items-center justify-center', item.color)}>
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                <div className="h-3 bg-base-300 rounded-full w-full" />
                <div className="h-3 bg-base-300 rounded-full w-4/5" />
                <div className="h-3 bg-base-300 rounded-full w-3/5" />
              </div>
            </div>
          </div>

          {/* Tagline */}
          <h2 className="text-2xl font-bold text-primary-content font-[Manrope] leading-tight">
            Empowering Islamic Education through Digital Innovation.
          </h2>

          {/* Stat badge */}
          <div className="mt-8 inline-flex items-center gap-3 bg-base-100/95 text-base-content rounded-xl px-4 py-3 shadow-lg backdrop-blur-sm">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <LuTrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-lg font-bold">98%</p>
              <p className="text-[10px] font-semibold uppercase tracking-wider opacity-70">Attendance Rate</p>
            </div>
          </div>
        </div>

        {/* Bottom quote */}
        <p className="absolute bottom-8 left-0 right-0 text-center text-sm text-primary-content/70 px-8">
          "Connecting mentors and students in a seamless digital ecosystem."
        </p>
      </div>
    </div>
  );
}

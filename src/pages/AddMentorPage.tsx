import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/utils/cn";
import {
  LuChevronRight,
  LuArrowLeft,
  LuUser,
  LuMail,
  LuShieldCheck,
  LuCircleCheck,
  LuLoader,
  LuLock,
  LuEye,
  LuEyeOff,
} from "react-icons/lu";
import { useCreateMentor } from "@/features/mentor/hooks/useCreateMentor";
import {
  createMentorSchema,
  type CreateMentorFormValues,
} from "@/validations/mentor";
import axios from "axios";

const ROLE_OPTIONS = [
  { value: "mentor", label: "Mentor", color: "text-primary" },
  { value: "admin", label: "Administrator (Admin)", color: "text-error" },
];

export default function AddMentorPage() {
  const navigate = useNavigate();
  const createMutation = useCreateMentor();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateMentorFormValues>({
    resolver: zodResolver(createMentorSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "mentor",
    },
  });

  const onSubmit = async (formData: CreateMentorFormValues) => {
    try {
      await createMutation.mutateAsync(formData);
      setShowSuccess(true);
      reset();
      setTimeout(() => {
        navigate("/mentor");
      }, 1500);
    } catch (error: unknown) {
      let message = "Failed to create mentor. Please try again.";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }
      setError("name", { type: "server", message });
    }
  };

  const isPending = isSubmitting || createMutation.isPending;

  return (
    <div className="space-y-lg animate-in fade-in-50 duration-200">
      {/* Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md">
        <div className="flex items-center gap-xs text-[12px] text-muted">
          <Link to="/" className="hover:text-primary transition-colors">
            Dashboard
          </Link>
          <LuChevronRight className="w-3 h-3" />
          <Link
            to="/mentor"
            className="hover:text-primary transition-colors"
          >
            Mentors
          </Link>
          <LuChevronRight className="w-3 h-3" />
          <span className="text-primary font-medium">Add New Mentor</span>
        </div>

        <Link
          to="/mentor"
          className="inline-flex items-center gap-xs text-[13px] font-semibold text-primary hover:underline self-start sm:self-auto"
        >
          <LuArrowLeft className="w-4 h-4" /> Back to Mentors
        </Link>
      </div>

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-top-2 fade-in duration-300">
          <div className="flex items-center gap-sm px-lg py-md rounded-2xl bg-emerald-50 border border-emerald-200 shadow-xl">
            <LuCircleCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="text-[14px] font-bold text-emerald-800">
                Mentor Created!
              </p>
              <p className="text-[12px] text-emerald-600">
                Redirecting to mentors list...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Card */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-lg">
        {/* Form Section */}
        <div className="bg-surface-container-lowest rounded-2xl border border-border-card shadow-sm overflow-hidden">
          {/* Header */}
          <div className="px-lg py-md border-b border-border-card bg-linear-to-r from-primary/5 to-transparent">
            <h1 className="text-[20px] font-bold text-on-surface font-[Manrope] tracking-tight">
              Register New Mentor
            </h1>
            <p className="text-[13px] text-muted mt-0.5">
              Fill in the required fields below to create a new mentor or administrator account.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-lg space-y-xl">
            {/* Mentor Name */}
            <div>
              <label
                htmlFor="mentor-name"
                className="block text-[13px] font-semibold text-on-surface mb-1.5"
              >
                Full Name <span className="text-error">*</span>
              </label>
              <div className="relative">
                <LuUser className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  id="mentor-name"
                  type="text"
                  {...register("name")}
                  placeholder="e.g. Ustadz Ahmad Fauzi"
                  className={cn(
                    "w-full pl-10 pr-md py-2.5 rounded-xl border text-[14px] text-on-surface",
                    "bg-surface-container-lowest placeholder:text-muted",
                    "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
                    "transition-all duration-150",
                    errors.name ? "border-error" : "border-border-card"
                  )}
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-[12px] text-error">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="mentor-email"
                className="block text-[13px] font-semibold text-on-surface mb-1.5"
              >
                Email Address <span className="text-error">*</span>
              </label>
              <div className="relative">
                <LuMail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  id="mentor-email"
                  type="email"
                  {...register("email")}
                  placeholder="e.g. ahmad.fauzi@example.com"
                  className={cn(
                    "w-full pl-10 pr-md py-2.5 rounded-xl border text-[14px] text-on-surface",
                    "bg-surface-container-lowest placeholder:text-muted",
                    "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
                    "transition-all duration-150",
                    errors.email ? "border-error" : "border-border-card"
                  )}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-[12px] text-error">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password & Role Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-lg">
              {/* Password */}
              <div>
                <label
                  htmlFor="mentor-password"
                  className="block text-[13px] font-semibold text-on-surface mb-1.5"
                >
                  Password <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <LuLock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input
                    id="mentor-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    {...register("password")}
                    placeholder="Min. 8 characters"
                    className={cn(
                      "w-full pl-10 pr-10 py-2.5 rounded-xl border text-[14px] text-on-surface",
                      "bg-surface-container-lowest placeholder:text-muted",
                      "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
                      "transition-all duration-150",
                      errors.password ? "border-error" : "border-border-card"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-on-surface-variant transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <LuEyeOff className="w-4 h-4" />
                    ) : (
                      <LuEye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-[12px] text-error">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Role */}
              <div>
                <label
                  htmlFor="mentor-role"
                  className="block text-[13px] font-semibold text-on-surface mb-1.5"
                >
                  System Role <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <LuShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <select
                    id="mentor-role"
                    {...register("role")}
                    className={cn(
                      "w-full pl-10 pr-md py-2.5 rounded-xl border text-[14px] text-on-surface appearance-none",
                      "bg-surface-container-lowest",
                      "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
                      "transition-all duration-150",
                      errors.role ? "border-error" : "border-border-card"
                    )}
                  >
                    {ROLE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.role && (
                  <p className="mt-1 text-[12px] text-error">
                    {errors.role.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-end gap-md pt-md border-t border-border-card">
              <Link
                to="/mentor"
                className="px-lg py-2.5 rounded-xl text-[14px] font-semibold text-on-surface-variant hover:bg-surface-container transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isPending}
                className={cn(
                  "px-xl py-2.5 rounded-xl text-[14px] font-semibold",
                  "bg-primary text-on-primary",
                  "hover:bg-primary-focus transition-all duration-150",
                  "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "shadow-md hover:shadow-lg",
                  "flex items-center gap-sm"
                )}
              >
                {isPending ? (
                  <>
                    <LuLoader className="w-4 h-4 animate-spin" />
                    Registering...
                  </>
                ) : (
                  "Register Mentor"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar Info Panel */}
        <div className="space-y-lg">
          {/* Guidelines */}
          <div className="bg-surface-container-lowest rounded-2xl border border-border-card p-lg shadow-sm">
            <h3 className="text-[15px] font-bold text-on-surface font-[Manrope] flex items-center gap-xs mb-md">
              <span className="text-lg">📋</span> Mentor Guidelines
            </h3>
            <ul className="space-y-md text-[13px] text-on-surface-variant">
              <li className="flex items-start gap-sm">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[11px] font-bold shrink-0">
                  1
                </span>
                <span>
                  Enter their <strong>full name</strong> including any formal academic/religious titles if applicable.
                </span>
              </li>
              <li className="flex items-start gap-sm">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[11px] font-bold shrink-0">
                  2
                </span>
                <span>
                  Use a <strong>valid professional email</strong> address for authentication and platform communications.
                </span>
              </li>
              <li className="flex items-start gap-sm">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[11px] font-bold shrink-0">
                  3
                </span>
                <span>
                  Password must be at least <strong>8 characters</strong>. Make sure it contains a strong mix of letters, numbers, and symbols.
                </span>
              </li>
              <li className="flex items-start gap-sm">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[11px] font-bold shrink-0">
                  4
                </span>
                <span>
                  Choose the correct role. <strong>Mentor</strong> accounts only manage student progression, while <strong>Admin</strong> accounts have full administrative controls.
                </span>
              </li>
            </ul>
          </div>

          {/* Role Reference */}
          <div className="bg-surface-container-lowest rounded-2xl border border-border-card p-lg shadow-sm">
            <h3 className="text-[15px] font-bold text-on-surface font-[Manrope] flex items-center gap-xs mb-md">
              <span className="text-lg">🔑</span> Role Privileges
            </h3>
            <div className="space-y-sm">
              <div>
                <p className="text-[13px] font-semibold text-primary">
                  Mentor Role
                </p>
                <p className="text-[11px] text-muted">
                  Can log student progress, manage student details, view performance statistics, and view profiles. Cannot create other mentor/admin accounts or delete students.
                </p>
              </div>
              <div className="border-t border-border-card my-sm pt-sm">
                <p className="text-[13px] font-semibold text-error">
                  Admin Role
                </p>
                <p className="text-[11px] text-muted">
                  Has complete, unrestricted system privileges. Can add or delete students, register and edit mentors, adjust system settings, and manage global records.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

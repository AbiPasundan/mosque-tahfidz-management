import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router";
import { useState } from "react";
import { cn } from "@/utils/cn";
import {
  LuChevronRight,
  LuArrowLeft,
  LuUser,
  LuPhone,
  LuBookOpen,
  LuShieldCheck,
  LuCalendar,
  LuCircleCheck,
  LuLoader,
  LuLock,
  LuEye,
  LuEyeOff,
  LuAtSign,
} from "react-icons/lu";
import { useCreateStudent } from "@/features/students/hooks/useCreateStudent";
import {
  createStudentSchema,
  type CreateStudentFormValues,
} from "@/validations/student";
import axios from "axios";

const LEARNING_LEVELS = [
  "Iqra 1",
  "Iqra 2",
  "Iqra 3",
  "Iqra 4",
  "Iqra 5",
  "Iqra 6",
  "Juz 1-5",
  "Juz 6-10",
  "Juz 11-15",
  "Juz 16-20",
  "Juz 21-25",
  "Juz 26-30",
  "Juz 1-3",
  "Juz 1-5",
  "Juz Amma",
  "Khatam",
];

const STATUS_OPTIONS = [
  { value: "Active", label: "Active", color: "text-emerald-600" },
  { value: "Pending", label: "Pending", color: "text-amber-600" },
  { value: "Inactive", label: "Inactive", color: "text-slate-500" },
];

export default function AddStudentPage() {
  const navigate = useNavigate();
  const createMutation = useCreateStudent();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateStudentFormValues>({
    resolver: zodResolver(createStudentSchema),
    defaultValues: {
      name: "",
      username: "",
      password: "",
      age: 10,
      learning_level: "",
      contact: "",
      status: "Active",
    },
  });

  const onSubmit = async (formData: CreateStudentFormValues) => {
    try {
      await createMutation.mutateAsync(formData);
      setShowSuccess(true);
      reset();
      setTimeout(() => {
        navigate("/students");
      }, 1500);
    } catch (error: unknown) {
      let message = "Failed to create student. Please try again.";
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
            to="/students"
            className="hover:text-primary transition-colors"
          >
            Students
          </Link>
          <LuChevronRight className="w-3 h-3" />
          <span className="text-primary font-medium">Add New Student</span>
        </div>

        <Link
          to="/students"
          className="inline-flex items-center gap-xs text-[13px] font-semibold text-primary hover:underline self-start sm:self-auto"
        >
          <LuArrowLeft className="w-4 h-4" /> Back to Students
        </Link>
      </div>

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-top-2 fade-in duration-300">
          <div className="flex items-center gap-sm px-lg py-md rounded-2xl bg-emerald-50 border border-emerald-200 shadow-xl">
            <LuCircleCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="text-[14px] font-bold text-emerald-800">
                Student Created!
              </p>
              <p className="text-[12px] text-emerald-600">
                Redirecting to students list...
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
              Register New Student
            </h1>
            <p className="text-[13px] text-muted mt-0.5">
              Fill in the required fields below to add a new student to the
              system.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-lg space-y-xl">
            {/* Student Name */}
            <div>
              <label
                htmlFor="student-name"
                className="block text-[13px] font-semibold text-on-surface mb-1.5"
              >
                Full Name <span className="text-error">*</span>
              </label>
              <div className="relative">
                <LuUser className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  id="student-name"
                  type="text"
                  {...register("name")}
                  placeholder="e.g. Muhammad Yusuf"
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

            {/* Username & Password Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-lg">
              {/* Username */}
              <div>
                <label
                  htmlFor="student-username"
                  className="block text-[13px] font-semibold text-on-surface mb-1.5"
                >
                  Username <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <LuAtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input
                    id="student-username"
                    type="text"
                    autoComplete="off"
                    {...register("username")}
                    placeholder="e.g. muhammad.yusuf"
                    className={cn(
                      "w-full pl-10 pr-md py-2.5 rounded-xl border text-[14px] text-on-surface",
                      "bg-surface-container-lowest placeholder:text-muted",
                      "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
                      "transition-all duration-150",
                      errors.username ? "border-error" : "border-border-card"
                    )}
                  />
                </div>
                {errors.username && (
                  <p className="mt-1 text-[12px] text-error">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="student-password"
                  className="block text-[13px] font-semibold text-on-surface mb-1.5"
                >
                  Password <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <LuLock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input
                    id="student-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    {...register("password")}
                    placeholder="Min. 6 characters"
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
            </div>

            {/* Age & Contact Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-lg">
              {/* Age */}
              <div>
                <label
                  htmlFor="student-age"
                  className="block text-[13px] font-semibold text-on-surface mb-1.5"
                >
                  Age <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <LuCalendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input
                    id="student-age"
                    type="number"
                    {...register("age", { valueAsNumber: true })}
                    min={5}
                    max={25}
                    placeholder="10"
                    className={cn(
                      "w-full pl-10 pr-md py-2.5 rounded-xl border text-[14px] text-on-surface",
                      "bg-surface-container-lowest placeholder:text-muted",
                      "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
                      "transition-all duration-150",
                      errors.age ? "border-error" : "border-border-card"
                    )}
                  />
                </div>
                {errors.age && (
                  <p className="mt-1 text-[12px] text-error">
                    {errors.age.message}
                  </p>
                )}
              </div>

              {/* Contact */}
              <div>
                <label
                  htmlFor="student-contact"
                  className="block text-[13px] font-semibold text-on-surface mb-1.5"
                >
                  Contact Number <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <LuPhone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <input
                    id="student-contact"
                    type="tel"
                    {...register("contact")}
                    placeholder="e.g. 08123456789"
                    className={cn(
                      "w-full pl-10 pr-md py-2.5 rounded-xl border text-[14px] text-on-surface",
                      "bg-surface-container-lowest placeholder:text-muted",
                      "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
                      "transition-all duration-150",
                      errors.contact ? "border-error" : "border-border-card"
                    )}
                  />
                </div>
                {errors.contact && (
                  <p className="mt-1 text-[12px] text-error">
                    {errors.contact.message}
                  </p>
                )}
              </div>
            </div>

            {/* Learning Level & Status Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-lg">
              {/* Learning Level */}
              <div>
                <label
                  htmlFor="student-level"
                  className="block text-[13px] font-semibold text-on-surface mb-1.5"
                >
                  Learning Level <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <LuBookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <select
                    id="student-level"
                    {...register("learning_level")}
                    className={cn(
                      "w-full pl-10 pr-md py-2.5 rounded-xl border text-[14px] text-on-surface appearance-none",
                      "bg-surface-container-lowest",
                      "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
                      "transition-all duration-150",
                      errors.learning_level
                        ? "border-error"
                        : "border-border-card"
                    )}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select level...
                    </option>
                    {LEARNING_LEVELS.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.learning_level && (
                  <p className="mt-1 text-[12px] text-error">
                    {errors.learning_level.message}
                  </p>
                )}
              </div>

              {/* Status */}
              <div>
                <label
                  htmlFor="student-status"
                  className="block text-[13px] font-semibold text-on-surface mb-1.5"
                >
                  Status <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <LuShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                  <select
                    id="student-status"
                    {...register("status")}
                    className={cn(
                      "w-full pl-10 pr-md py-2.5 rounded-xl border text-[14px] text-on-surface appearance-none",
                      "bg-surface-container-lowest",
                      "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
                      "transition-all duration-150",
                      errors.status ? "border-error" : "border-border-card"
                    )}
                  >
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.status && (
                  <p className="mt-1 text-[12px] text-error">
                    {errors.status.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-end gap-md pt-md border-t border-border-card">
              <Link
                to="/students"
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
                    Creating...
                  </>
                ) : (
                  "Register Student"
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
              <span className="text-lg">📋</span> Registration Guidelines
            </h3>
            <ul className="space-y-md text-[13px] text-on-surface-variant">
              <li className="flex items-start gap-sm">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[11px] font-bold shrink-0">
                  1
                </span>
                <span>
                  Enter the student's <strong>full legal name</strong> as it
                  appears in their official documents.
                </span>
              </li>
              <li className="flex items-start gap-sm">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[11px] font-bold shrink-0">
                  2
                </span>
                <span>
                  Create a unique <strong>username</strong> (letters, numbers, dots, underscores) and a <strong>password</strong> (min. 6 chars) for the student to log in.
                </span>
              </li>
              <li className="flex items-start gap-sm">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[11px] font-bold shrink-0">
                  3
                </span>
                <span>
                  Age must be between <strong>5 and 25</strong> years old.
                </span>
              </li>
              <li className="flex items-start gap-sm">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[11px] font-bold shrink-0">
                  4
                </span>
                <span>
                  Select the appropriate <strong>learning level</strong> based on
                  the student's current Quran progress assessment.
                </span>
              </li>
              <li className="flex items-start gap-sm">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[11px] font-bold shrink-0">
                  5
                </span>
                <span>
                  Provide a reachable <strong>parent/guardian phone number</strong>{" "}
                  for communication purposes.
                </span>
              </li>
            </ul>
          </div>

          {/* Status Explanation */}
          <div className="bg-surface-container-lowest rounded-2xl border border-border-card p-lg shadow-sm">
            <h3 className="text-[15px] font-bold text-on-surface font-[Manrope] flex items-center gap-xs mb-md">
              <span className="text-lg">🔰</span> Status Reference
            </h3>
            <div className="space-y-sm">
              {STATUS_OPTIONS.map((opt) => (
                <div key={opt.value} className="flex items-center gap-sm">
                  <span
                    className={cn(
                      "w-2.5 h-2.5 rounded-full shrink-0",
                      opt.value === "Active"
                        ? "bg-emerald-500"
                        : opt.value === "Pending"
                          ? "bg-amber-500"
                          : "bg-slate-400"
                    )}
                  />
                  <div>
                    <p className="text-[13px] font-semibold text-on-surface">
                      {opt.label}
                    </p>
                    <p className="text-[11px] text-muted">
                      {opt.value === "Active"
                        ? "Currently enrolled and attending classes."
                        : opt.value === "Pending"
                          ? "Awaiting assessment or class assignment."
                          : "Temporarily not attending classes."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

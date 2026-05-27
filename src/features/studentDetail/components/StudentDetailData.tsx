import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  LuUser,
  LuLock,
  LuPhone,
  LuBookOpen,
  LuSparkles,
  LuCheck,
  LuImage,
  LuUserCheck,
  LuShieldAlert,
  LuEye,
  LuEyeOff,
} from "react-icons/lu";
import type { Student } from "@/features/students/types/student";
import { useMe } from "@/features/auth/hooks/useMe";
import { useUpdateStudent } from "@/features/students/hooks/useUpdateStudent";
import { cn } from "@/utils/cn";

// Options & Presets
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
  "Juz Amma",
  "Khatam",
];

const STATUS_OPTIONS = [
  { value: "Active", label: "Active" },
  { value: "Pending", label: "Pending" },
  { value: "Inactive", label: "Inactive" },
  { value: "Graduated", label: "Graduated" },
];

const FLUENCY_OPTIONS = ["Lancar", "Sedang", "Perlu Mengulang"];

const PRESET_AVATARS = [
  {
    name: "Classic",
    url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
  },
  {
    name: "Bright",
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
  },
  {
    name: "Nature",
    url: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
  },
  {
    name: "Emerald",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  },
];

const PRESET_COVERS = [
  {
    name: "Emerald",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Ocean",
    url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Desert",
    url: "https://images.unsplash.com/photo-1509316975850-ff9c5edd0ea9?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Forest",
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80",
  },
];

interface StudentDetailDataProps {
  student: Student;
}

export default function StudentDetailData({ student }: StudentDetailDataProps) {
  const { data: meResponse } = useMe();
  const currentUser = meResponse?.data;

  const isAdmin = currentUser?.role === "admin";
  const isAssignedMentor = currentUser && student.mentor_id === currentUser.id;
  const canEdit = isAdmin || isAssignedMentor;

  const [showPassword, setShowPassword] = useState(false);
  const updateMutation = useUpdateStudent(student.id);

  // Form setup
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: student.name,
      username: student.username,
      password: "",
      age: student.age,
      learning_level: student.learning_level,
      fluency: student.fluency || "Sedang",
      status: student.status,
      contact: student.contact,
      profile_img: student.profile_img || "",
      cover_img: student.cover_img || "",
    },
  });

  const watchProfileImg = watch("profile_img");
  const watchCoverImg = watch("cover_img");

  const onSubmit = async (data: any) => {
    try {
      const payload: any = { ...data };
      if (!payload.password) {
        delete payload.password; // Don't send empty password
      }
      payload.age = Number(payload.age);

      await updateMutation.mutateAsync(payload);
      toast.success("Student profile updated successfully");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update student");
    }
  };

  // If cannot edit
  if (!canEdit) {
    return (
      <div className="p-xl bg-surface-container-lowest rounded-2xl border border-border-card text-center max-w-lg mx-auto my-lg shadow-sm">
        <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center mx-auto mb-md">
          <LuShieldAlert className="w-6 h-6 text-rose-500" />
        </div>
        <h3 className="text-[16px] font-bold text-on-surface font-[Manrope]">
          Permission Denied
        </h3>
        <p className="text-[13px] text-muted mt-2 leading-relaxed">
          You do not have permission to edit this student's registration details. Only their assigned mentor (<strong>{student.mentor_name || "Assigned Mentor"}</strong>) or an Administrator can modify this profile.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-xl animate-in fade-in-50 duration-200"
    >
      <div className="flex items-center justify-between border-b border-border-card pb-md">
        <div>
          <h2 className="text-[18px] font-bold text-on-surface font-[Manrope] flex items-center gap-xs">
            Edit Student Details
          </h2>
          <p className="text-[12.5px] text-muted">
            Modify registration parameters, credentials, level, and design preferences.
          </p>
        </div>

        <button
          type="submit"
          disabled={updateMutation.isPending}
          className="px-lg py-2 bg-primary hover:bg-primary-focus disabled:opacity-40 text-on-primary text-[13px] font-semibold rounded-xl transition-all shadow-xs flex items-center gap-xs"
        >
          {updateMutation.isPending ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
        {/* Left Column: Credentials & Personal */}
        <div className="space-y-md">
          <h3 className="text-[14px] font-bold text-on-surface/80 font-[Manrope] uppercase tracking-wider">
            1. Identity & Credentials
          </h3>

          {/* Full Name */}
          <div className="space-y-xs">
            <label className="text-[12px] font-semibold text-on-surface-variant flex items-center gap-xs">
              <LuUser className="w-3.5 h-3.5 text-primary" /> Full Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Full Name is required" })}
              className="w-full px-md py-2.5 bg-surface-container rounded-xl border border-border-card text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface"
              placeholder="Ahmad Fauzi"
            />
            {errors.name && (
              <p className="text-[11px] text-rose-500 font-semibold">{errors.name.message as string}</p>
            )}
          </div>

          {/* Username */}
          <div className="space-y-xs">
            <label className="text-[12px] font-semibold text-on-surface-variant flex items-center gap-xs">
              <LuUserCheck className="w-3.5 h-3.5 text-primary" /> Username
            </label>
            <input
              type="text"
              {...register("username", { required: "Username is required" })}
              className="w-full px-md py-2.5 bg-surface-container rounded-xl border border-border-card text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface"
              placeholder="ahmad_fauzi"
            />
            {errors.username && (
              <p className="text-[11px] text-rose-500 font-semibold">{errors.username.message as string}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-xs">
            <label className="text-[12px] font-semibold text-on-surface-variant flex items-center gap-xs">
              <LuLock className="w-3.5 h-3.5 text-primary" /> Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="w-full pl-md pr-xl py-2.5 bg-surface-container rounded-xl border border-border-card text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface"
                placeholder="•••••• (leave blank to keep current)"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-on-surface transition-colors"
              >
                {showPassword ? <LuEyeOff className="w-4 h-4" /> : <LuEye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Contact & Age Grid */}
          <div className="grid grid-cols-2 gap-md">
            {/* Age */}
            <div className="space-y-xs">
              <label className="text-[12px] font-semibold text-on-surface-variant">
                Age
              </label>
              <input
                type="number"
                {...register("age", {
                  required: "Age is required",
                  min: { value: 5, message: "Min age is 5" },
                  max: { value: 25, message: "Max age is 25" },
                })}
                className="w-full px-md py-2.5 bg-surface-container rounded-xl border border-border-card text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface"
              />
              {errors.age && (
                <p className="text-[11px] text-rose-500 font-semibold">{errors.age.message as string}</p>
              )}
            </div>

            {/* Contact */}
            <div className="space-y-xs">
              <label className="text-[12px] font-semibold text-on-surface-variant flex items-center gap-xs">
                <LuPhone className="w-3.5 h-3.5 text-primary" /> Contact
              </label>
              <input
                type="text"
                {...register("contact", { required: "Contact is required" })}
                className="w-full px-md py-2.5 bg-surface-container rounded-xl border border-border-card text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface"
                placeholder="0812xxxxxxxx"
              />
              {errors.contact && (
                <p className="text-[11px] text-rose-500 font-semibold">{errors.contact.message as string}</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Academy & Aesthetics */}
        <div className="space-y-md">
          <h3 className="text-[14px] font-bold text-on-surface/80 font-[Manrope] uppercase tracking-wider">
            2. Academy & Aesthetics
          </h3>

          {/* Learning Level */}
          <div className="space-y-xs">
            <label className="text-[12px] font-semibold text-on-surface-variant flex items-center gap-xs">
              <LuBookOpen className="w-3.5 h-3.5 text-primary" /> Learning Level
            </label>
            <select
              {...register("learning_level")}
              className="w-full px-md py-2.5 bg-surface-container rounded-xl border border-border-card text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface"
            >
              {LEARNING_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          {/* Fluency & Status Grid */}
          <div className="grid grid-cols-2 gap-md">
            {/* Fluency */}
            <div className="space-y-xs">
              <label className="text-[12px] font-semibold text-on-surface-variant flex items-center gap-xs">
                <LuSparkles className="w-3.5 h-3.5 text-primary" /> Fluency
              </label>
              <select
                {...register("fluency")}
                className="w-full px-md py-2.5 bg-surface-container rounded-xl border border-border-card text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface"
              >
                {FLUENCY_OPTIONS.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="space-y-xs">
              <label className="text-[12px] font-semibold text-on-surface-variant">
                Status
              </label>
              <select
                {...register("status")}
                className="w-full px-md py-2.5 bg-surface-container rounded-xl border border-border-card text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Profile & Cover Images presets */}
          <div className="space-y-md pt-xs">
            {/* Profile Preset */}
            <div className="space-y-xs">
              <label className="text-[12px] font-semibold text-on-surface-variant flex items-center justify-between">
                <span>Avatar Custom URL</span>
                <span className="text-[10px] font-normal text-muted">Or pick a preset below</span>
              </label>
              <input
                type="text"
                {...register("profile_img")}
                className="w-full px-md py-2 bg-surface-container rounded-xl border border-border-card text-[12px] text-on-surface"
                placeholder="https://..."
              />
              <div className="flex gap-sm">
                {PRESET_AVATARS.map((av) => (
                  <button
                    key={av.name}
                    type="button"
                    onClick={() => setValue("profile_img", av.url)}
                    className={cn(
                      "w-8 h-8 rounded-full border relative overflow-hidden transition-all shadow-3xs",
                      watchProfileImg === av.url ? "border-primary scale-105" : "border-border-card"
                    )}
                  >
                    <img src={av.url} alt={av.name} className="w-full h-full object-cover" />
                    {watchProfileImg === av.url && (
                      <div className="absolute inset-0 bg-primary/45 flex items-center justify-center">
                        <LuCheck className="w-3.5 h-3.5 text-on-primary font-bold" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Cover Preset */}
            <div className="space-y-xs">
              <label className="text-[12px] font-semibold text-on-surface-variant flex items-center justify-between">
                <span>Cover Custom URL</span>
                <span className="text-[10px] font-normal text-muted">Or pick a preset below</span>
              </label>
              <input
                type="text"
                {...register("cover_img")}
                className="w-full px-md py-2 bg-surface-container rounded-xl border border-border-card text-[12px] text-on-surface"
                placeholder="https://..."
              />
              <div className="flex gap-sm">
                {PRESET_COVERS.map((cov) => (
                  <button
                    key={cov.name}
                    type="button"
                    onClick={() => setValue("cover_img", cov.url)}
                    className={cn(
                      "h-8 flex-1 rounded-lg border relative overflow-hidden transition-all shadow-3xs",
                      watchCoverImg === cov.url ? "border-primary ring-2 ring-primary/10" : "border-border-card"
                    )}
                  >
                    <img src={cov.url} alt={cov.name} className="w-full h-full object-cover" />
                    {watchCoverImg === cov.url && (
                      <div className="absolute inset-0 bg-primary/45 flex items-center justify-center">
                        <LuCheck className="w-3.5 h-3.5 text-on-primary font-bold" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

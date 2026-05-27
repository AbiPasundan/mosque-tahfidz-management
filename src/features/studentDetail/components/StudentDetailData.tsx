import { useState, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  LuUser,
  LuLock,
  LuPhone,
  LuBookOpen,
  LuSparkles,
  LuUserCheck,
  LuShieldAlert,
  LuEye,
  LuEyeOff,
  LuCloudUpload,
  LuX,
  LuImage,
  LuLoader,
} from "react-icons/lu";
import type { Student } from "@/features/students/types/student";
import { useMe } from "@/features/auth/hooks/useMe";
import { useUpdateStudent } from "@/features/students/hooks/useUpdateStudent";
import { useUploadFile } from "@/features/upload/hooks/useUploadFile";
import { cn } from "@/utils/cn";

// Options
const LEARNING_LEVELS = [
  "Iqra 1", "Iqra 2", "Iqra 3", "Iqra 4", "Iqra 5", "Iqra 6",
  "Juz 1-5", "Juz 6-10", "Juz 11-15", "Juz 16-20", "Juz 21-25", "Juz 26-30",
  "Juz 1-3", "Juz Amma", "Khatam",
];

const STATUS_OPTIONS = [
  { value: "Active", label: "Active" },
  { value: "Pending", label: "Pending" },
  { value: "Inactive", label: "Inactive" },
  { value: "Graduated", label: "Graduated" },
];

const FLUENCY_OPTIONS = ["Lancar", "Sedang", "Perlu Mengulang"];

// ─── Image Upload Zone ──────────────────────────────────
interface ImageUploadZoneProps {
  label: string;
  currentUrl: string;
  onUploaded: (url: string) => void;
  variant: "avatar" | "cover";
}

function ImageUploadZone({ label, currentUrl, onUploaded, variant }: ImageUploadZoneProps) {
  const { uploading, progress, error, upload, reset } = useUploadFile();
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) {
        toast.error("Only image files are allowed");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File must be under 5MB");
        return;
      }

      // Show instant local preview
      const localUrl = URL.createObjectURL(file);
      setPreview(localUrl);

      const result = await upload(file);
      if (result) {
        onUploaded(result.url);
        toast.success(`${label} uploaded to Cloudinary`);
      } else {
        setPreview(null);
      }
    },
    [upload, onUploaded, label]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      const file = e.dataTransfer.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  };

  const clearImage = () => {
    setPreview(null);
    onUploaded("");
    reset();
  };

  const displayUrl = preview || currentUrl;
  const isAvatar = variant === "avatar";

  return (
    <div className="space-y-xs">
      <label className="text-[12px] font-semibold text-on-surface-variant flex items-center gap-xs">
        <LuImage className="w-3.5 h-3.5 text-primary" />
        {label}
      </label>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "relative cursor-pointer group rounded-xl border-2 border-dashed transition-all overflow-hidden",
          isAvatar ? "w-full aspect-square max-w-[140px]" : "w-full h-[120px]",
          dragActive
            ? "border-primary bg-primary/5 scale-[1.01]"
            : "border-border-card hover:border-primary/40 hover:bg-surface-container",
          uploading && "pointer-events-none opacity-70"
        )}
      >
        {/* Display current or preview image */}
        {displayUrl ? (
          <>
            <img
              src={displayUrl}
              alt={label}
              className={cn(
                "w-full h-full object-cover transition-all",
                isAvatar ? "rounded-xl" : "rounded-lg"
              )}
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-[11px] font-semibold">Change Image</span>
            </div>
            {/* Clear button */}
            {!uploading && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); clearImage(); }}
                className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-black/60 hover:bg-rose-600 text-white flex items-center justify-center transition-colors z-10"
              >
                <LuX className="w-3 h-3" />
              </button>
            )}
          </>
        ) : (
          // Empty state
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-xs">
            <LuCloudUpload className={cn(
              "text-muted transition-colors group-hover:text-primary",
              isAvatar ? "w-6 h-6" : "w-7 h-7"
            )} />
            <p className="text-[11px] text-muted text-center px-sm leading-tight">
              <span className="font-semibold text-primary">Click to upload</span>
              <br />or drag & drop
            </p>
            <p className="text-[9px] text-muted/60">PNG, JPG, WebP • Max 5MB</p>
          </div>
        )}

        {/* Upload progress overlay */}
        {uploading && (
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-xs z-20">
            <LuLoader className="w-5 h-5 text-white animate-spin" />
            <span className="text-white text-[11px] font-semibold">{progress}%</span>
            <div className="w-3/4 h-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
          onChange={onFileSelect}
          className="hidden"
        />
      </div>

      {error && (
        <p className="text-[11px] text-rose-500 font-semibold">{error}</p>
      )}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────
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
      if (!payload.password) delete payload.password;
      payload.age = Number(payload.age);

      await updateMutation.mutateAsync(payload);
      toast.success("Student profile updated successfully");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update student");
    }
  };

  // Permission denied
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
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border-card pb-md">
        <div>
          <h2 className="text-[18px] font-bold text-on-surface font-[Manrope]">
            Edit Student Details
          </h2>
          <p className="text-[12.5px] text-muted">
            Modify credentials, academic level, and upload profile images to Cloudinary.
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

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
        {/* Left: Credentials */}
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

          {/* Age & Contact */}
          <div className="grid grid-cols-2 gap-md">
            <div className="space-y-xs">
              <label className="text-[12px] font-semibold text-on-surface-variant">Age</label>
              <input
                type="number"
                {...register("age", {
                  required: "Age is required",
                  min: { value: 5, message: "Min 5" },
                  max: { value: 25, message: "Max 25" },
                })}
                className="w-full px-md py-2.5 bg-surface-container rounded-xl border border-border-card text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface"
              />
              {errors.age && (
                <p className="text-[11px] text-rose-500 font-semibold">{errors.age.message as string}</p>
              )}
            </div>
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

        {/* Right: Academy & Images */}
        <div className="space-y-md">
          <h3 className="text-[14px] font-bold text-on-surface/80 font-[Manrope] uppercase tracking-wider">
            2. Academy & Images
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
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          {/* Fluency & Status */}
          <div className="grid grid-cols-2 gap-md">
            <div className="space-y-xs">
              <label className="text-[12px] font-semibold text-on-surface-variant flex items-center gap-xs">
                <LuSparkles className="w-3.5 h-3.5 text-primary" /> Fluency
              </label>
              <select
                {...register("fluency")}
                className="w-full px-md py-2.5 bg-surface-container rounded-xl border border-border-card text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface"
              >
                {FLUENCY_OPTIONS.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>
            <div className="space-y-xs">
              <label className="text-[12px] font-semibold text-on-surface-variant">Status</label>
              <select
                {...register("status")}
                className="w-full px-md py-2.5 bg-surface-container rounded-xl border border-border-card text-[13px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-surface"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Image Uploads */}
          <div className="grid grid-cols-[140px_1fr] gap-md pt-xs">
            {/* Avatar Upload */}
            <ImageUploadZone
              label="Profile Photo"
              currentUrl={watchProfileImg}
              onUploaded={(url) => setValue("profile_img", url)}
              variant="avatar"
            />

            {/* Cover Upload */}
            <ImageUploadZone
              label="Cover Image"
              currentUrl={watchCoverImg}
              onUploaded={(url) => setValue("cover_img", url)}
              variant="cover"
            />
          </div>

          {/* Hidden inputs so form data includes image URLs */}
          <input type="hidden" {...register("profile_img")} />
          <input type="hidden" {...register("cover_img")} />
        </div>
      </div>
    </form>
  );
}

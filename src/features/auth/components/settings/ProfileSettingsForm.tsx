import { useState, useEffect } from 'react';
import { LuUser } from 'react-icons/lu';
import { toast } from 'sonner';
import { useUpdateProfile } from '@/features/auth/hooks/useUpdateProfile';

interface ProfileSettingsFormProps {
  initialName: string;
  initialEmail: string;
}

export function ProfileSettingsForm({ initialName, initialEmail }: ProfileSettingsFormProps) {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const updateProfileMutation = useUpdateProfile();

  useEffect(() => {
    setName(initialName);
    setEmail(initialEmail);
  }, [initialName, initialEmail]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error('Name and Email are required');
      return;
    }

    try {
      await updateProfileMutation.mutateAsync({ name, email });
      toast.success('Profile updated successfully');
    } catch (error: unknown) {
      const message = error instanceof Error ? (error as any).response?.data?.message || error.message : 'Failed to update profile';
      toast.error(message);
    }
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-border-card p-lg">
      <h3 className="text-[16px] font-semibold text-on-surface font-[Manrope] mb-lg flex items-center gap-sm">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <LuUser className="w-4 h-4 text-primary" />
        </div>
        Profile Settings
      </h3>
      <form onSubmit={handleUpdateProfile} className="space-y-md">
        <div>
          <label className="block text-[13px] font-medium text-on-surface mb-[6px]">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-md py-[10px] rounded-xl border border-border-card bg-surface-container-lowest text-[14px] text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        <div>
          <label className="block text-[13px] font-medium text-on-surface mb-[6px]">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-md py-[10px] rounded-xl border border-border-card bg-surface-container-lowest text-[14px] text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        <div className="pt-sm">
          <button 
            type="submit"
            disabled={updateProfileMutation.isPending}
            className="px-lg py-[9px] rounded-lg bg-primary text-on-primary text-[13px] font-medium hover:bg-primary-container transition-colors disabled:opacity-50"
          >
            {updateProfileMutation.isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}

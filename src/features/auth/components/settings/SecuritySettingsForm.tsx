import { useState } from 'react';
import { LuLock } from 'react-icons/lu';
import { toast } from 'sonner';
import { useUpdatePassword } from '@/features/auth/hooks/useUpdateProfile';

export function SecuritySettingsForm() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const updatePasswordMutation = useUpdatePassword();

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error('All password fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      await updatePasswordMutation.mutateAsync({
        old_password: oldPassword,
        new_password: newPassword
      });
      toast.success('Password updated successfully');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: unknown) {
      const message = error instanceof Error ? (error as any).response?.data?.message || error.message : 'Failed to update password';
      toast.error(message);
    }
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-border-card p-lg">
      <h3 className="text-[16px] font-semibold text-on-surface font-[Manrope] mb-lg flex items-center gap-sm">
        <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center">
          <LuLock className="w-4 h-4 text-rose-600" />
        </div>
        Security
      </h3>
      <form onSubmit={handleUpdatePassword} className="space-y-md">
        <div>
          <label className="block text-[13px] font-medium text-on-surface mb-[6px]">Current Password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-md py-[10px] rounded-xl border border-border-card bg-surface-container-lowest text-[14px] text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <div>
            <label className="block text-[13px] font-medium text-on-surface mb-[6px]">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="At least 8 characters"
              className="w-full px-md py-[10px] rounded-xl border border-border-card bg-surface-container-lowest text-[14px] text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-[13px] font-medium text-on-surface mb-[6px]">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-type your new password"
              className="w-full px-md py-[10px] rounded-xl border border-border-card bg-surface-container-lowest text-[14px] text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>
        <div className="pt-sm">
          <button
            type="submit"
            disabled={updatePasswordMutation.isPending}
            className="px-lg py-[9px] rounded-lg bg-surface-container-highest text-on-surface text-[13px] font-medium hover:bg-surface-container transition-colors disabled:opacity-50"
          >
            {updatePasswordMutation.isPending ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      </form>
    </div>
  );
}

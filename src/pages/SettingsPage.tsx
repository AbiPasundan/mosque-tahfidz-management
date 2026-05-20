import { useState, useEffect } from 'react';
import { LuUser, LuBell, LuDatabase, LuLock, LuShieldCheck } from 'react-icons/lu';
import { Link } from 'react-router';
import { useMe } from '@/features/auth/hooks/useMe';
import { useUpdateProfile, useUpdatePassword } from '@/features/auth/hooks/useUpdateProfile';
import { toast } from 'sonner';

export default function SettingsPage() {
  const { data: userData, isLoading: loadingProfile } = useMe();
  const updateProfileMutation = useUpdateProfile();
  const updatePasswordMutation = useUpdatePassword();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (userData?.data) {
      setName(userData.data.name || '');
      setEmail(userData.data.email || '');
    }
  }, [userData]);

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

  if (loadingProfile) {
    return <div className="p-lg">Loading settings...</div>;
  }

  const user = userData?.data;

  return (
    <div className="space-y-lg max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-xs text-[12px] text-muted">
        <Link to="/" className="hover:text-primary transition-colors">Dashboard</Link>
        <span>/</span>
        <span className="text-on-surface font-medium">Settings</span>
      </div>

      <div>
        <h1 className="text-h1 text-on-surface font-[Manrope]">Settings</h1>
        <p className="text-body-md text-muted mt-xs">
          Manage your account and system preferences.
        </p>
      </div>

      <div className="space-y-lg">
        {/* Profile Settings */}
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

        {/* Password Settings */}
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

        {/* System Settings */}
        <div className="bg-surface-container-lowest rounded-xl border border-border-card p-lg">
          <h3 className="text-[16px] font-semibold text-on-surface font-[Manrope] mb-lg flex items-center gap-sm">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
              <LuShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            Account Information
          </h3>
          <div className="space-y-sm">
            <div className="flex items-center justify-between py-sm">
              <span className="text-[13px] text-muted">Role</span>
              <span className="px-2 py-0.5 rounded bg-surface-container text-[11px] font-bold uppercase text-on-surface-variant">
                {user?.role}
              </span>
            </div>
            <div className="flex items-center justify-between py-sm">
              <span className="text-[13px] text-muted">User ID</span>
              <span className="text-[12px] font-mono text-on-surface-variant">
                {user?.user_id || user?.id || 'Unknown'}
              </span>
            </div>
            <div className="flex items-center justify-between py-sm">
              <span className="text-[13px] text-muted">App Version</span>
              <span className="text-[13px] font-medium text-on-surface">1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

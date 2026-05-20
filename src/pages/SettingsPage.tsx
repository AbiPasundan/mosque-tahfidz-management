import { useMe } from '@/features/auth/hooks/useMe';
import {
  SettingsHeader,
  ProfileSettingsForm,
  SecuritySettingsForm,
  AccountInfoSection
} from '@/features/auth/components/settings';

export default function SettingsPage() {
  const { data: userData, isLoading: loadingProfile } = useMe();

  if (loadingProfile) {
    return <div className="p-lg">Loading settings...</div>;
  }

  const user = userData?.data;

  return (
    <div className="space-y-lg max-w-3xl">
      <SettingsHeader />

      <div className="space-y-lg">
        {/* Profile Settings */}
        <ProfileSettingsForm
          initialName={user?.name || ''}
          initialEmail={user?.email || ''}
        />

        {/* Password Settings */}
        <SecuritySettingsForm />

        {/* System Settings */}
        <AccountInfoSection user={user} />
      </div>
    </div>
  );
}

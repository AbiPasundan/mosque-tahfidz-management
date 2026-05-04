import { LuUser, LuBell, LuDatabase } from 'react-icons/lu';
import { Link } from 'react-router';

export default function SettingsPage() {
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
          <div className="space-y-md">
            <div>
              <label className="block text-[13px] font-medium text-on-surface mb-[6px]">Name</label>
              <input
                type="text"
                defaultValue="Ustadz Ahmad"
                className="w-full px-md py-[10px] rounded-xl border border-border-card bg-surface-container-lowest text-[14px] text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-on-surface mb-[6px]">Email</label>
              <input
                type="email"
                defaultValue="admin@mosque.org"
                className="w-full px-md py-[10px] rounded-xl border border-border-card bg-surface-container-lowest text-[14px] text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <button className="px-lg py-[9px] rounded-lg bg-primary text-on-primary text-[13px] font-medium hover:bg-primary-container transition-colors">
              Save Changes
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-surface-container-lowest rounded-xl border border-border-card p-lg">
          <h3 className="text-[16px] font-semibold text-on-surface font-[Manrope] mb-lg flex items-center gap-sm">
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
              <LuBell className="w-4 h-4 text-amber-600" />
            </div>
            Notifications
          </h3>
          <div className="divide-y divide-border-card">
            {['Email Notifications', 'Progress Updates', 'Attendance Alerts'].map((item) => (
              <label key={item} className="flex items-center justify-between py-md cursor-pointer">
                <span className="text-[14px] text-on-surface">{item}</span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 rounded border-border-card text-primary focus:ring-primary/30"
                />
              </label>
            ))}
          </div>
        </div>

        {/* System Settings */}
        <div className="bg-surface-container-lowest rounded-xl border border-border-card p-lg">
          <h3 className="text-[16px] font-semibold text-on-surface font-[Manrope] mb-lg flex items-center gap-sm">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
              <LuDatabase className="w-4 h-4 text-emerald-600" />
            </div>
            System
          </h3>
          <div className="space-y-sm">
            <div className="flex items-center justify-between py-sm">
              <span className="text-[13px] text-muted">Mosque</span>
              <span className="text-[13px] font-medium text-on-surface">Al-Noor Mosque</span>
            </div>
            <div className="flex items-center justify-between py-sm">
              <span className="text-[13px] text-muted">Version</span>
              <span className="text-[13px] font-medium text-on-surface">1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

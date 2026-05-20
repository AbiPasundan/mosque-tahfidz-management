import { Link } from 'react-router';

export function SettingsHeader() {
  return (
    <div className="space-y-md">
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
    </div>
  );
}

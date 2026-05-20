import { LuShieldCheck } from 'react-icons/lu';

interface AccountInfoSectionProps {
  user: any;
}

export function AccountInfoSection({ user }: AccountInfoSectionProps) {
  return (
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
  );
}

import {
  LuBookOpen,
  LuUserPlus,
  LuTrash2,
  LuShieldCheck,
  LuClipboardList,
} from 'react-icons/lu';

interface ActivityListProps {
  activities: any[];
  isActivityLog?: boolean;
}

export function ActivityList({ activities, isActivityLog = false }: ActivityListProps) {
  // Color/Icon config for ActivityLog
  const getActionConfig = (action: string) => {
    switch (action?.toUpperCase()) {
      case 'CREATE_USER':
        return {
          icon: <LuShieldCheck className="w-4 h-4 text-purple-600" />,
          iconBg: 'bg-purple-50 border-purple-100',
        };
      case 'CREATE_STUDENT':
        return {
          icon: <LuUserPlus className="w-4 h-4 text-emerald-600" />,
          iconBg: 'bg-emerald-50 border-emerald-100',
        };
      case 'DELETE_STUDENT':
        return {
          icon: <LuTrash2 className="w-4 h-4 text-rose-600" />,
          iconBg: 'bg-rose-50 border-rose-100',
        };
      case 'CREATE_PROGRESS':
        return {
          icon: <LuBookOpen className="w-4 h-4 text-blue-600" />,
          iconBg: 'bg-blue-50 border-blue-100',
        };
      case 'CREATE_PROGRESS_BULK':
        return {
          icon: <LuClipboardList className="w-4 h-4 text-amber-600" />,
          iconBg: 'bg-amber-50 border-amber-100',
        };
      default:
        return {
          icon: <LuClipboardList className="w-4 h-4 text-gray-600" />,
          iconBg: 'bg-gray-50 border-gray-100',
        };
    }
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl border border-border-card divide-y divide-border-card overflow-hidden">
      {activities.length > 0 ? (
        activities.map((item: any, i: number) => {
          if (isActivityLog || item.description) {
            const config = getActionConfig(item.action);
            return (
              <div key={i} className="flex items-start gap-sm p-lg hover:bg-surface-container-low/20 transition-colors">
                <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${config.iconBg}`}>
                  {config.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-on-surface font-medium leading-relaxed">
                    {item.description}
                  </p>
                  <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mt-[2px]">
                    {new Date(item.created_at).toLocaleDateString()} • BY {item.user_name}
                  </p>
                </div>
              </div>
            );
          }

          // Fallback to Progress format
          return (
            <div key={i} className="flex items-start gap-sm p-lg hover:bg-surface-container-low/20 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center flex-shrink-0">
                <LuBookOpen className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-[13px] text-on-surface">
                  <span className="font-semibold">{item.surah}</span> recorded for student ID <span className="text-primary font-medium">{item.student_id?.slice(0, 8)}</span>
                </p>
                <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mt-[2px]">
                  {new Date(item.progress_date || item.created_at).toLocaleDateString()} • BY {item.mentor_name || 'MENTOR'}
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <div className="p-lg text-center text-muted text-[13px]">
          No recent activity found.
        </div>
      )}
    </div>
  );
}

import { LuBookOpen } from 'react-icons/lu';

interface ActivityListProps {
  activities: any[];
}

export function ActivityList({ activities }: ActivityListProps) {
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-border-card divide-y divide-border-card">
      {activities.length > 0 ? activities.map((item: any, i: number) => (
        <div key={i} className="flex items-start gap-sm p-lg">
          <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center flex-shrink-0">
            <LuBookOpen className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-[13px] text-on-surface">
              <span className="font-semibold">{item.surah}</span> recorded for student ID <span className="text-primary font-medium">{item.student_id.slice(0, 8)}</span>
            </p>
            <p className="text-[10px] font-semibold text-muted uppercase tracking-wider mt-[2px]">
              {new Date(item.progress_date).toLocaleDateString()} • BY {item.mentor_name || 'MENTOR'}
            </p>
          </div>
        </div>
      )) : (
        <div className="p-lg text-center text-muted text-[13px]">
          No recent activity found.
        </div>
      )}
    </div>
  );
}

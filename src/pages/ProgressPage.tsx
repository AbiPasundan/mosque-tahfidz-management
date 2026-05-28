import { useState } from 'react';
import ProgressBreadcrumb from '@/features/progressTracking/components/ProgressBreadcrumb';
import { ProgressHeader } from '@/features/progressTracking/components/ProgressHeader';
import { ProgressEntryForm } from '@/features/progressTracking/components/ProgressEntryForm';
import { ProgressQueue } from '@/features/progressTracking/components/ProgressQueue';
import { useStudents } from '@/features/students/hooks/useStudents';
import { useSurahs, useBulkCreateProgress } from '@/features/progressTracking/hooks/useProgress';
import { useMe } from '@/features/auth/hooks/useMe';
import { toast } from 'sonner';
import type { QueueEntry } from '@/features/progressTracking/types/progress';

export default function ProgressPage() {
  const [queue, setQueue] = useState<QueueEntry[]>([]);

  const { data: userData } = useMe();
  const currentUserId = userData?.data?.user_id || userData?.data?.id;

  const { data: studentsResponse, isLoading: loadingStudents } = useStudents({ limit: 100 });
  const { data: surahs, isLoading: loadingSurahs } = useSurahs();
  const bulkCreateMutation = useBulkCreateProgress();

  const students = studentsResponse?.data || [];

  const addToQueue = (entry: QueueEntry) => {
    setQueue([...queue, entry]);
    toast.success('Added to session queue');
  };

  const removeFromQueue = (index: number) => {
    setQueue(queue.filter((_, i) => i !== index));
  };

  const submitSession = async () => {
    if (queue.length === 0) {
      toast.error('Queue is empty');
      return;
    }

    try {
      const items = queue.map(entry => ({
        student_id: entry.student_id,
        surah: entry.surah,
        ayat_start: entry.ayat_start,
        ayat_end: entry.ayat_end,
        status: entry.status,
        notes: entry.notes
      }));

      await bulkCreateMutation.mutateAsync({ items });
      toast.success('Successfully submitted session progress');
      setQueue([]);
    } catch (error: unknown) {
      const message = error instanceof Error ? (error as any).response?.data?.message || error.message : 'Failed to submit progress';
      toast.error(message);
    }
  };

  return (
    <div className="space-y-lg">
      <ProgressBreadcrumb />

      <ProgressHeader
        onSubmit={submitSession}
        isPending={bulkCreateMutation.isPending}
        queueLength={queue.length}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-lg">
        <ProgressEntryForm
          students={students}
          surahs={surahs || []}
          currentUserId={currentUserId}
          loadingStudents={loadingStudents}
          loadingSurahs={loadingSurahs}
          onAdd={addToQueue}
        />

        <div className="space-y-lg">
          <ProgressQueue
            queue={queue}
            onRemove={removeFromQueue}
            onSubmit={submitSession}
            isPending={bulkCreateMutation.isPending}
          />
        </div>
      </div>
    </div>
  );
}

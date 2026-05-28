import { useState } from 'react';
import { cn } from '@/utils/cn';
import { useProgress } from '@/features/progressTracking/hooks/useProgress';
import type { Student } from '@/features/students/types/student';
import StudentDetailOverview from './StudentDetailOverview';
import StudentDetailProgress from './StudentDetailProgress';
import StudentDetailHafalan from './StudentDetailHafalan';
import StudentDetailData from './StudentDetailData';

const tabs = ['Overview', 'Progress', 'Hafalan', 'Data',];

function StudentDetailMainRight({ student }: { student: Student }) {
    const [activeTab, setActiveTab] = useState('Overview');

    const { data: progressResponse } = useProgress({ student_id: student.id });
    const progress = progressResponse?.data || [];

    return (
        <div className="space-y-lg">
            {/* Tabs */}
            <div className="border-b border-border-card">
                <div className="flex gap-lg overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={cn(
                                'pb-md text-[14px] font-medium whitespace-nowrap transition-colors relative',
                                activeTab === tab
                                    ? 'text-primary'
                                    : 'text-muted hover:text-on-surface-variant'
                            )}
                        >
                            {tab}
                            {activeTab === tab && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab content — Overview */}
            {activeTab === 'Overview' && (
                <StudentDetailOverview student={student} />
            )}
            {activeTab === 'Progress' && (
                <StudentDetailProgress student={student} />
            )}
            {activeTab === 'Hafalan' && (
                <StudentDetailHafalan student={student} />
            )}
            {activeTab === 'Data' && (
                <StudentDetailData student={student} />
            )}

            {/* Placeholder for other tabs */}
            {activeTab !== 'Overview' && activeTab !== 'Progress' && activeTab !== 'Hafalan' && activeTab !== 'Data' && (
                <div className="bg-surface-container-lowest rounded-xl border border-border-card p-xl text-center">
                    <p className="text-[14px] text-muted">{activeTab} content will appear here.</p>
                </div>
            )}
        </div>
    )
}

export default StudentDetailMainRight

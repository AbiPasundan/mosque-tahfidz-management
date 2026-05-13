import { Routes, Route } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import StudentsPage from '@/pages/StudentsPage';
import StudentDetailPage from '@/pages/StudentDetailPage';
import SearchPage from '@/pages/SearchPage';
import ProgressPage from '@/pages/ProgressPage';
import HistoryPage from '@/pages/HistoryPage';
import SettingsPage from '@/pages/SettingsPage';
import MentorPage from '@/pages/Mentor';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<AppLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/students/:id" element={<StudentDetailPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/mentor" element={<MentorPage />} />
      </Route>
    </Routes>
  );
}

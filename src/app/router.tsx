import { Routes, Route } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import StudentsPage from '@/pages/StudentsPage';
import StudentDetailPage from '@/pages/StudentDetailPage';
import AddStudentPage from '@/pages/AddStudentPage';
import SearchPage from '@/pages/SearchPage';
import ProgressPage from '@/pages/ProgressPage';
import HistoryPage from '@/pages/HistoryPage';
import SettingsPage from '@/pages/SettingsPage';
import MentorPage from '@/pages/Mentor';
import MentorDetailPage from '@/pages/MentorDetail';
import AddMentorPage from '@/pages/AddMentorPage';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<AppLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/students/add" element={<AddStudentPage />} />
        <Route path="/students/:id" element={<StudentDetailPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/mentor" element={<MentorPage />} />
        <Route path="/mentor/add" element={<AddMentorPage />} />
        <Route path="/mentor/:id" element={<MentorDetailPage />} />
      </Route>
    </Routes>
  );
}

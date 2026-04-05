import { Suspense, lazy } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from '@/layouts/AppShell'

const HomePage = lazy(() =>
  import('@/pages/HomePage').then((m) => ({ default: m.HomePage })),
)
const LoginPage = lazy(() =>
  import('@/pages/LoginPage').then((m) => ({ default: m.LoginPage })),
)
const BooksPage = lazy(() =>
  import('@/pages/books/BooksPage').then((m) => ({ default: m.BooksPage })),
)
const ResourcesPage = lazy(() =>
  import('@/pages/resources/ResourcesPage').then((m) => ({ default: m.ResourcesPage })),
)
const SeatsPage = lazy(() =>
  import('@/pages/seats/SeatsPage').then((m) => ({ default: m.SeatsPage })),
)
const AiConsultPage = lazy(() =>
  import('@/pages/ai/AiConsultPage').then((m) => ({ default: m.AiConsultPage })),
)
const NotificationsPage = lazy(() =>
  import('@/pages/notifications/NotificationsPage').then((m) => ({
    default: m.NotificationsPage,
  })),
)
const InnovationPage = lazy(() =>
  import('@/pages/innovation/InnovationPage').then((m) => ({ default: m.InnovationPage })),
)
const UniversitiesPage = lazy(() =>
  import('@/pages/universities/UniversitiesPage').then((m) => ({ default: m.UniversitiesPage })),
)
const ProfilePage = lazy(() =>
  import('@/pages/profile/ProfilePage').then((m) => ({ default: m.ProfilePage })),
)

function PageFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center text-sm text-muted-foreground">
      加载中…
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<AppShell />}>
            <Route index element={<HomePage />} />
            <Route path="books" element={<BooksPage />} />
            <Route path="resources" element={<ResourcesPage />} />
            <Route path="seats" element={<SeatsPage />} />
            <Route path="ai" element={<AiConsultPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="innovation" element={<InnovationPage />} />
            <Route path="universities" element={<UniversitiesPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

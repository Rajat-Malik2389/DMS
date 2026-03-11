import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SplashPage from "./pages/SplashPage";
import MusicSocietyLayout from "./pages/musicSociety/MusicSocietyLayout";
import MusicSocietyOverviewPage from "./pages/musicSociety/MusicSocietyOverviewPage";
import MusicSocietyTalentsPage from "./pages/musicSociety/MusicSocietyTalentsPage";
import MusicSocietyEventsPage from "./pages/musicSociety/MusicSocietyEventsPage";
import MusicSocietyShowsPage from "./pages/musicSociety/MusicSocietyShowsPage";
import MusicSocietyJoinUsPage from "./pages/musicSociety/MusicSocietyJoinUsPage";
import NgoLayout from "./pages/ngo/NgoLayout";
import NgoActivitiesPage from "./pages/ngo/NgoActivitiesPage";
import NgoDonationPage from "./pages/ngo/NgoDonationPage";
import NgoGalleryPage from "./pages/ngo/NgoGalleryPage";
import NgoContactPage from "./pages/ngo/NgoContactPage";
import AdminPage from "./pages/admin/AdminPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminGuard from "./pages/admin/AdminGuard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/home" element={<HomePage />} />

        <Route path="/music-society" element={<MusicSocietyLayout />}>
          <Route index element={<MusicSocietyOverviewPage />} />
          <Route path="talents" element={<MusicSocietyTalentsPage />} />
          <Route path="events" element={<MusicSocietyEventsPage />} />
          <Route path="shows" element={<MusicSocietyShowsPage />} />
          <Route path="join-us" element={<MusicSocietyJoinUsPage />} />
        </Route>

        <Route path="/ngo" element={<NgoLayout />}>
          <Route index element={<Navigate to="activities" replace />} />
          <Route path="activities" element={<NgoActivitiesPage />} />
          <Route path="donation" element={<NgoDonationPage />} />
          <Route path="gallery" element={<NgoGalleryPage />} />
          <Route path="contact" element={<NgoContactPage />} />
        </Route>

        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminGuard />}>
          <Route index element={<AdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

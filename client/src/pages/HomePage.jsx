import AboutSection from "../components/sections/AboutSection";
import ContactSection from "../components/sections/ContactSection";
import HeroSection from "../components/sections/HeroSection";
import TeamSection from "../components/sections/TeamSection";
import PageShell from "../components/common/PageShell";
import MusicSocietyPreviewSection from "../components/sections/home/MusicSocietyPreviewSection";
import NgoPreviewSection from "../components/sections/home/NgoPreviewSection";

function HomePage() {
  return (
    <PageShell basePath="/home">
      <HeroSection />
      <AboutSection />
      <TeamSection />
      <MusicSocietyPreviewSection />
      <NgoPreviewSection />
      <ContactSection />
    </PageShell>
  );
}

export default HomePage;

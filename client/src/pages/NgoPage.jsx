import DonationSection from "../components/sections/DonationSection";
import NgoGallerySection from "../components/sections/NgoGallerySection";
import NgoHeroSection from "../components/sections/NgoHeroSection";
import PageShell from "../components/common/PageShell";

function NgoPage() {
  return (
    <PageShell basePath="/">
      <NgoHeroSection />
      <NgoGallerySection />
      <DonationSection />
    </PageShell>
  );
}

export default NgoPage;

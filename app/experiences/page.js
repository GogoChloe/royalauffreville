import { Header } from "../component/Header";
import { Footer } from "../component/Footer";
import { ExperiencesSectionV2 } from "../component/ExperiencesSectionV2";

export default function ExperiencesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <ExperiencesSectionV2 />
      </main>
      <Footer />
    </div>
  );
}

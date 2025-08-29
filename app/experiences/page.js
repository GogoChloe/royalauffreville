import { Header } from "../component/Header";
import { Footer } from "../component/Footer";
import { ExperiencesSection } from "../component/ExperiencesSection";

export default function ExperiencesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <ExperiencesSection />
      </main>
      <Footer />
    </div>
  );
}

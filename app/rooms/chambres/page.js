import { Header } from "@/app/component/Header";
import { Footer } from "@/app/component/Footer";
import { ChambresDetailSection } from "@/app/component/ChambresDetailSection";

export default function ChambresPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <ChambresDetailSection />
      <Footer />
    </main>
  );
}

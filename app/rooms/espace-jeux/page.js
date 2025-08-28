import { EspaceJeuxDetailSection } from "@/app/component/EspaceJeuxDetailSection";
import { Header } from "@/app/component/Header";
import { Footer } from "@/app/component/Footer";

export default function EspaceJeuxRoomPage() {
  return (
    <div className="w-full min-h-screen">
      <Header />
      <main className="w-full relative">
        <EspaceJeuxDetailSection />
      </main>
      <Footer />
    </div>
  );
}

import { Header } from "../../component/Header";
import { Footer } from "../../component/Footer";
import { CuisineDetailSection } from "../../component/CuisineDetailSection";
import { SalleSportDetailSection } from "../../component/SalleSportDetailSection";
import { PiscineDetailSection } from "../../component/PiscineDetailSection";
import { SalonDetailSection } from "../../component/SalonDetailSection";
import { JardinDetailSection } from "../../component/JardinDetailSection";
import { ChambresDetailSection } from "../../component/ChambresDetailSection";
import { SousSolDetailSection } from "../../component/SousSolDetailSection";
import { EspaceJeuxDetailSection } from "../../component/EspaceJeuxDetailSection";
import { RoomDetailClient } from "../../component/RoomDetailClient";
import { Suspense } from "react";

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#8B5E3C]"></div>
    </div>
  );
}

export default async function RoomDetailPage({ params }) {
  const { roomId } = params;

  // 如果是Salon页面，使用专门的组件
  if (roomId === 'salon') {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <SalonDetailSection />
        </main>
        <Footer />
      </div>
    );
  }

  // 如果是厨房页面，使用专门的组件
  if (roomId === 'cuisine') {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <CuisineDetailSection />
        </main>
        <Footer />
      </div>
    );
  }

  // 如果是健身房页面，使用专门的组件
  if (roomId === 'salle-sport') {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <SalleSportDetailSection />
        </main>
        <Footer />
      </div>
    );
  }

  // 如果是泳池页面，使用专门的组件
  if (roomId === 'piscine') {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <PiscineDetailSection />
        </main>
        <Footer />
      </div>
    );
  }

  // 如果是jardin页面，使用专门的组件
  if (roomId === 'jardin') {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <JardinDetailSection />
        </main>
        <Footer />
      </div>
    );
  }

  // 如果是chambres页面，使用专门的组件
  if (roomId === 'chambres') {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Suspense fallback={<LoadingFallback />}>
            <ChambresDetailSection />
          </Suspense>
        </main>
        <Footer />
      </div>
    );
  }

  // 如果是sous-sol页面，使用专门的组件
  if (roomId === 'sous-sol') {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <SousSolDetailSection />
        </main>
        <Footer />
      </div>
    );
  }

  // 如果是espace-jeux页面，使用专门的组件
  if (roomId === 'espace-jeux') {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <EspaceJeuxDetailSection />
        </main>
        <Footer />
      </div>
    );
  }

  // 其他房间使用通用客户端组件
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <RoomDetailClient roomId={roomId} />
      <Footer />
    </div>
  );
}

import { Header } from "@/app/component/Header";
import { Footer } from "@/app/component/Footer";
import { ChambresDetailSection } from "@/app/component/ChambresDetailSection";
import { Suspense } from "react";

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#8B5E3C]"></div>
    </div>
  );
}

export default function ChambresPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Suspense fallback={<LoadingFallback />}>
        <ChambresDetailSection />
      </Suspense>
      <Footer />
    </main>
  );
}

import { Header } from "@/app/component/Header";
import { Footer } from "@/app/component/Footer";
import { ChambreDetailSection } from "@/app/component/ChambreDetailSection";
import { Suspense } from "react";

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#8B5E3C]"></div>
    </div>
  );
}

export default async function ChambrePage({ params }) {
  const resolvedParams = await params;
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Suspense fallback={<LoadingFallback />}>
        <ChambreDetailSection chambreId={resolvedParams.chambreId} />
      </Suspense>
      <Footer />
    </div>
  );
}

// 生成静态路径
export async function generateStaticParams() {
  return [
    { chambreId: 'princess-rose' },
    { chambreId: 'strong-marble' },
    { chambreId: 'bird-vintage' },
    { chambreId: 'royal-auffreville' },
    { chambreId: 'good-night' },
    { chambreId: 'amazon-fun' }
  ];
}

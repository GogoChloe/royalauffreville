import { Header } from "@/app/component/Header";
import { Footer } from "@/app/component/Footer";
import { ChambreDetailSection } from "@/app/component/ChambreDetailSection";

export default function ChambrePage({ params }) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ChambreDetailSection chambreId={params.chambreId} />
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

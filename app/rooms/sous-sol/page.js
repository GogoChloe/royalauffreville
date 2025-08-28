import { SousSolDetailSection } from '@/app/component/SousSolDetailSection';
import { Header } from '@/app/component/Header';
import { Footer } from '@/app/component/Footer';

export default function SousSolPage() {
  return (
    <div className="w-full min-h-screen">
      <Header />
      <main className="w-full relative">
        <SousSolDetailSection />
      </main>
      <Footer />
    </div>
  );
}

"use client";

import { Header } from "../component/Header";
import { Footer } from "../component/Footer";
import { Breadcrumb } from "../component/Breadcrumb";
import { useRouter } from 'next/navigation';
import { Activit } from "../component/Activit";

export default function ActivitesPage() {
  const router = useRouter();

  const breadcrumbItems = [
    { label: "Accueil", path: "/" },
    { label: "Activités", path: null }
  ];


  return (
    <div className="min-h-screen bg-[#F5F0E6]">
      <Header />
      
      {/* Breadcrumb */}
      <div className="w-full px-14 pt-32 pb-8">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      
      {/* Page Header */}
      <div className="w-full px-14 py-3 flex flex-col gap-5">
        <h1 className="text-[#8B5E3C] text-4xl font-bold font-['Playfair_Display'] leading-10 tracking-tight">
          Nos Activités
        </h1>
        <p className="text-[#231F20] text-base font-normal font-['Playfair_Display'] leading-relaxed tracking-tight">
          Découvrez une large gamme d'activités pour enrichir votre séjour
        </p>
      </div>

      <Activit showTitle={false} />

      <Footer />
    </div>
  );
}

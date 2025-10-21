"use client";

import { Header } from "../../component/Header";
import { Footer } from "../../component/Footer";
import { Breadcrumb } from "../../component/Breadcrumb";
import { useRouter } from 'next/navigation';
import { Piano, Dumbbell, GamepadIcon as TableTennis } from 'lucide-react';

export default function InterieurPage() {
  const router = useRouter();

  const breadcrumbItems = [
    { label: "Accueil", path: "/" },
    { label: "Activités", path: "/activites" },
    { label: "Intérieur", path: null }
  ];

  const interiorActivities = [
    {
      title: "Piano",
      icon: "🎹",
      description: "Un magnifique piano pour vos moments musicaux"
    },
    {
      title: "Tennis de Table",
      icon: "🏓",
      description: "Table de ping-pong pour des parties endiablées"
    },
    {
      title: "Jeux de Société",
      icon: "🎲",
      description: "Une large collection de jeux pour toute la famille"
    },
    {
      title: "Échecs",
      icon: "♟️",
      description: "Échiquier professionnel pour les passionnés"
    },
    {
      title: "Billard",
      icon: "🎱",
      description: "Table de billard de qualité professionnelle"
    },
    {
      title: "Salle de Sport",
      icon: "💪",
      description: "Équipements complets pour votre entraînement"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F0E6]">
      <Header />
      
      {/* Breadcrumb */}
      <div className="w-full px-14 pt-32 pb-8">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      
      {/* Page Header */}
      <div className="w-full px-14 py-7 flex flex-col gap-5">
        <h1 className="text-black text-3xl font-bold font-['Playfair_Display'] leading-9">
          Activités Intérieures
        </h1>
      </div>

      {/* Activities Grid */}
      <div className="w-full px-14 py-12">
        <div className="max-w-[960px] mx-auto grid grid-cols-1 gap-6">
          {interiorActivities.map((activity, index) => (
            <div
              key={index}
              className="px-[3px] bg-[#8B5E3C]/80 hover:bg-[#8B5E3C] rounded-lg flex justify-center items-center gap-4 py-6 transition-colors cursor-pointer"
            >
              <span className="text-4xl">{activity.icon}</span>
              <div className="flex-1">
                <div className="text-white text-lg font-normal font-['Playfair_Display'] leading-7">
                  {activity.title}
                </div>
                <div className="text-white/80 text-sm font-normal font-['Cormorant'] leading-relaxed">
                  {activity.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="w-full px-14 py-12 flex justify-center gap-6">
        <button
          onClick={() => router.push('/activites')}
          className="px-6 py-3 bg-[#8B5E3C] hover:bg-[#8B5E3C]/90 text-white text-base font-normal font-['Playfair_Display'] leading-normal rounded-md transition-colors"
        >
          Retour aux activités
        </button>
        <button
          onClick={() => router.push('/reservation')}
          className="px-6 py-3 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white text-base font-normal font-['Playfair_Display'] leading-normal rounded-md transition-colors"
        >
          Réserver
        </button>
      </div>

      <Footer />
    </div>
  );
}

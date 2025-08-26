"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function ChambresDetailSection() {
  const router = useRouter();

  // 卧室列表
  const chambres = [
    { 
      id: 'princess-rose', 
      name: 'Princess Rose', 
      image: '/ChRose.JPG',
      description: 'Chambre romantique aux tons rosés',
      capacity: 2
    },
    { 
      id: 'strong-marble', 
      name: 'Strong Marble', 
      image: '/ChGN.JPG',
      description: 'Élégance du marbre et modernité',
      capacity: 2
    },
    { 
      id: 'bird-vintage', 
      name: 'Bird Vintage', 
      image: '/Chvint1.JPG',
      description: 'Charme rétro et authenticité',
      capacity: 2
    },
    { 
      id: 'royal-auffreville', 
      name: 'Royal Auffreville', 
      image: '/ChRose2.JPG',
      description: 'Suite royale avec vue panoramique',
      capacity: 2
    },
    { 
      id: 'good-night', 
      name: 'Good Night', 
      image: '/Chvint2.JPG',
      description: 'Repos optimal et confort absolu',
      capacity: 2
    },
    { 
      id: 'amazon-fun', 
      name: 'Amazon Fun', 
      image: '/Chvint3.JPG',
      description: 'Aventure et détente tropicale',
      capacity: 2
    }
  ];

  const handleChambreClick = (chambreId) => {
    router.push(`/rooms/chambres/${chambreId}`);
  };

  return (
    <div className="w-full px-24 py-8 pb-32 inline-flex flex-col justify-center items-center gap-24">
      <div className="self-stretch inline-flex justify-start items-center gap-2.5 overflow-hidden">
        <div className="justify-start text-neutral-700 text-xs font-normal font-['Playfair_Display'] leading-none tracking-tight">Accueil &gt; Chambres</div>
      </div>
      
      <div className="self-stretch py-3 flex flex-col justify-center items-start gap-5 overflow-hidden">
        <div className="justify-start text-[#8B5E3C] text-3xl font-bold font-['Playfair_Display'] leading-9">Les Chambres</div>
        <div className="justify-start text-neutral-700 text-xs font-normal font-['Playfair_Display'] leading-none tracking-tight">Découvrez nos chambres élégantes et confortables</div>
      </div>

      {/* Chambres Grid - 3 columns, 2 rows */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-18 justify-items-center w-full max-w-7xl mx-auto">
        {chambres.map((chambre) => (
          <div key={chambre.id} className="w-[18rem] h-[22rem]">
            <Button
              onClick={() => handleChambreClick(chambre.id)}
              variant="secondary"
              className="w-full h-full px-4 py-8 rounded-lg flex justify-center items-center font-['Playfair_Display'] relative overflow-hidden bg-cover bg-center hover:scale-105 transition-transform duration-200 cursor-pointer"
              style={{ backgroundImage: `url('${chambre.image}')` }}
            >
              <div className="relative z-10 text-white text-lg font-bold leading-7 bg-[#8B5E3C]/90 px-6 py-3 rounded-lg shadow-lg">
                {chambre.name}
              </div>
            </Button>
          </div>
        ))}
      </div>

      {/* Description Section */}
      <div className="w-full max-w-4xl mx-auto text-center">
        <p className="text-neutral-700 text-base font-normal font-['Playfair_Display'] leading-relaxed tracking-tight">
          Nos chambres élégantes sont toutes équipées de literie haut de gamme, soigneusement sélectionnée pour offrir un soutien optimal et une douceur enveloppante. Chaque chambre révèle une atmosphère singulière : du charme rétro à l'élégance contemporaine, du raffinement du marbre à l'authenticité de l'industriel. Tout a été pensé avec soin par la propriétaire, jusque dans les moindres détails — rideaux occultants, matières nobles, éclairages tamisés. Une décoration harmonieuse et une ambiance apaisante vous invitent à un repos profond, que ce soit pour une nuit ou pour un long séjour.
        </p>
      </div>
    </div>
  );
}

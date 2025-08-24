"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bed, Star, Users } from "lucide-react";

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
      image: '/ChRose.JPG',
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
    <div className="w-full bg-white inline-flex flex-col justify-start items-center gap-16 overflow-hidden">
      {/* Breadcrumb */}
      <div className="w-full px-24 py-8 inline-flex justify-start items-center gap-2.5 overflow-hidden">
        <div className="justify-start text-neutral-700 text-xs font-normal font-['Playfair_Display'] leading-none tracking-tight">
          Accueil &gt; Chambres
        </div>
      </div>

      {/* Title Section */}
      <div className="w-full px-24 py-3 flex flex-col justify-center items-start gap-5 overflow-hidden">
        <div className="justify-start text-black text-4xl font-bold font-['Playfair_Display_SC'] leading-10 tracking-tight">
          Les Chambres
        </div>
        <div className="justify-start text-[#8B5E3C] text-xs font-normal font-['Playfair_Display'] leading-none tracking-tight">
          Élégance et confort pour un repos royal
        </div>
      </div>

      {/* Chambres Grid */}
      <div className="w-full px-24 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-hidden">
        {chambres.map((chambre) => (
          <div key={chambre.id} className="group relative">
            <Button
              onClick={() => handleChambreClick(chambre.id)}
              variant="secondary"
              className="w-full h-80 p-0 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 hover:border-[#D4AF37] flex flex-col justify-end items-start transition-all duration-300 overflow-hidden bg-cover bg-center shadow-md hover:shadow-lg"
              style={{ backgroundImage: `url('${chambre.image}')` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              
              {/* Content */}
              <div className="relative z-10 w-full p-6 text-left">
                <div className="flex items-center gap-2 mb-2">
                  <Bed className="w-5 h-5 text-[#D4AF37]" />
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-[#D4AF37] text-xs font-['Playfair_Display']">
                      {chambre.capacity} personnes
                    </span>
                  </div>
                </div>
                
                <h3 className="text-white text-xl font-bold font-['Playfair_Display_SC'] mb-2">
                  {chambre.name}
                </h3>
                
                <p className="text-white/90 text-sm font-['Playfair_Display'] leading-relaxed">
                  {chambre.description}
                </p>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>
              </div>
            </Button>
          </div>
        ))}
      </div>

      {/* Description Section */}
      <div className="w-full px-24 py-8 flex flex-col justify-start items-start gap-6 overflow-hidden">
        <div className="self-stretch h-12 py-5 inline-flex justify-start items-center gap-2.5 overflow-hidden">
          <div className="justify-start text-black text-3xl font-bold font-['Playfair_Display_SC'] leading-9">
            Description
          </div>
        </div>
        <div className="self-stretch inline-flex justify-start items-start gap-2.5 overflow-hidden">
          <div className="flex-1 text-black text-sm font-normal font-['Playfair_Display'] leading-snug tracking-tight">
            Nos chambres élégantes sont toutes équipées de literie haut de gamme, soigneusement sélectionnée pour offrir un soutien optimal et une douceur enveloppante. 
            Chaque chambre révèle une atmosphère singulière : du charme rétro à l'élégance contemporaine, du raffinement du marbre à l'authenticité de l'industriel. 
            <br/><br/>
            Tout a été pensé avec soin par la propriétaire, jusque dans les moindres détails — rideaux occultants, matières nobles, éclairages tamisés. 
            Une décoration harmonieuse et une ambiance apaisante vous invitent à un repos profond, que ce soit pour une nuit ou pour un long séjour.
            <br/><br/>
            Chaque chambre dispose d'un accès à une salle de bain privée ou partagée, avec des équipements modernes et des produits d'accueil de qualité. 
            L'attention portée aux détails garantit un séjour mémorable dans un cadre d'exception.
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full px-24 py-8 bg-gray-50 flex flex-col justify-start items-start gap-8 overflow-hidden">
        <div className="justify-start text-black text-3xl font-bold font-['Playfair_Display_SC'] leading-9">
          Équipements des chambres
        </div>
        
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
            <Bed className="w-12 h-12 text-[#D4AF37] mb-4" />
            <h4 className="text-lg font-bold font-['Playfair_Display_SC'] mb-2">Literie Premium</h4>
            <p className="text-sm text-gray-600 font-['Playfair_Display']">
              Matelas haut de gamme et linge de maison de luxe
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
            <Star className="w-12 h-12 text-[#D4AF37] mb-4" />
            <h4 className="text-lg font-bold font-['Playfair_Display_SC'] mb-2">Service 5 étoiles</h4>
            <p className="text-sm text-gray-600 font-['Playfair_Display']">
              Attention personnalisée et service de qualité
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
            <Users className="w-12 h-12 text-[#D4AF37] mb-4" />
            <h4 className="text-lg font-bold font-['Playfair_Display_SC'] mb-2">Confort optimal</h4>
            <p className="text-sm text-gray-600 font-['Playfair_Display']">
              Espaces pensés pour votre bien-être et détente
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

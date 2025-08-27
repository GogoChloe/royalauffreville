"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CustomIcon } from "@/app/component/icons";
import { Breadcrumb } from "./Breadcrumb";

export function JardinDetailSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();

  const jardinData = {
    name: 'Jardin',
    subtitle: 'Nature, détente et espace pour tous',
    images: ['/jardin.png'],
    description: `Le vaste jardin de la maison est un véritable havre de paix, idéal pour se ressourcer, jouer ou partager des moments conviviaux en plein air.\n\nPelouse, arbres centenaires, espace pique-nique, hamac, jeux d’extérieur pour enfants, et coins ombragés : tout est pensé pour le plaisir de chacun.\n\nC’est l’endroit parfait pour un petit-déjeuner au soleil, une sieste à l’ombre, ou un barbecue entre amis.`,
    equipments: [
      { name: 'Hamac', icon: 'Hamac' },
      { name: 'Espace pique-nique', icon: 'Table2', isLucide: true },
      { name: 'Jeux d’extérieur', icon: 'JeuxEau' },
      { name: 'Pelouse', icon: 'Pelouse' },
      { name: 'Arbres centenaires', icon: 'panoramiques' },
      { name: 'Coin ombragé', icon: 'Umbrella', isLucide: true },
      { name: 'Barbecue', icon: 'Barbecue' },
      { name: 'Espace détente', icon: 'SalonDetenteExterieur' }
    ]
  };

  // 其他房间
  const otherRooms = [
    { id: 'cuisine', name: 'Cuisine', image: '/cuisine.JPG' },
    { id: 'chambres', name: 'Chambres', image: '/ChRose.JPG' },
    { id: 'salon', name: 'Salon', image: '/salon1.JPG' },
    { id: 'salle-sport', name: 'Salle de Sport', image: '/salleDeSport.jpg' },
    { id: 'sous-sol', name: 'Sous-sol', image: '/sousSol.jpeg' },
    { id: 'espace-jeux', name: 'Espace jeux', image: '/espaceJeux.JPG' }
  ];

  const handleRoomClick = (roomId) => {
    if (roomId === 'chambres') {
      router.push(`/rooms/chambres`);
    } else {
      router.push(`/rooms/${roomId}`);
    }
  };

  const breadcrumbItems = [
    { label: "Accueil", path: "/" },
    { label: "La maison", path: "/rooms" },
    { label: jardinData.name, path: null }
  ];

  return (
    <div className="w-full px-24 pt-32 py-8 pb-32 bg-white inline-flex flex-col justify-start items-center gap-12 overflow-hidden">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Title Section */}
      <div className="w-full px-24 py-3 flex flex-col justify-center items-start gap-5 overflow-hidden">
        <div className="justify-start text-[#8B5E3C] text-4xl font-bold font-['Playfair_Display_SC'] leading-10 tracking-tight">
          {jardinData.name}
        </div>
        <div className="justify-start text-black text-xs font-normal font-['Playfair_Display'] leading-none tracking-tight">
          {jardinData.subtitle}
        </div>
      </div>

      {/* Main Image */}
      <div className="w-full px-24 flex items-center justify-center gap-6">
        <div className="w-[860px] h-[558px] relative overflow-hidden rounded-lg">
          <img 
            src={jardinData.images[currentImageIndex]} 
            alt={jardinData.name} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Description Section */}
      <div className="w-full px-24 py-2.5 flex flex-col justify-start items-start gap-6 overflow-hidden">
        <div className="self-stretch h-12 py-5 inline-flex justify-start items-center gap-2.5 overflow-hidden">
          <div className="justify-start text-black text-3xl font-bold font-['Playfair_Display_SC'] leading-9">
            Description
          </div>
        </div>
        <div className="self-stretch inline-flex justify-start items-start gap-2.5 overflow-hidden">
          <div className="flex-1 text-black text-sm font-normal font-['Playfair_Display'] leading-snug tracking-tight">
            {jardinData.description.split('\n\n').map((paragraph, index) => (
              <span key={index}>
                {paragraph}
                {index < jardinData.description.split('\n\n').length - 1 && <><br/><br/></>}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Equipment Section */}
      <div className="w-full px-24 flex flex-col justify-start items-start gap-11 overflow-hidden">
        <div className="w-72 h-20 relative overflow-hidden">
          <div className="absolute left-8 top-7 justify-start text-black text-3xl font-bold font-['Playfair_Display_SC'] leading-9">
            Équipements
          </div>
        </div>
        <div className="w-full self-stretch grid grid-cols-2 lg:grid-cols-4 gap-10 px-4 md:px-8">
          {jardinData.equipments.map((equipment, index) => (
            <div 
              key={index} 
              className="w-full flex items-center gap-3 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              title={equipment.tooltip || equipment.name}
            >
              {equipment.isLucide ? (
                <CustomIcon name={equipment.icon} className="w-8 h-8 text-[#D4AF37]" />
              ) : (
                <CustomIcon name={equipment.icon} className="w-8 h-8 text-[#D4AF37]" />
              )}
              <span className="text-black text-sm font-normal font-['Playfair_Display']">
                {equipment.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Other Rooms Section */}
      <div className="w-full px-24 py-7 inline-flex flex-col justify-start items-start gap-8 overflow-hidden">
        <div className="w-full relative overflow-hidden">
          <div className="justify-start text-black text-3xl font-bold font-['Playfair_Display_SC'] leading-9">
            Autres pièces de la maison
          </div>
        </div>
        <div className="w-full grid grid-cols-3 gap-6 justify-items-center">
          {otherRooms.map((room) => (
            <div key={room.id} className="w-60 h-40">
              <Button
                onClick={() => handleRoomClick(room.id)}
                variant="secondary"
                className="w-full h-full px-4 py-8 bg-[#8B5E3C]/80 hover:bg-[#8B5E3C] rounded-lg flex justify-center items-center transition-colors duration-200 font-['Playfair_Display'] relative overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: `url('${room.image}')` }}
              >
                <div className="relative z-10 text-white text-lg font-normal leading-7 bg-[#8B5E3C]/90 px-4 py-2 rounded-lg">
                  {room.name}
                </div>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CustomIcon } from "@/app/component/icons";
import { Breadcrumb } from "./Breadcrumb";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

export function SousSolDetailSection() {
  const { language } = useLanguage();
  const t = translations[language];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();

  const sousSolData = {
    name: t.pieces.basement.name,
    subtitle: 'Espace fonctionnel et de loisirs',
    images: ['/sousSol.jpeg', '/sousSol1.jpg'],
    description: t.pieces.basement.description,
    equipments: [
      { name: t.equipments.washingDryingMachine, icon: 'WashingMachine', isLucide: true },
      { name: t.equipments.cleaningProducts, icon: 'SoapDispenser', isLucide: true },
      { name: t.equipments.pingPong, icon: 'PingPong' },
      { name: t.equipments.bikeOnDemand, icon: 'Bike', isLucide: true },
      { name: t.equipments.parking, icon: 'CircleParking', isLucide: true },
      { name: t.equipments.vacuumCleaner, icon: 'BrushCleaning', isLucide: true },
    ]
  };

  // 其他房间
  const otherRooms = [
    { id: 'cuisine', name: t.pieces.cuisine.name, image: '/cuisine.JPG' },
    { id: 'chambres', name: t.pieces.chambres.name, image: '/ChRose.JPG' },
    { id: 'salon', name: t.pieces.salon.name, image: '/salon1.JPG' },
    { id: 'salle-sport', name: t.pieces.gym.name, image: '/salleDeSport.jpg' },
    { id: 'jardin', name: t.pieces.garden.name, image: '/jardin.png' },
    { id: 'espace-jeux', name: t.pieces.gameRoom.name, image: '/espaceJeux.JPG' },
    { id: 'piscine', name: t.pieces.piscine.name, image: '/piscine.JPG' }
  ];

  const handleRoomClick = (roomId) => {
    if (roomId === 'chambres') {
      router.push(`/rooms/chambres`);
    } else {
      router.push(`/rooms/${roomId}`);
    }
  };

  const breadcrumbItems = [
    { label: t.roomDetail.breadcrumbHome, path: "/" },
    { label: t.roomDetail.breadcrumbHouse, path: "/rooms" },
    { label: sousSolData.name, path: null }
  ];

  return (
    <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24 pt-32 py-8 pb-32 bg-white inline-flex flex-col justify-start items-center gap-12 overflow-hidden">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Title Section */}
      <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24 py-3 flex flex-col justify-center items-start gap-5 overflow-hidden">
        <div className="justify-start text-[#8B5E3C] text-2xl sm:text-3xl md:text-4xl font-bold font-['Playfair_Display_SC'] leading-tight tracking-tight">
          {sousSolData.name}
        </div>
        <div className="justify-start text-black text-xs font-normal font-['Playfair_Display'] leading-none tracking-tight">
          {sousSolData.subtitle}
        </div>
      </div>

      {/* Main Image */}
      <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24 flex flex-col items-center justify-center gap-6">
        <div className="w-full max-w-[320px] h-[200px] sm:max-w-[480px] sm:h-[300px] md:max-w-[700px] md:h-[420px] lg:max-w-[860px] lg:h-[558px] relative overflow-hidden rounded-lg">
          <img 
            src={sousSolData.images[currentImageIndex]} 
            alt={sousSolData.name} 
            className="w-full h-full object-cover"
          />
        </div>
        {sousSolData.images.length > 1 && (
          <div className="flex gap-4">
            {sousSolData.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                  currentImageIndex === index ? 'border-[#8B5E3C]' : 'border-gray-300'
                }`}
              >
                <img 
                  src={image} 
                  alt={`${sousSolData.name} ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Description Section */}
      <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24 py-2.5 flex flex-col justify-start items-start gap-6 overflow-hidden">
        <div className="self-stretch h-12 py-5 inline-flex justify-start items-center gap-2.5 overflow-hidden">
          <div className="justify-start text-black text-xl sm:text-2xl md:text-3xl font-bold font-['Playfair_Display_SC'] leading-9">
            Description
          </div>
        </div>
        <div className="self-stretch inline-flex justify-start items-start gap-2.5 overflow-hidden">
          <div className="flex-1 text-black text-sm font-normal font-['Playfair_Display'] leading-snug tracking-tight">
            {sousSolData.description.split('\n\n').map((paragraph, index) => (
              <span key={index}>
                {paragraph}
                {index < sousSolData.description.split('\n\n').length - 1 && <><br/><br/></>}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Equipment Section */}
      <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24 flex flex-col justify-start items-start gap-11 overflow-hidden">
        <div className="w-full relative overflow-hidden">
          <div className="justify-start text-black text-xl sm:text-2xl md:text-3xl font-bold font-['Playfair_Display_SC'] leading-9">
            Équipements
          </div>
        </div>
        <div className="w-full self-stretch grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 px-4 md:px-8">
          {sousSolData.equipments.map((equipment, index) => (
            <div 
              key={index} 
              className="w-full flex items-center gap-3 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {equipment.isLucide ? (
                <CustomIcon name={equipment.icon} className="w-8 h-8 text-[#D4AF37]" isLucide={true} />
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
      <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24 py-7 inline-flex flex-col justify-start items-start gap-8 overflow-hidden">
        <div className="w-full relative overflow-hidden">
          <div className="justify-start text-black text-xl sm:text-2xl md:text-3xl font-bold font-['Playfair_Display_SC'] leading-9">
            Autres pièces de la maison
          </div>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 justify-items-center">
          {otherRooms.map((room) => (
            <div key={room.id} className="w-full max-w-60 h-32 sm:h-40">
              <Button
                onClick={() => handleRoomClick(room.id)}
                variant="secondary"
                className="w-full h-full px-4 py-8 bg-[#8B5E3C]/80 hover:bg-[#8B5E3C] rounded-lg flex justify-center items-center transition-colors duration-200 font-['Playfair_Display'] relative overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: `url('${room.image}')` }}
              >
                <div className="relative z-10 text-white text-sm sm:text-lg font-normal leading-7 bg-[#8B5E3C]/90 px-4 py-2 rounded-lg">
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

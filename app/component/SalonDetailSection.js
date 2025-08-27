"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Sofa, TvMinimal, LampDesk, Users, BookOpen, Wine } from "lucide-react";
import { CustomIcon } from "@/app/component/icons";
import { Breadcrumb } from "./Breadcrumb";

export function SalonDetailSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();

  // Salon 数据
  const salonData = {
    name: 'Salon',
    subtitle: 'Espace convivial pour se détendre et partager',
    images: ['/salon1.JPG'],
    description: `Notre salon incarne l’élégance du style campagne chic à la française. Surplombé d’un majestueux lustre vintage, il s’harmonise parfaitement avec les boiseries d’époque transmises dans notre famille. 

La hauteur sous plafond et les volumes généreux offrent une sensation d’espace et de liberté rare.
Au centre, une grande table à manger effet marbre invite à partager des repas conviviaux sous la lumière douce du lustre. Le sol est habillé d’un tapis signé Roche Bobois, qui ajoute une touche de raffinement et de confort.

Un bar discret permet de préparer un café le matin ou de savourer un cocktail en soirée. Le coin salon, véritable cocon de détente, est aménagé autour d’un canapé en cuir Roche Bobois posé sur un vaste tapis de 3 m². Face à une télévision de 2 mètres, encadrée par une élégante cheminée, cet espace devient le cœur chaleureux de la maison, parfait pour se retrouver en famille ou entre amis lors des soirées d’hiver.`,
    equipments: [
  { name: 'Grand canapé en cuir Roche Bobois', icon: 'Sofa', isLucide: true },
  { name: 'Télévision', icon: 'TvMinimal', isLucide: true },
  { name: 'Piano', icon: 'Piano' },
  { name: 'Système audio Bluetooth Devialet', icon: 'Speaker' },
  { name: 'Livres', icon: 'Livres' },
      { name: 'Jeux de société', icon: 'JeuxSociété' },
      { name: 'Table à manger', icon: 'tableManger' },
      { name: 'Chaise haute pour bébé', icon: 'ChaiseHaute' },
  { name: 'Cheminée', icon: 'Cheminee' },
      { name: 'Ventilateurs portables', icon: 'Ventilateurs' },
    { name: 'Chauffage central', icon: 'ChauffageCentral' },
  { name: 'Détecteur de fumée', icon: 'DetecteurFumee' },
  { name: 'Wifi', icon: 'Wifi' },
  { name: 'Espace bar à cocktails', icon: 'Martini' },
      { name: 'Machine à café à grain', icon: 'cafeGrains' }
    ]
  };

  // 其他房间
  const otherRooms = [
    { id: 'cuisine', name: 'Cuisine', image: '/cuisine.JPG' },
    { id: 'chambres', name: 'Chambres', image: '/ChRose.JPG' },
    { id: 'piscine', name: 'Piscine', image: '/piscine.JPG' },
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

  // 构建面包屑导航数据
  const breadcrumbItems = [
    { label: "Accueil", path: "/" },
    { label: "La maison", path: "/rooms" },
    { label: salonData.name, path: null }
  ];

  return (
    <div className="w-full px-24 pt-32 py-8 pb-32 bg-white inline-flex flex-col justify-start items-center gap-12 overflow-hidden">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Title Section */}
      <div className="w-full px-24 py-3 flex flex-col justify-center items-start gap-5 overflow-hidden">
        <div className="justify-start text-[#8B5E3C] text-4xl font-bold font-['Playfair_Display_SC'] leading-10 tracking-tight">
          {salonData.name}
        </div>
        <div className="justify-start text-black text-xs font-normal font-['Playfair_Display'] leading-none tracking-tight">
          {salonData.subtitle}
        </div>
      </div>

      {/* Main Image */}
      <div className="w-full px-24 flex items-center justify-center gap-6">
        <div className="w-[860px] h-[558px] relative overflow-hidden rounded-lg">
          <img 
            src={salonData.images[currentImageIndex]} 
            alt={salonData.name} 
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
            {salonData.description.split('\n\n').map((paragraph, index) => (
              <span key={index}>
                {paragraph}
                {index < salonData.description.split('\n\n').length - 1 && <><br/><br/></>}
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
          {salonData.equipments.map((equipment, index) => (
            <div 
              key={index} 
              className="w-full flex items-center gap-3 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              title={equipment.tooltip || equipment.name}
            >
              {equipment.isLucide ? (
                equipment.icon === 'Sofa' ? (
                  <Sofa className="w-8 h-8 text-[#D4AF37]" strokeWidth={1.5} />
                ) : equipment.icon === 'TvMinimal' ? (
                  <TvMinimal className="w-8 h-8 text-[#D4AF37]" strokeWidth={1.5} />
                ) : equipment.icon === 'LampDesk' ? (
                  <LampDesk className="w-8 h-8 text-[#D4AF37]" strokeWidth={1.5} />
                ) : equipment.icon === 'BookOpen' ? (
                  <BookOpen className="w-8 h-8 text-[#D4AF37]" strokeWidth={1.5} />
                ) : equipment.icon === 'Wine' ? (
                  <Wine className="w-8 h-8 text-[#D4AF37]" strokeWidth={1.5} />
                ) : equipment.icon === 'Users' ? (
                  <Users className="w-8 h-8 text-[#D4AF37]" strokeWidth={1.5} />
                ) : (
                  <CustomIcon name={equipment.icon} className="w-8 h-8 text-[#D4AF37]" />
                )
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

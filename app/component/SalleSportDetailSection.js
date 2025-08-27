"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Dumbbell, Users, Clock, Thermometer, TvMinimal, LampDesk, Speaker, Bike } from "lucide-react";
import { CustomIcon } from "@/app/component/icons";
import { Breadcrumb } from "./Breadcrumb";

export function SalleSportDetailSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();

  // Salle de Sport 数据
  const salleSportData = {
    name: 'Salle de Sport',
    subtitle: 'Espace fitness moderne pour votre bien-être',
    images: ['/salleDeSport.jpg'], // 唯一的照片
    description: `Moderne et spacieux, cet espace dédié au sport allie équipement complet et atmosphère chaleureuse grâce à un tapis moelleux qui invite à la détente.
Que vous souhaitiez soulever des poids, faire des abdominaux, ou pratiquer le yoga et le pilates en groupe, la salle peut accueillir plusieurs personnes simultanément grâce à ses nombreux tapis.
Un grand sac de frappe est disponible pour les amateurs de boxe, tandis qu’un vélo d’intérieur et une corde à sauter complètent l’équipement pour un entraînement complet.
Pour ceux qui aiment danser, cet espace peut aussi se transformer en piste de danse, offrant une polyvalence rare pour des moments de plaisir et de bien-être.`,
    equipments: [
      { name: 'Appareils de fitness', icon: 'Dumbbell', isLucide: true },
      { name: 'Vélo elliptique', icon: 'Bike', isLucide: true },
      { name: 'Système audio Bluetooth', icon: 'Speaker', isLucide: true },
      { name: 'Tapis de yoga', icon: 'yoga' },
      { name: 'Yoga', icon: 'yoga' },
      { name: 'Boxe', icon: 'boxe' },
      { name: 'Corde à sauter', icon: 'Corde' },

    ]
  };

  // 其他房间
  const otherRooms = [
    { id: 'cuisine', name: 'Cuisine', image: '/cuisine.JPG' },
    { id: 'chambres', name: 'Chambres', image: '/ChRose.JPG' },
    { id: 'salon', name: 'Salon', image: '/salon1.JPG' },
    { id: 'piscine', name: 'Piscine', image: '/piscine.JPG' },
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
    { label: salleSportData.name, path: null } // 当前页面不可点击
  ];

  return (
    <div className="w-full px-24 pt-32 py-8 pb-32 bg-white inline-flex flex-col justify-start items-center gap-12 overflow-hidden">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Title Section */}
      <div className="w-full px-24 py-3 flex flex-col justify-center items-start gap-5 overflow-hidden">
        <div className="justify-start text-[#8B5E3C] text-4xl font-bold font-['Playfair_Display_SC'] leading-10 tracking-tight">
          {salleSportData.name}
        </div>
        <div className="justify-start text-black text-xs font-normal font-['Playfair_Display'] leading-none tracking-tight">
          {salleSportData.subtitle}
        </div>
      </div>

      {/* Main Image */}
      <div className="w-full px-24 flex items-center justify-center gap-6">
        <div className="w-[860px] h-[558px] relative overflow-hidden rounded-lg">
          <img 
            src={salleSportData.images[0]} 
            alt={salleSportData.name} 
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
            {salleSportData.description.split('\n\n').map((paragraph, index) => (
              <span key={index}>
                {paragraph}
                {index < salleSportData.description.split('\n\n').length - 1 && <><br/><br/></>}
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
          {salleSportData.equipments.map((equipment, index) => (
            <div 
              key={index} 
              className="w-full flex items-center gap-3 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              title={equipment.tooltip || equipment.name}
            >
              {equipment.isLucide ? (
                equipment.icon === 'Dumbbell' ? (
                  <Dumbbell className="w-8 h-8 text-[#D4AF37]" strokeWidth={1.5} />
                ) : equipment.icon === 'Bike' ? (
                  <Bike className="w-8 h-8 text-[#D4AF37]" strokeWidth={1.5} />
                ) : equipment.icon === 'Speaker' ? (
                  <Speaker className="w-8 h-8 text-[#D4AF37]" strokeWidth={1.5} />
                ) : equipment.icon === 'TvMinimal' ? (
                  <TvMinimal className="w-8 h-8 text-[#D4AF37]" strokeWidth={1.5} />
                ) : equipment.icon === 'Thermometer' ? (
                  <Thermometer className="w-8 h-8 text-[#D4AF37]" strokeWidth={1.5} />
                ) : equipment.icon === 'LampDesk' ? (
                  <LampDesk className="w-8 h-8 text-[#D4AF37]" strokeWidth={1.5} />
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

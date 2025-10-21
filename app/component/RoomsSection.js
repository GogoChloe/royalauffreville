"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "./Breadcrumb";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

export function RoomsSection() {
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedRoom, setSelectedRoom] = useState(null);
  const router = useRouter();

  const rooms = [
    { id: 'salon', name: t.pieces.salon.name, image: '/salon1.JPG' },
    { id: 'piscine', name: t.pieces.piscine.name, image: '/piscine.JPG' },
    { id: 'cuisine', name: t.pieces.cuisine.name, image: '/cuisine.JPG' },
    { id: 'chambres', name: t.pieces.chambres.name, image: '/ChGN.JPG' },
    { id: 'salle-sport', name: t.pieces.gym.name, image: '/salleDeSport.jpg' },
    { id: 'espace-jeux', name: t.pieces.gameRoom.name, image: '/espaceJeux.JPG' },
    { id: 'jardin', name: t.pieces.garden.name, image: '/jardin.png' },
    { id: 'sous-sol', name: t.pieces.basement.name, image: '/sousSol.jpeg' },
  ];

  const handleRoomClick = (roomId) => {
    setSelectedRoom(roomId);
    // 导航到具体房间页面
    if (roomId === 'chambres') {
      router.push(`/rooms/${roomId}?from=maison`);
    } else {
      router.push(`/rooms/${roomId}`);
    }
  };

  // 构建面包屑导航数据
  const breadcrumbItems = [
    { label: t.roomsSection.breadcrumbHome, path: "/" },
    { label: t.roomsSection.breadcrumbHouse, path: null } // 当前页面不可点击
  ];

  return (
    <div className="w-full px-24 pt-32 py-8 pb-32 inline-flex flex-col justify-center items-center gap-12">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="self-stretch py-3 flex flex-col justify-center items-start gap-5 overflow-hidden">
        <div className="justify-start text-[#8B5E3C] text-3xl font-bold font-['Playfair_Display'] leading-9">{t.roomsSection.title}</div>
        <div className="justify-start text-neutral-700 text-xs font-normal font-['Playfair_Display'] leading-none tracking-tight">{t.roomsSection.subtitle}</div>
      </div>

  {/* Room Buttons Grid - 响应式 */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-18 justify-items-center w-full max-w-7xl mx-auto">
        {rooms.map((room) => (
          <div key={room.id} className="w-[18rem] h-[22rem]">
            <Button
              onClick={() => handleRoomClick(room.id)}
              variant="secondary"
              className="w-full h-full px-4 py-8 rounded-lg flex justify-center items-center font-['Playfair_Display'] relative overflow-hidden bg-cover bg-center hover:scale-105 transition-transform duration-200 cursor-pointer"
              style={{ backgroundImage: `url('${room.image}')` }}
            >
              <div className="relative z-10 text-white text-lg font-bold leading-7 bg-[#8B5E3C]/90 px-6 py-3 rounded-lg shadow-lg">
                {room.name}
              </div>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

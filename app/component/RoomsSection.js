"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function RoomsSection() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const router = useRouter();

  const rooms = [
    { id: 'cuisine', name: 'Cuisine', image: '/cuisine.JPG' },
    { id: 'chambres', name: 'Chambres', image: '/ChGN.JPG' },
    { id: 'salle-sport', name: 'Salle de Sport', image: '/salleDeSport.jpg' },
    { id: 'piscine', name: 'Piscine', image: '/piscine.JPG' },
    { id: 'sous-sol', name: 'sous-sol', image: '/sousSol.jpeg' },
    { id: 'espace-jeux', name: 'Espace jeux', image: '/espaceJeux.JPG' },
    { id: 'salon', name: 'Salon', image: '/salon1.JPG' },
    { id: 'jardin', name: 'Jardin', image: '/jardin.png' }
  ];

  const handleRoomClick = (roomId) => {
    setSelectedRoom(roomId);
    // 导航到具体房间页面
    router.push(`/rooms/${roomId}`);
  };

  return (
    <div className="w-full px-24 py-8 pb-32 inline-flex flex-col justify-center items-center gap-16">
      <div className="self-stretch inline-flex justify-start items-center gap-2.5 overflow-hidden">
        <div className="justify-start text-neutral-700 text-xs font-normal font-['Playfair_Display'] leading-none tracking-tight">Accueil &gt; Pièces</div>
      </div>
      
      <div className="self-stretch py-3 flex flex-col justify-center items-start gap-5 overflow-hidden">
        <div className="justify-start text-[#8B5E3C] text-3xl font-bold font-['Playfair_Display'] leading-9">Les pièces de la maison</div>
        <div className="justify-start text-neutral-700 text-xs font-normal font-['Playfair_Display'] leading-none tracking-tight">Découvrez chaque espace de notre magnifique demeure</div>
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

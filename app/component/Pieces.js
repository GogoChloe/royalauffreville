"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

// 房间数据
const getRoomsData = (t) => [
  {
    id: "salon",
    name: t.pieces.salon.name,
    description: t.pieces.salon.description,
    image: "/salon.jpg",
    isActive: true
  },
  {
    id: "chambres",
    name: t.pieces.chambres.name,
    description: t.pieces.chambres.description,
    image: "/chambre.jpg",
    isActive: false
  },
  {
    id: "piscine",
    name: t.pieces.piscine.name,
    description: t.pieces.piscine.description,
    image: "/piscine.JPG",
    isActive: false
  },
  {
    id: "cuisine",
    name: t.pieces.cuisine.name,
    description: t.pieces.cuisine.description,
    image: "/cuisine.jpg",
    isActive: false
  },
  {
    id: "salle-sport",
    name: t.pieces.gym.name,
    description: t.pieces.gym.description,
    image: "/salleDeSport.jpg",
    isActive: false
  },
  {
    id: "jardin",
    name: t.pieces.garden.name,
    description: t.pieces.garden.description,
    image: "/jardin.png",
    isActive: false
  },
  {
    id: "espace-jeux",
    name: t.pieces.gameRoom.name,
    description: t.pieces.gameRoom.description,
    image: "/espaceJeux.JPG",
    isActive: false
  },
  {
    id: "sous-sol",
    name: t.pieces.basement.name,
    description: t.pieces.basement.description,
    image: "/sousSol.jpeg",
    isActive: false
  }
];

export function Pieces() {
  const [activeRoom, setActiveRoom] = useState(0);
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language];
  const rooms = getRoomsData(t);

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRoom((prev) => (prev + 1) % rooms.length);
    }, 4000); // Change room every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const nextRoom = () => {
    setActiveRoom((prev) => (prev + 1) % rooms.length);
  };

  const prevRoom = () => {
    setActiveRoom((prev) => (prev - 1 + rooms.length) % rooms.length);
  };

  const currentRoom = rooms[activeRoom];

  return (
    <div className="w-full py-24 px-4 md:px-6 lg:px-8 flex flex-col justify-center items-center gap-12 bg-white overflow-hidden">
      {/* En-tête */}
      <div className="w-full max-w-6xl flex flex-col justify-center items-center gap-6 text-center">
        <h2 className="w-full text-[#8B5E3C] text-3xl md:text-4xl lg:text-5xl font-black font-playfair leading-tight">
          {t.pieces.title}
        </h2>
        <p className="w-full max-w-2xl text-[#3E3E3E] text-base md:text-lg font-normal font-playfair leading-7">
          {t.pieces.subtitle}
        </p>
      </div>

      {/* Section principale avec image et contenu */}
      <div className="w-full max-w-7xl pt-14 pb-12 bg-white flex flex-col justify-start items-center gap-10">
        {/* Image et description */}
        <div className="w-full px-4 md:px-8 lg:px-40 flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-28">
          {/* Image */}
          <div className="w-full max-w-md lg:w-96 flex-shrink-0">
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img 
                key={activeRoom} // Force re-render for transition
                className="w-full h-64 md:h-80 lg:h-[469px] object-cover transition-all duration-500 ease-in-out transform hover:scale-105" 
                src={currentRoom.image} 
                alt={currentRoom.name}
              />
            </div>
          </div>

          {/* Contenu */}
          <div className="w-full lg:w-[507px] flex flex-col justify-start items-start gap-4">
            {/* Titre */}
            <div className="w-full px-4 lg:px-10 py-4 lg:py-7">
              <h3 className="text-[#D4AF37] text-2xl md:text-3xl lg:text-4xl font-bold font-playfair leading-tight tracking-tight transition-all duration-300">
                {currentRoom.name}
              </h3>
            </div>

            {/* Description */}
            <div className="w-full px-4 lg:px-10 py-4">
              <p className="text-[#3E3E3E] text-base md:text-lg font-normal font-playfair leading-7 transition-all duration-300">
                {currentRoom.description}
              </p>
            </div>

            {/* Lien "En savoir plus" */}
            <div className="w-full px-4 lg:px-10 py-4 flex justify-end">
              <button
                onClick={() => {
                  console.log('En savoir plus clicked, navigating to:', `/rooms/${currentRoom.id}`);
                  window.location.href = `/rooms/${currentRoom.id}`;
                }}
                className="relative z-50 text-[#3E3E3E] text-lg font-normal font-playfair leading-7 hover:text-[#8B5E3C] transition-colors cursor-pointer"
              >
                {t.pieces.learnMore}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation des pièces */}
        <div className="w-full px-4 md:px-8 lg:px-20 py-4 flex justify-between items-center">
          {/* Bouton précédent */}
          <button
            onClick={prevRoom}
            className="p-2 text-[#8B5E3C] hover:text-[#D4AF37] transition-colors"
            aria-label="Pièce précédente"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Liste des pièces - fenêtre glissante de 3 éléments */}
          <div className="flex items-center gap-8 md:gap-12 lg:gap-16">
            {(() => {
              // Calculer les 3 pièces à afficher basées sur la pièce active
              const getVisibleRooms = () => {
                const visibleIndices = [];
                for (let i = 0; i < 3; i++) {
                  const index = (activeRoom - 1 + i + rooms.length) % rooms.length;
                  visibleIndices.push(index);
                }
                return visibleIndices;
              };

              const visibleIndices = getVisibleRooms();
              
              return visibleIndices.map((roomIndex, displayIndex) => (
                <button
                  key={rooms[roomIndex].id}
                  onClick={() => setActiveRoom(roomIndex)}
                  className={`text-sm sm:text-base md:text-lg font-playfair leading-7 transition-all duration-300 whitespace-nowrap ${
                    roomIndex === activeRoom
                      ? 'text-[#8B5E3C] font-semibold underline underline-offset-4'
                      : 'text-[#8B5E3C] font-normal hover:font-semibold'
                  }`}
                >
                  {rooms[roomIndex].name}
                </button>
              ));
            })()}
          </div>

          {/* Bouton suivant */}
          <button
            onClick={nextRoom}
            className="p-2 text-[#8B5E3C] hover:text-[#D4AF37] transition-colors"
            aria-label="Pièce suivante"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Bouton d'action */}
      <div className="flex justify-center items-center">
        <button
          onClick={() => {
            console.log('Voir toutes les pieces clicked');
            window.location.href = '/rooms';
          }}
          className="relative z-50 px-6 py-3 bg-[#8B5E3C] hover:bg-[#8B5E3C]/90 text-white text-base font-normal font-playfair leading-normal rounded-md transition-colors cursor-pointer"
        >
          {t.pieces.viewAll}
        </button>
      </div>
    </div>
  );
}
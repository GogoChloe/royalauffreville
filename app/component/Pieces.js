"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// 房间数据
const rooms = [
  {
    id: 1,
    name: "Salon",
    description: "Un espace de vie spacieux et élégant, parfait pour se détendre en famille ou entre amis. Décoré avec goût dans un style contemporain, le salon offre un cadre idéal pour des moments de convivialité.",
    image: "/salon.jpg",
    isActive: true
  },
  {
    id: 2,
    name: "Chambres",
    description: "Nos chambres allient confort et raffinement. Chacune dispose d'une salle de bain privative et d'une décoration soignée pour vous garantir un repos optimal.",
    image: "/chambre.jpg",
    isActive: false
  },
  {
    id: 3,
    name: "Piscines",
    description: "Profitez de notre magnifique piscine chauffée entourée d'un espace détente. L'endroit parfait pour se rafraîchir et profiter du soleil dans un cadre exceptionnel.",
    image: "/piscine.JPG",
    isActive: false
  },
  {
    id: 4,
    name: "Cuisine",
    description: "Une cuisine moderne et entièrement équipée avec des appareils haut de gamme. L'espace parfait pour préparer vos repas dans un environnement convivial et fonctionnel.",
    image: "/cuisine.jpg",
    isActive: false
  },
  {
    id: 5,
    name: "Salle de sport",
    description: "Maintenez votre forme physique dans notre salle de sport privée équipée d'appareils modernes. Un espace dédié au bien-être et à la remise en forme.",
    image: "/salleDeSport.jpg",
    isActive: false
  }
];

export function Pieces() {
  const [activeRoom, setActiveRoom] = useState(0);

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
          Explorez les différentes pièces de la maison
        </h2>
        <p className="w-full max-w-2xl text-[#3E3E3E] text-base md:text-lg font-normal font-playfair leading-7">
          Faites le tour de notre maison pièce par pièce, comme si vous y étiez.
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
              <button className="text-[#3E3E3E] text-lg font-normal font-playfair leading-7 hover:text-[#8B5E3C] transition-colors cursor-pointer">
                En savoir plus
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
        <Button className="px-6 py-3 bg-[#8B5E3C] hover:bg-[#8B5E3C]/90 text-white text-base font-normal font-playfair leading-normal rounded-md transition-colors">
          Voir toutes les pièces sur le plan
        </Button>
      </div>
    </div>
  );
}
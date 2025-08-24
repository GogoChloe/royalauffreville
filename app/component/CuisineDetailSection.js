"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Microwave, Refrigerator, Utensils, Flame, Wind, Coffee } from "lucide-react";

export function CuisineDetailSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();

  // 厨房图片
  const cuisineImages = [
    '/cuisine.JPG',
    '/cuisine1.jpg',
    '/cuisine11.JPG',
    '/cuisine111.JPG',
    '/cuisine1111.JPG',
    '/cuisine11111.JPG',
    '/cuisine12.JPG',
    '/cuisine123.JPG',
    '/cuisine2.JPG'
  ];

  // 设备列表
  const equipments = [
    { name: 'Four moderne', icon: Microwave },
    { name: 'Réfrigérateur grande capacité', icon: Refrigerator },
    { name: 'Lave-vaisselle', icon: Utensils },
    { name: 'Plaque de cuisson centrale', icon: Flame },
    { name: 'Hotte design avec commande à distance', icon: Wind },
    { name: 'Four vapeur', icon: Coffee }
  ];

  // 其他房间
  const otherRooms = [
    { id: 'salon', name: 'Salon', image: '/salon1.JPG' },
    { id: 'chambres', name: 'Chambres', image: '/ChGN.JPG' },
    { id: 'salle-sport', name: 'Salle de Sport', image: '/salleDeSport.jpg' },
    { id: 'piscine', name: 'Piscine', image: '/piscine.JPG' },
    { id: 'sous-sol', name: 'sous-sol', image: '/sousSol.jpeg' },
    { id: 'espace-jeux', name: 'Espace jeux', image: '/espaceJeux.JPG' }
  ];

  const handleRoomClick = (roomId) => {
    router.push(`/rooms/${roomId}`);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % cuisineImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + cuisineImages.length) % cuisineImages.length);
  };

  return (
    <div className="w-full bg-white inline-flex flex-col justify-start items-center gap-16 overflow-hidden">
      {/* Breadcrumb */}
      <div className="w-full px-24 py-8 inline-flex justify-start items-center gap-2.5 overflow-hidden">
        <div className="justify-start text-neutral-700 text-xs font-normal font-['Playfair_Display'] leading-none tracking-tight">
          Accueil &gt; Pièces &gt; Cuisine
        </div>
      </div>

      {/* Title Section */}
      <div className="w-full px-24 py-3 flex flex-col justify-center items-start gap-5 overflow-hidden">
        <div className="justify-start text-black text-4xl font-bold font-['Playfair_Display_SC'] leading-10 tracking-tight">
          Cuisine
        </div>
        <div className="justify-start text-[#8B5E3C] text-xs font-normal font-['Playfair_Display'] leading-none tracking-tight">
          Équipée pour régaler, pensée pour partager
        </div>
      </div>

      {/* Main Image with Navigation */}
      <div className="w-[860px] h-[558px] relative overflow-hidden rounded-lg">
        <img 
          src={cuisineImages[currentImageIndex]} 
          alt="Cuisine" 
          className="w-full h-full object-cover"
        />
        
        {/* Navigation Buttons */}
        <Button
          variant="secondary"
          size="icon"
          className="absolute left-6 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-[#D4AF37] hover:bg-[#B8941F] text-white rounded-full"
          onClick={prevImage}
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        
        <Button
          variant="secondary"
          size="icon"
          className="absolute right-6 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-[#D4AF37] hover:bg-[#B8941F] text-white rounded-full"
          onClick={nextImage}
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Thumbnail Images */}
      <div className="w-full px-24 py-3.5 inline-flex justify-start items-center gap-7 overflow-x-auto overflow-hidden">
        {cuisineImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-48 h-32 relative rounded-lg overflow-hidden transition-all duration-200 flex-shrink-0 ${
              index === currentImageIndex ? 'ring-2 ring-[#D4AF37]' : 'hover:opacity-80'
            }`}
          >
            <img 
              src={image} 
              alt={`Cuisine ${index + 1}`} 
              className="w-full h-full object-cover"
            />
          </button>
        ))}
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
            Pensée pour accueillir les repas de grandes tablées, notre cuisine allie fonctionnalité moderne et esprit convivial. 
            Chaque élément a été soigneusement sélectionné pour répondre aux besoins d'un groupe allant jusqu'à 12 personnes : 
            vaisselle, couverts, plats, verres etc., sont prévus en nombre.
            <br/><br/>
            L'organisation de l'espace a été conçue du point de vue de ceux qui cuisinent : un grand évier pour rincer, 
            de larges plans de travail pour découper, et une plaque de cuisson centrale, le tout formant un parcours fluide et ergonomique.
            Une hotte design, commandée à distance, permet d'ajuster l'éclairage et la ventilation selon vos envies.
            <br/><br/>
            Au cœur de la pièce, une grande table centrale accueille les préparations collectives : enfants qui épluchent, 
            amis qui participent, rires et recettes partagées. Un four, un four vapeur, un grand réfrigérateur et de nombreux 
            rangements complètent cet espace pensé pour vivre la cuisine à plusieurs – avec plaisir, aisance et générosité.
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
        <div className="self-stretch grid grid-cols-2 gap-4 max-w-4xl">
          {equipments.map((equipment, index) => {
            const IconComponent = equipment.icon;
            return (
              <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <IconComponent className="w-6 h-6 text-[#D4AF37]" />
                <span className="text-black text-sm font-normal font-['Playfair_Display']">
                  {equipment.name}
                </span>
              </div>
            );
          })}
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

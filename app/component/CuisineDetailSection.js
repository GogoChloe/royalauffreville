"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Microwave, Refrigerator, Utensils, Flame, Wind, Coffee, CookingPot } from "lucide-react";
import LaveVaisselleIcon from "./icons/LaveVaisselleIcon";
import FourMultifonctionIcon from "./icons/FourMultifonctionIcon";
import FourVapeurIcon from "./icons/FourVapeurIcon";
import KettleIcon from "./icons/KettleIcon";
import ToastIcon from "./icons/ToastIcon";
import InductionIcon from "./icons/InductionIcon";
import CafeGrainsIcon from "./icons/CafeGrainsIcon";
import BlenderIcon from "./icons/BlenderIcon";
import TableMangerIcon from "./icons/TableMangerIcon";
import { Breadcrumb } from "./Breadcrumb";

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
    { name: 'Réfrigérateur LG', icon: Refrigerator },
    { name: 'Four à micro-ondes', icon: Microwave },
    { name: 'Équipements de cuisine de base', icon: CookingPot },
    { name: 'Vaisselle et couverts', icon: Utensils },
    { name: 'Lave-vaisselle', icon: LaveVaisselleIcon },
    { name: 'Four multifonction Dietrich', icon: FourMultifonctionIcon },
    { name: 'Four vapeur Dietrich', icon: FourVapeurIcon },
    { name: 'Bouilloire électrique', icon: KettleIcon },
    { name: 'Grille-pain', icon: ToastIcon },
    { name: 'Plaque de cuisson', icon: InductionIcon },
    { name: 'Blender', icon: BlenderIcon },
    { name: 'Table à manger', icon: TableMangerIcon },
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

  // 挂载时插入金色滚动条样式
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!document.head.querySelector('style[data-gold-scrollbar]')) {
        const style = document.createElement('style');
        style.innerHTML = `
          .gold-scrollbar::-webkit-scrollbar {
            height: 8px;
          }
          .gold-scrollbar::-webkit-scrollbar-thumb {
            background: #D4AF37;
            border-radius: 4px;
          }
          .gold-scrollbar::-webkit-scrollbar-track {
            background: #F5F0E6;
          }
        `;
        style.setAttribute('data-gold-scrollbar', 'true');
        document.head.appendChild(style);
      }
    }
  }, []);

  // 构建面包屑导航数据
  const breadcrumbItems = [
    { label: "Accueil", path: "/" },
    { label: "La maison", path: "/rooms" },
    { label: "Cuisine", path: null } // 当前页面不可点击
  ];

  return (
  <div className="w-full bg-white flex flex-col justify-start items-center gap-12 overflow-hidden pt-32">
      {/* Breadcrumb */}
      <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24 py-8 inline-flex justify-start items-center gap-2.5 overflow-hidden">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Title Section */}
      <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24 py-3 flex flex-col justify-center items-start gap-5 overflow-hidden">
        <div className="justify-start text-2xl sm:text-3xl md:text-4xl font-bold text-[#8B5E3C] font-['Playfair_Display_SC'] leading-tight tracking-tight">
          Cuisine
        </div>
        <div className="justify-start  text-xs font-normal font-['Playfair_Display'] leading-none tracking-tight">
          Équipée pour régaler, pensée pour partager
        </div>
      </div>

      {/* Main Image with Navigation */}
      <div className="w-full flex justify-center items-center gap-2 md:gap-6">
        {/* 左侧按钮 */}
        <Button
          variant="secondary"
          size="icon"
          className="w-10 h-10 bg-[#D4AF37] hover:bg-[#B8941F] text-white rounded-full flex-shrink-0"
          onClick={prevImage}
        >
          <ChevronLeft className="w-6 h-6" strokeWidth={1.5} />
        </Button>
        {/* 主图 */}
        <div className="w-[320px] sm:w-[480px] md:w-[700px] lg:w-[860px] h-[200px] sm:h-[320px] md:h-[420px] lg:h-[558px] relative overflow-hidden rounded-lg">
          <img 
            src={cuisineImages[currentImageIndex]} 
            alt="Cuisine" 
            className="w-full h-full object-cover"
          />
        </div>
        {/* 右侧按钮 */}
        <Button
          variant="secondary"
          size="icon"
          className="w-10 h-10 bg-[#D4AF37] hover:bg-[#B8941F] text-white rounded-full flex-shrink-0"
          onClick={nextImage}
        >
          <ChevronRight className="w-6 h-6" strokeWidth={1.5} />
        </Button>
      </div>

      {/* Thumbnail Images */}
      <div className="gold-scrollbar w-full px-24 py-3.5 inline-flex justify-start items-center gap-7 overflow-x-auto overflow-hidden">
        {cuisineImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-48 h-32 relative rounded-lg overflow-hidden transition-all duration-200 flex-shrink-0 border-2 ${
              index === currentImageIndex
                ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]'
                : 'border-[#D4AF37]/40 bg-[#F5F0E6] hover:bg-[#D4AF37]/10'
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
      <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24 py-2.5 flex flex-col justify-start items-start gap-6 overflow-hidden">
        <div className="self-stretch h-12 py-5 inline-flex justify-start items-center gap-2.5 overflow-hidden">
          <div className="justify-start text-black text-xl sm:text-2xl md:text-3xl font-bold font-['Playfair_Display_SC'] leading-9">
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

      {/* Cuisine et salle à manger Section */}
   
      {/* Equipment Section */}
      <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24 flex flex-col justify-start items-start gap-11 overflow-hidden">
        <div className="w-full relative overflow-hidden">
          <div className="justify-start text-black text-xl sm:text-2xl md:text-3xl font-bold font-['Playfair_Display_SC'] leading-9">
            Équipements
          </div>
        </div>
        <div className="w-full self-stretch grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10 px-4 md:px-8">
          {equipments.map((equipment, index) => {
            const IconComponent = equipment.icon;
            return (
              <div key={index} className="w-full flex items-center gap-3 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                <IconComponent className="w-8 h-8 text-[#D4AF37] bg-transparent" />
                <span className="text-black text-sm font-normal font-['Playfair_Display']">
                  {equipment.name}
                </span>
              </div>
            );
          })}
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

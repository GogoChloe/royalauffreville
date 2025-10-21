"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, BedDouble, ThermometerSun, Wifi, LampDesk, TvMinimal, ShowerHead, Bath, Shirt, Toilet } from "lucide-react";
import { CustomIcon } from "@/app/component/icons";
import { Breadcrumb } from "./Breadcrumb";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

export function ChambreDetailSection({ chambreId }) {
  const { language } = useLanguage();
  const t = translations[language];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fromMaison, setFromMaison] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // 检查是否从 La maison 页面来的
    const from = searchParams.get('from');
    if (from === 'maison') {
      setFromMaison(true);
    }
  }, [searchParams]);

    // 根据chambreId获取对应的卧室数据
  const chambreData = {
    'princess-rose': {
      name: 'Princess Rose',
      subtitle: t.chambreDetails.princessRose.subtitle,
      images: ['/ChRose.JPG', '/ChRose1.JPG', '/ChRose2.JPG'],
      description: t.chambreDetails.princessRose.description,
      equipments: [
        { name: t.equipments.queenBed, icon: 'BedDouble', tooltip: '180×200cm', isLucide: true },
        { name: t.equipments.shower, icon: 'ShowerHead', isLucide: true },
        { name: t.equipments.towelsAndBedLinens, icon: 'Serviettes' },
        { name: t.equipments.closetAndHangers, icon: 'Cintres' },
        { name: t.equipments.hairDryer, icon: 'cheveux' },
        { name: t.equipments.hotWater, icon: 'EauChaude' },
        { name: t.equipments.showerGelAndShampoo, icon: 'ShampooGelDouche' },
        { name: t.equipments.babyBedOnDemand, icon: 'babybed' },
        { name: t.equipments.fans, icon: 'Ventilateurs' },
        { name: t.equipments.heating, icon: 'ThermometerSun', isLucide: true },
        { name: t.equipments.wifi, icon: 'Wifi', isLucide: true },
        { name: t.equipments.television, icon: 'TvMinimal', isLucide: true },
        { name: t.equipments.gardenView, icon: 'VueSurLeJardin' },
        { name: t.equipments.dedicatedWorkspace, icon: 'LampDesk', isLucide: true }
      ]
    },
    'strong-marble': {
      name: 'Strong Marble',
      subtitle: t.chambreDetails.strongMarble.subtitle,
      images: ['/ChGN.JPG'],
  description: t.chambreDetails.strongMarble.description,
      equipments: [
        { name: t.equipments.queenBed, icon: 'BedDouble', tooltip: '180×200cm', isLucide: true },
        { name: t.equipments.shower, icon: 'ShowerHead', isLucide: true },
        { name: t.equipments.towelsAndBedLinens, icon: 'Serviettes' },
        { name: t.equipments.closetAndHangers, icon: 'Cintres' },
        { name: t.equipments.hairDryer, icon: 'cheveux' },
        { name: t.equipments.hotWater, icon: 'EauChaude' },
        { name: t.equipments.showerGelAndShampoo, icon: 'ShampooGelDouche' },
        { name: t.equipments.babyBedOnDemand, icon: 'babybed' },
        { name: t.equipments.fans, icon: 'Ventilateurs' },
        { name: t.equipments.heating, icon: 'ThermometerSun', isLucide: true },
        { name: t.equipments.wifi, icon: 'Wifi', isLucide: true },
        { name: t.equipments.television, icon: 'TvMinimal', isLucide: true },
        { name: t.equipments.gardenView, icon: 'VueSurLeJardin' },
        { name: t.equipments.poolView, icon: 'VueSurLaPiscine' },
        { name: t.equipments.dedicatedWorkspace, icon: 'LampDesk', isLucide: true }
      ]
    },
    'bird-vintage': {
      name: 'Bird Vintage',
      subtitle: t.chambreDetails.birdVintage.subtitle,
      images: ['/Chvint1.JPG', '/Chvint2.JPG', '/Chvint3.JPG', '/Chvint4.JPG', '/Chvint5.JPG'],
  description: t.chambreDetails.birdVintage.description,
      equipments: [
        { name: t.equipments.queenBed, icon: 'BedDouble', tooltip: '200×200cm', isLucide: true },
        { name: t.equipments.towelsAndBedLinens, icon: 'Serviettes' },
        { name: t.equipments.closetAndHangers, icon: 'Cintres' },
        { name: t.equipments.hairDryer, icon: 'cheveux' },
        { name: t.equipments.hotWater, icon: 'EauChaude' },
        { name: t.equipments.showerGelAndShampoo, icon: 'ShampooGelDouche' },
        { name: t.equipments.babyBedOnDemand, icon: 'babybed' },
        { name: t.equipments.fans, icon: 'Ventilateurs' },
        { name: t.equipments.heating, icon: 'ThermometerSun', isLucide: true },
        { name: t.equipments.wifi, icon: 'Wifi', isLucide: true },
        { name: t.equipments.television, icon: 'TvMinimal', isLucide: true },
        { name: t.equipments.gardenView, icon: 'VueSurLeJardin' },
        { name: t.equipments.bathtubAndShower, icon: 'Bath', isLucide: true },
        { name: t.equipments.bidet, icon: 'Bidet' },
        { name: t.equipments.dressingRoom, icon: 'Shirt', isLucide: true },
        { name: t.equipments.iron, icon: 'repasser' },
        { name: t.equipments.dedicatedWorkspace, icon: 'LampDesk', isLucide: true }
      ]
    },
    'royal-auffreville': {
      name: 'Royal Auffreville',
      subtitle: t.chambreDetails.royalAuffreville.subtitle,
      images: ['/ChRose.JPG'],
  description: t.chambreDetails.royalAuffreville.description,
      equipments: [
        { name: t.equipments.kingBed, icon: 'BedDouble', tooltip: '200×200cm', isLucide: true },
        { name: t.equipments.shower, icon: 'ShowerHead', isLucide: true },
        { name: t.equipments.bathtub, icon: 'Bath', isLucide: true },
        { name: t.equipments.towelsAndBedLinens, icon: 'Serviettes' },
        { name: t.equipments.closetAndHangers, icon: 'Cintres' },
        { name: t.equipments.hairDryer, icon: 'cheveux' },
        { name: t.equipments.hotWater, icon: 'EauChaude' },
        { name: t.equipments.showerGelAndShampoo, icon: 'ShampooGelDouche' },
        { name: t.equipments.babyBedOnDemand, icon: 'babybed' },
        { name: t.equipments.fans, icon: 'Ventilateurs' },
        { name: t.equipments.heating, icon: 'ThermometerSun', isLucide: true },
        { name: t.equipments.wifi, icon: 'Wifi', isLucide: true },
        { name: t.equipments.television, icon: 'TvMinimal', isLucide: true },
        { name: t.equipments.gardenView, icon: 'VueSurLeJardin' },
        { name: t.equipments.poolView, icon: 'VueSurLaPiscine' },
        { name: t.equipments.separateToilet, icon: 'Toilet', isLucide: true },
        { name: t.equipments.iron, icon: 'repasser' },
        { name: t.equipments.dressingRoom, icon: 'Shirt', isLucide: true },
        { name: t.equipments.dedicatedWorkspace, icon: 'LampDesk', isLucide: true }
      ]
    },
    'good-night': {
      name: 'Good Night',
      subtitle: t.chambreDetails.goodNight.subtitle,
      images: ['/Chvint2.JPG'],
  description: t.chambreDetails.goodNight.description,
      equipments: [
        { name: t.equipments.kingBed, icon: 'BedDouble', tooltip: '200×200cm', isLucide: true },
        { name: t.equipments.towelsAndBedLinens, icon: 'Serviettes' },
        { name: t.equipments.showerGelAndShampoo, icon: 'ShampooGelDouche' },
        { name: t.equipments.babyBedOnDemand, icon: 'babybed' },
        { name: t.equipments.fans, icon: 'Ventilateurs' },
        { name: t.equipments.heating, icon: 'ThermometerSun', isLucide: true },
        { name: t.equipments.wifi, icon: 'Wifi', isLucide: true },
        { name: t.equipments.television, icon: 'TvMinimal', isLucide: true },
        { name: t.equipments.gardenView, icon: 'VueSurLeJardin' },
        { name: t.equipments.dedicatedWorkspace, icon: 'LampDesk', isLucide: true }
      ]
    },
    'amazon-fun': {
      name: 'Amazon Fun',
      subtitle: t.chambreDetails.amazonFun.subtitle,
      images: ['/Chvint3.JPG'],
      description: t.chambreDetails.amazonFun.description,
      equipments: [
        { name: t.equipments.normalBed, icon: 'BedDouble', tooltip: '160×180cm', isLucide: true },
        { name: t.equipments.bathtubAndShower, icon: 'Bath', isLucide: true },
        { name: t.equipments.towelsAndBedLinens, icon: 'Serviettes' },
        { name: t.equipments.closetAndHangers, icon: 'Cintres' },
        { name: t.equipments.hairDryer, icon: 'cheveux' },
        { name: t.equipments.hotWater, icon: 'EauChaude' },
        { name: t.equipments.showerGelAndShampoo, icon: 'ShampooGelDouche' },
        { name: t.equipments.babyBedOnDemand, icon: 'babybed' },
        { name: t.equipments.fans, icon: 'Ventilateurs' },
        { name: t.equipments.heating, icon: 'ThermometerSun', isLucide: true },
        { name: t.equipments.wifi, icon: 'Wifi', isLucide: true },
        { name: t.equipments.television, icon: 'TvMinimal', isLucide: true },
        { name: t.equipments.gardenView, icon: 'VueSurLeJardin' },
        { name: t.equipments.separateToilet, icon: 'Toilet', isLucide: true },
        { name: t.equipments.dressingRoom, icon: 'Shirt', isLucide: true },
        { name: t.equipments.dedicatedWorkspace, icon: 'LampDesk', isLucide: true }
      ]
    }
  };

  const currentChambre = chambreData[chambreId];
  
  if (!currentChambre) {
    return <div>Chambre non trouvée</div>;
  }

  // 其他房间
  const otherRooms = [
    { id: 'cuisine', name: 'Cuisine', image: '/cuisine.JPG' },
    { id: 'salon', name: 'Salon', image: '/salon1.JPG' },
    { id: 'salle-sport', name: 'Salle de Sport', image: '/salleDeSport.jpg' },
    { id: 'piscine', name: 'Piscine', image: '/piscine.JPG' },
    { id: 'sous-sol', name: 'Sous-sol', image: '/sousSol.jpeg' },
    { id: 'espace-jeux', name: 'Espace jeux', image: '/espaceJeux.JPG' }
  ];

  const handleRoomClick = (roomId) => {
    if (roomId === 'chambres') {
      router.push(`/rooms/chambres?from=maison`);
    } else {
      router.push(`/rooms/${roomId}`);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % currentChambre.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + currentChambre.images.length) % currentChambre.images.length);
  };

  // 构建面包屑导航数据
  const breadcrumbItems = fromMaison 
    ? [
        { label: t.chambreDetail.breadcrumbHome, path: "/" },
        { label: t.chambreDetail.breadcrumbHouse, path: "/rooms" },
        { label: t.chambreDetail.breadcrumbChambers, path: "/rooms/chambres?from=maison" },
        { label: currentChambre.name, path: null } // 当前页面不可点击
      ]
    : [
        { label: t.chambreDetail.breadcrumbHome, path: "/" },
        { label: t.chambreDetail.breadcrumbRooms, path: "/rooms" },
        { label: t.chambreDetail.breadcrumbChambers, path: "/rooms/chambres" },
        { label: currentChambre.name, path: null } // 当前页面不可点击
      ];

  return (
    <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24 pt-32 py-8 pb-32 bg-white inline-flex flex-col justify-start items-center gap-12 overflow-hidden">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Title Section */}
      <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24 py-3 flex flex-col justify-center items-start gap-5 overflow-hidden">
        <div className="justify-start text-[#8B5E3C] text-2xl sm:text-3xl md:text-4xl font-bold font-['Playfair_Display_SC'] leading-tight tracking-tight">
          {currentChambre.name}
        </div>
        <div className="justify-start text-black text-xs font-normal font-['Playfair_Display'] leading-none tracking-tight">
          {currentChambre.subtitle}
        </div>
      </div>

      {/* Main Image with External Navigation */}
      <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24 flex items-center justify-center gap-2 md:gap-6">
        {/* Left Navigation Button */}
        {currentChambre.images.length > 1 && (
          <Button
            variant="secondary"
            size="icon"
            className="w-10 h-10 md:w-12 md:h-12 bg-[#D4AF37] hover:bg-[#B8941F] text-white rounded-full flex-shrink-0"
            onClick={prevImage}
          >
            <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
          </Button>
        )}
        
        {/* Main Image */}
        <div className="w-full max-w-[320px] h-[200px] sm:max-w-[480px] sm:h-[300px] md:max-w-[700px] md:h-[420px] lg:max-w-[860px] lg:h-[558px] relative overflow-hidden rounded-lg">
          <img 
            src={currentChambre.images[currentImageIndex]} 
            alt={currentChambre.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Right Navigation Button */}
        {currentChambre.images.length > 1 && (
          <Button
            variant="secondary"
            size="icon"
            className="w-10 h-10 md:w-12 md:h-12 bg-[#D4AF37] hover:bg-[#B8941F] text-white rounded-full flex-shrink-0"
            onClick={nextImage}
          >
            <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
          </Button>
        )}
      </div>

      {/* Thumbnail Images - only show if more than 1 image */}
      {currentChambre.images.length > 1 && (
        <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24 py-3.5 inline-flex justify-start items-center gap-4 md:gap-7 overflow-x-auto overflow-hidden">
          {currentChambre.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-32 h-20 md:w-48 md:h-32 relative rounded-lg overflow-hidden transition-all duration-200 flex-shrink-0 ${
                index === currentImageIndex ? 'ring-2 ring-[#D4AF37]' : 'hover:opacity-80'
              }`}
            >
              <img 
                src={image} 
                alt={`${currentChambre.name} ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Description Section */}
      <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24 py-2.5 flex flex-col justify-start items-start gap-6 overflow-hidden">
        <div className="self-stretch h-12 py-5 inline-flex justify-start items-center gap-2.5 overflow-hidden">
          <div className="justify-start text-black text-xl sm:text-2xl md:text-3xl font-bold font-['Playfair_Display_SC'] leading-9">
            {t.chambreDetail.description}
          </div>
        </div>
        <div className="self-stretch inline-flex justify-start items-start gap-2.5 overflow-hidden">
          <div className="flex-1 text-black text-sm font-normal font-['Playfair_Display'] leading-snug tracking-tight">
            {currentChambre.description.split('\n\n').map((paragraph, index) => (
              <span key={index}>
                {paragraph}
                {index < currentChambre.description.split('\n\n').length - 1 && <><br/><br/></>}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Equipment Section */}
      <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24 flex flex-col justify-start items-start gap-11 overflow-hidden">
        <div className="w-full relative overflow-hidden">
          <div className="justify-start text-black text-xl sm:text-2xl md:text-3xl font-bold font-['Playfair_Display_SC'] leading-9">
            {t.chambreDetail.equipment}
          </div>
        </div>
        <div className="w-full self-stretch grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10 px-4 md:px-8">
          {currentChambre.equipments.map((equipment, index) => (
            <div 
              key={index} 
              className="w-full flex items-center gap-3 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              title={equipment.tooltip || equipment.name}
            >
              {equipment.isLucide ? (
                equipment.icon === 'BedDouble' ? (
                  <BedDouble className="w-8 h-8 text-[#D4AF37]" strokeWidth={1.5} />
                ) : equipment.icon === 'ThermometerSun' ? (
                  <ThermometerSun className="w-8 h-8 text-[#D4AF37]" strokeWidth={1.5} />
                ) : equipment.icon === 'Wifi' ? (
                  <Wifi className="w-8 h-8 text-[#D4AF37]" strokeWidth={1.5} />
                ) : equipment.icon === 'LampDesk' ? (
                  <LampDesk className="w-8 h-8 text-[#D4AF37]" strokeWidth={1.5} />
                ) : equipment.icon === 'TvMinimal' ? (
                  <TvMinimal className="w-8 h-8 text-[#D4AF37]" strokeWidth={1.5} />
                ) : equipment.icon === 'ShowerHead' ? (
                  <ShowerHead className="w-8 h-8 text-[#D4AF37]" strokeWidth={1.5} />
                ) : equipment.icon === 'Bath' ? (
                  <Bath className="w-8 h-8 text-[#D4AF37]" strokeWidth={1.5} />
                ) : equipment.icon === 'Shirt' ? (
                  <Shirt className="w-8 h-8 text-[#D4AF37]" strokeWidth={1.5} />
                ) : equipment.icon === 'Toilet' ? (
                  <Toilet className="w-8 h-8 text-[#D4AF37]" strokeWidth={1.5} />
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
      <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24 py-7 inline-flex flex-col justify-start items-start gap-8 overflow-hidden">
        <div className="w-full relative overflow-hidden">
          <div className="justify-start text-black text-xl sm:text-2xl md:text-3xl font-bold font-['Playfair_Display_SC'] leading-9">
            {t.chambreDetail.otherRooms}
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
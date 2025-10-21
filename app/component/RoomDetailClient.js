"use client";

import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

export function RoomDetailClient({ roomId }) {
  const { language } = useLanguage();
  const t = translations[language];

  // 其他房间的信息映射
  const roomInfo = {
    'chambres': {
      title: t.pieces.chambres.name,
      description: t.pieces.chambres.description,
      features: [
        language === 'fr' ? 'Lit king-size' : language === 'en' ? 'King-size bed' : '特大号床',
        language === 'fr' ? 'Armoire spacieuse' : language === 'en' ? 'Spacious wardrobe' : '宽敞的衣柜',
        language === 'fr' ? 'Vue sur le jardin' : language === 'en' ? 'Garden view' : '花园景观',
        language === 'fr' ? 'Climatisation' : language === 'en' ? 'Air conditioning' : '空调'
      ]
    },
    'salle-sport': {
      title: t.pieces.gym.name,
      description: t.pieces.gym.description,
      features: [
        language === 'fr' ? 'Équipements modernes' : language === 'en' ? 'Modern equipment' : '现代设备',
        language === 'fr' ? 'Miroirs muraux' : language === 'en' ? 'Wall mirrors' : '墙面镜子',
        language === 'fr' ? 'Tapis de yoga' : language === 'en' ? 'Yoga mats' : '瑜伽垫',
        language === 'fr' ? 'Ventilation optimale' : language === 'en' ? 'Optimal ventilation' : '最佳通风'
      ]
    },
    'piscine': {
      title: t.pieces.piscine.name,
      description: t.pieces.piscine.description,
      features: [
        language === 'fr' ? 'Piscine chauffée' : language === 'en' ? 'Heated pool' : '加热泳池',
        language === 'fr' ? 'Transats' : language === 'en' ? 'Deck chairs' : '躺椅',
        language === 'fr' ? 'Parasols' : language === 'en' ? 'Umbrellas' : '遮阳伞',
        language === 'fr' ? 'Douche extérieure' : language === 'en' ? 'Outdoor shower' : '户外淋浴'
      ]
    },
    'sous-sol': {
      title: t.pieces.basement.name,
      description: t.pieces.basement.description,
      features: [
        language === 'fr' ? 'Cave à vin' : language === 'en' ? 'Wine cellar' : '酒窖',
        language === 'fr' ? 'Espace de rangement' : language === 'en' ? 'Storage space' : '储藏空间',
        language === 'fr' ? 'Buanderie' : language === 'en' ? 'Laundry room' : '洗衣房',
        language === 'fr' ? 'Atelier' : language === 'en' ? 'Workshop' : '工作室'
      ]
    },
    'espace-jeux': {
      title: t.pieces.gameRoom.name,
      description: t.pieces.gameRoom.description,
      features: [
        language === 'fr' ? 'Baby-foot' : language === 'en' ? 'Table football' : '桌上足球',
        language === 'fr' ? 'Billard' : language === 'en' ? 'Billiards' : '台球',
        language === 'fr' ? 'Jeux de société' : language === 'en' ? 'Board games' : '棋盘游戏',
        language === 'fr' ? 'Console de jeux' : language === 'en' ? 'Game console' : '游戏机'
      ]
    },
    'salon': {
      title: t.pieces.salon.name,
      description: t.pieces.salon.description,
      features: [
        language === 'fr' ? 'Canapé en cuir' : language === 'en' ? 'Leather sofa' : '皮革沙发',
        language === 'fr' ? 'Cheminée' : language === 'en' ? 'Fireplace' : '壁炉',
        language === 'fr' ? 'TV grand écran' : language === 'en' ? 'Large screen TV' : '大屏幕电视',
        language === 'fr' ? 'Bibliothèque' : language === 'en' ? 'Library' : '图书馆'
      ]
    },
    'jardin': {
      title: t.pieces.garden.name,
      description: t.pieces.garden.description,
      features: [
        language === 'fr' ? 'Pelouse entretenue' : language === 'en' ? 'Maintained lawn' : '修剪整齐的草坪',
        language === 'fr' ? 'Arbres fruitiers' : language === 'en' ? 'Fruit trees' : '果树',
        language === 'fr' ? 'Terrasse' : language === 'en' ? 'Terrace' : '露台',
        language === 'fr' ? 'Barbecue' : language === 'en' ? 'BBQ' : '烧烤架'
      ]
    }
  };

  const room = roomInfo[roomId] || {
    title: t.roomsPage.title,
    description: t.roomsPage.notFound,
    features: []
  };

  return (
    <main className="px-14 py-8">
      {/* Breadcrumb */}
      <div className="mb-8">
        <div className="text-neutral-700 text-xs font-normal font-['Playfair_Display'] leading-none tracking-tight">
          {t.roomsPage.breadcrumbHome} &gt; {t.roomsPage.breadcrumbRooms} &gt; {room.title}
        </div>
      </div>

      {/* Room Details */}
      <div className="max-w-4xl">
        <h1 className="text-black text-3xl font-bold font-['Playfair_Display_SC'] leading-9 mb-6">
          {room.title}
        </h1>
        
        <div className="mb-8">
          <p className="text-neutral-700 text-lg font-normal font-['Playfair_Display'] leading-relaxed">
            {room.description}
          </p>
        </div>

        {/* Features */}
        <div className="mb-8">
          <h2 className="text-black text-xl font-bold font-['Playfair_Display'] leading-7 mb-4">
            {t.roomsPage.features}
          </h2>
          <ul className="space-y-2">
            {room.features.map((feature, index) => (
              <li key={index} className="text-neutral-700 text-base font-normal font-['Playfair_Display'] leading-normal flex items-center">
                <span className="w-2 h-2 bg-[#D4AF37] rounded-full mr-3"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Photo placeholder */}
        <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center mb-8">
          <span className="text-gray-500 font-['Playfair_Display']">{t.roomsPage.photoOf} {room.title}</span>
        </div>
      </div>
    </main>
  );
}

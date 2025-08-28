"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, BedDouble, ThermometerSun, Wifi, LampDesk, TvMinimal, ShowerHead, Bath, Shirt, Toilet } from "lucide-react";
import { CustomIcon } from "@/app/component/icons";
import { Breadcrumb } from "./Breadcrumb";

export function ChambreDetailSection({ chambreId }) {
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
      subtitle: 'Romance et douceur dans les tons rosés',
      images: ['/ChRose.JPG', '/ChRose1.JPG', '/ChRose2.JPG'],
  description: `Nichée au cœur de l’aile est, la PRINCESS ROSE séduit par son atmosphère délicate, entre raffinement discret et charme assumé. Les teintes tendres et les lignes épurées évoquent un univers de conte de fées moderne, où chaque détail invite au bien-être.

La chambre est équipée d’un lit king-size haut de gamme, d’une grande télévision à écran plat et d’un large bureau, parfait pour écrire, lire ou simplement savourer un moment à soi. Un placard dissimulé optimise l’espace tout en offrant un rangement généreux.

La salle de bain attenante surprend par son style industriel contemporain : douche à l’italienne aux lignes nettes, vasque moderne, meubles soigneusement choisis pour leur esthétique et leur fonctionnalité. Une belle dualité entre douceur romantique et caractère affirmé.

Un cocon à la fois poétique et fonctionnel, idéal pour celles et ceux qui aiment allier confort et personnalité.`,
      equipments: [
        { name: 'Lit Queen Size', icon: 'BedDouble', tooltip: '180×200cm', isLucide: true },
        { name: 'Douche', icon: 'ShowerHead', isLucide: true },
        { name: 'Serviettes et ligne de lit', icon: 'Serviettes' },
        { name: 'Placard et Cintres', icon: 'Cintres' },
        { name: 'Sèche-cheveux', icon: 'cheveux' },
        { name: 'Eau chaude', icon: 'EauChaude' },
        { name: 'Gel douche et Shampooing', icon: 'ShampooGelDouche' },
        { name: 'Lit pour bébé à la demande', icon: 'babybed' },
        { name: 'Ventilateurs portables', icon: 'Ventilateurs' },
        { name: 'Chauffage central', icon: 'ThermometerSun', isLucide: true },
        { name: 'Wifi', icon: 'Wifi', isLucide: true },
        { name: 'TV', icon: 'TvMinimal', isLucide: true },
        { name: 'Vue sur le jardin', icon: 'VueSurLeJardin' },
        { name: 'Espace de travail dédié', icon: 'LampDesk', isLucide: true }
      ]
    },
    'strong-marble': {
      name: 'Strong Marble',
      subtitle: 'Élégance moderne avec touches de marbre',
      images: ['/ChGN.JPG'],
  description: `La Chambre Strong Marble impressionne par son style sobre et raffiné, entièrement pensé autour de la matière noble qu’est le marbre. La salle de bain attenante, entièrement habillée de marbre clair, évoque le luxe sans ostentation : vasque taillée, robinetterie design, douche italienne moderne, chaque élément a été choisi avec une exigence rare par la propriétaire.

La chambre offre une belle luminosité naturelle grâce à ses deux fenêtres, qui ouvrent la vue sur le jardin et laissent entrer la lumière du matin. Côté tête de lit, un meuble sur mesure, conçu et réalisé par la propriétaire elle-même, intègre des luminaires discrets pour un confort optimal en soirée — parfait pour lire au lit dans une ambiance feutrée.

Épure, équilibre, sophistication discrète : Strongmarble est une chambre de caractère, pensée comme une bulle de confort contemporain. `,
      equipments: [
        { name: 'Lit Queen Size', icon: 'BedDouble', tooltip: '180×200cm', isLucide: true },
        { name: 'Douche', icon: 'ShowerHead', isLucide: true },
        { name: 'Serviettes et ligne de lit', icon: 'Serviettes' },
        { name: 'Placard et Cintres', icon: 'Cintres' },
        { name: 'Sèche-cheveux', icon: 'cheveux' },
        { name: 'Eau chaude', icon: 'EauChaude' },
        { name: 'Gel douche et Shampooing', icon: 'ShampooGelDouche' },
        { name: 'Lit pour bébé à la demande', icon: 'babybed' },
        { name: 'Ventilateurs portables', icon: 'Ventilateurs' },
        { name: 'Chauffage central', icon: 'ThermometerSun', isLucide: true },
        { name: 'Wifi', icon: 'Wifi', isLucide: true },
        { name: 'TV', icon: 'TvMinimal', isLucide: true },
        { name: 'Vue sur le jardin', icon: 'VueSurLeJardin' },
        { name: 'Vue sur la piscine', icon: 'VueSurLaPiscine' },
        { name: 'Espace de travail dédié', icon: 'LampDesk', isLucide: true }
      ]
    },
    'bird-vintage': {
      name: 'Bird Vintage',
      subtitle: 'Charme rétro et authenticité d\'époque',
      images: ['/Chvint1.JPG', '/Chvint2.JPG', '/Chvint3.JPG', '/Chvint4.JPG', '/Chvint5.JPG'],
  description: `Dans cette chambre au style vintage délicatement assumé, tout évoque le calme, la nature et une douceur d’antan. 
Le lit king-size promet un confort irréprochable, accompagné d’une literie haut de gamme pour des nuits pleines de quiétude. Une télévision grand format et un bureau discret viennent parfaire l’espace, idéal pour se détendre ou rêver à plume posée.  

Deux fenêtres dévoilent un tableau vivant : d’un côté, le vallon du jardin, bordé de jasmins dont les effluves s’invitent à l’intérieur dès les beaux jours; de l’autre, un cèdre imposant, gardien silencieux de vos nuits.  

Le dressing spacieux donne sur un couloir privatisé, partagé entre trois chambres.

La salle de bain privée, au charme singulier, révèle une baignoire contemporaine, des carreaux anciens ornés d’oiseaux, et des luminaires minutieusement choisis par la propriétaire. 

Les luminaires, en harmonie avec le thème, ont été sélectionnés avec amour, comme un clin d’œil poétique à l’univers ailé de la pièce. `,
      equipments: [
        { name: 'Lit Queen Size', icon: 'BedDouble', tooltip: '200×200cm', isLucide: true },
        { name: 'Serviettes et ligne de lit', icon: 'Serviettes' },
        { name: 'Placard et Cintres', icon: 'Cintres' },
        { name: 'Sèche-cheveux', icon: 'cheveux' },
        { name: 'Eau chaude', icon: 'EauChaude' },
        { name: 'Gel douche et Shampooing', icon: 'ShampooGelDouche' },
        { name: 'Lit pour bébé à la demande', icon: 'babybed' },
        { name: 'Ventilateurs portables', icon: 'Ventilateurs' },
        { name: 'Chauffage central', icon: 'ThermometerSun', isLucide: true },
        { name: 'Wifi', icon: 'Wifi', isLucide: true },
        { name: 'TV', icon: 'TvMinimal', isLucide: true },
        { name: 'Vue sur le jardin', icon: 'VueSurLeJardin' },
        { name: 'Baignoire et douche', icon: 'Bath', isLucide: true },
        { name: 'Bidet', icon: 'Bidet' },
        { name: 'Dressing', icon: 'Shirt', isLucide: true },
        { name: 'Fer à repasser', icon: 'repasser' },
        { name: 'Espace de travail dédié', icon: 'LampDesk', isLucide: true }
      ]
    },
    'royal-auffreville': {
      name: 'Royal Auffreville',
      subtitle: 'Suite royale avec vue panoramique',
      images: ['/ChRose.JPG'],
  description: `Spacieuse et baignée de lumière, la chambre Royal Auffreville est une ode au calme et à l’élégance. Deux grandes fenêtres l’ouvrent à la nature : d’un côté, un cèdre séculaire déploie sa majesté silencieuse ; de l’autre, un laurier en fleurs diffuse ses parfums subtils jusque dans la chambre.

Au cœur de cette atmosphère paisible, un lit king-size aux draps soyeux invite au sommeil profond. Allongé, on savoure un film sur un grand écran, bercé par la lumière dorée des fins de journée.

La suite s’étend en un bel espace privé avec salle de bain raffinée — douche à l’italienne, baignoire profonde, toilettes séparées — et un vaste dressing discret. Un véritable refuge, pensé pour le repos du corps et de l’âme.`,
      equipments: [
        { name: 'Lit King Size', icon: 'BedDouble', tooltip: '200×200cm', isLucide: true },
        { name: 'Douche', icon: 'ShowerHead', isLucide: true },
        { name: 'Baignoire', icon: 'Bath', isLucide: true },
        { name: 'Serviettes et ligne de lit', icon: 'Serviettes' },
        { name: 'Placard et Cintres', icon: 'Cintres' },
        { name: 'Sèche-cheveux', icon: 'cheveux' },
        { name: 'Eau chaude', icon: 'EauChaude' },
        { name: 'Gel douche et Shampooing', icon: 'ShampooGelDouche' },
        { name: 'Lit pour bébé à la demande', icon: 'babybed' },
        { name: 'Ventilateurs portables', icon: 'Ventilateurs' },
        { name: 'Chauffage central', icon: 'ThermometerSun', isLucide: true },
        { name: 'Wifi', icon: 'Wifi', isLucide: true },
        { name: 'TV', icon: 'TvMinimal', isLucide: true },
        { name: 'Vue sur le jardin', icon: 'VueSurLeJardin' },
        { name: 'Vue sur la piscine', icon: 'VueSurLaPiscine' },
        { name: 'Toilette séparée', icon: 'Toilet', isLucide: true },
        { name: 'Fer à repasser', icon: 'repasser' },
        { name: 'Dressing', icon: 'Shirt', isLucide: true },
        { name: 'Espace de travail dédié', icon: 'LampDesk', isLucide: true }
      ]
    },
    'good-night': {
      name: 'Good Night',
      subtitle: 'Repos optimal et confort absolu',
      images: ['/Chvint2.JPG'],
  description: `Juste au-dessus de la chambre royale, nichée au cœur du premier étage, la Chambre Good Night veille en silence.
 Par sa large fenêtre, les rayons du matin filtrent à travers les branches d’un cèdre majestueux, comme une caresse douce sur les draps immaculés.
Cette chambre est un havre de paix.
 On y accède par deux portes discrètes — l’une ouvre sur les salons, l’autre mène à la cuisine, comme si l’on pouvait choisir entre le repos ou le partage, entre la rêverie ou la convivialité.

Le lit, généreux et noble (200×200), invite aux sommeils profonds et aux réveils sereins.
 Le calme y est souverain, à tel point que l’on entend parfois le silence respirer.`,
      equipments: [
        { name: 'Lit king Size', icon: 'BedDouble', tooltip: '200×200cm', isLucide: true },
        { name: 'Serviettes et ligne de lit', icon: 'Serviettes' },
        { name: 'Gel douche et Shampooing', icon: 'ShampooGelDouche' },
        { name: 'Lit pour bébé à la demande', icon: 'babybed' },
        { name: 'Ventilateurs portables', icon: 'Ventilateurs' },
        { name: 'Chauffage central', icon: 'ThermometerSun', isLucide: true },
        { name: 'Wifi', icon: 'Wifi', isLucide: true },
        { name: 'TV', icon: 'TvMinimal', isLucide: true },
        { name: 'Vue sur le jardin', icon: 'VueSurLeJardin' },
        { name: 'Espace de travail dédié', icon: 'LampDesk', isLucide: true }
      ]
    },
    'amazon-fun': {
      name: 'Amazon Fun',
      subtitle: 'Aventure et détente tropicale',
      images: ['/Chvint3.JPG'],
      description: `Nichée sous les toits, la chambre Amazon Fun séduit par sa palette vive et son atmosphère ludique. Les tonalités chaleureuses d’orange, de bleu ciel et de noir dessinent un univers à la fois graphique et accueillant, où chaque détail invite à l’évasion.

Malgré sa taille plus intime, la chambre ne manque ni de confort ni de style : le bureau noir, choisi pour son élégance sobre, s’intègre parfaitement à l’ensemble. Un grand dressing offre un espace de rangement généreux, pensé pour les séjours prolongés.

La salle de bain attenante, récemment rénovée, s’inscrit dans l’esprit du lieu : baignoire moderne, meubles choisis avec soin, et touches décoratives en harmonie avec l’univers coloré de la chambre.

Amazon Fun est une bulle joyeuse et cosy, idéale pour se reposer dans une ambiance pleine de caractère, entre confort moderne et fantaisie bien dosée.`,
      equipments: [
        { name: 'Lit Normal Size', icon: 'BedDouble', tooltip: '160×180cm', isLucide: true },
        { name: 'Baignoire et douche', icon: 'Bath', isLucide: true },
        { name: 'Serviettes et ligne de lit', icon: 'Serviettes' },
        { name: 'Placard et Cintres', icon: 'Cintres' },
        { name: 'Sèche-cheveux', icon: 'cheveux' },
        { name: 'Eau chaude', icon: 'EauChaude' },
        { name: 'Gel douche et Shampooing', icon: 'ShampooGelDouche' },
        { name: 'Lit pour bébé à la demande', icon: 'babybed' },
        { name: 'Ventilateurs portables', icon: 'Ventilateurs' },
        { name: 'Chauffage central', icon: 'ThermometerSun', isLucide: true },
        { name: 'Wifi', icon: 'Wifi', isLucide: true },
        { name: 'TV', icon: 'TvMinimal', isLucide: true },
        { name: 'Vue sur le jardin', icon: 'VueSurLeJardin' },
        { name: 'Toilette séparée', icon: 'Toilet', isLucide: true },
        { name: 'Dressing', icon: 'Shirt', isLucide: true },
        { name: 'Espace de travail dédié', icon: 'LampDesk', isLucide: true }
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
        { label: "Accueil", path: "/" },
        { label: "La maison", path: "/rooms" },
        { label: "Chambres", path: "/rooms/chambres?from=maison" },
        { label: currentChambre.name, path: null } // 当前页面不可点击
      ]
    : [
        { label: "Accueil", path: "/" },
        { label: "Pièces", path: "/rooms" },
        { label: "Chambres", path: "/rooms/chambres" },
        { label: currentChambre.name, path: null } // 当前页面不可点击
      ];

  return 
  (
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
            Description
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
            Équipements
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
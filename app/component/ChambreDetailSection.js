"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CustomIcon } from "@/components/icons";

export function ChambreDetailSection({ chambreId }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();

  // 根据chambreId获取对应的卧室数据
  const chambreData = {
    'princess-rose': {
      name: 'Princess Rose',
      subtitle: 'Romance et douceur dans les tons rosés',
      images: ['/ChRose.JPG', '/ChRose1.JPG', '/ChRose2.JPG'],
      description: `La chambre Princess Rose vous transporte dans un univers romantique et raffiné. Décorée dans des tons poudrés et roses délicats, cette chambre évoque la douceur et l'élégance d'un conte de fées.

Le lit queen-size, paré de linge de maison en soie et coton égyptien, offre un confort exceptionnel. Les rideaux en voilage filtrent délicatement la lumière naturelle, créant une atmosphère tamisée et apaisante.

Chaque détail a été pensé pour créer une expérience unique : mobilier ancien restauré, éclairage d'ambiance, et vue sur le jardin fleuri. Un espace parfait pour une escapade romantique ou un séjour de détente absolue.`,
      equipments: [
        { name: 'Lit Queen Size', icon: 'babybed' },
        { name: 'Linge de luxe', icon: 'Serviettes' },
        { name: 'Vue sur jardin', icon: 'VueSurLeJardin' },
        { name: 'Éclairage d\'ambiance', icon: 'cheveux' },
        { name: 'Mobilier antique', icon: 'Cintres' },
        { name: 'Salle de bain privée', icon: 'ShampooGelDouche' }
      ]
    },
    'strong-marble': {
      name: 'Strong Marble',
      subtitle: 'Élégance moderne avec touches de marbre',
      images: ['/ChGN.JPG'],
      description: `La chambre Strong Marble incarne l'alliance parfaite entre modernité et sophistication. Les éléments en marbre véritable créent une atmosphère luxueuse et contemporaine.

Cette suite spacieuse dispose d'un mobilier design associé à des matériaux nobles. Le marbre Carrare orne la tête de lit et la salle de bain attenante, créant un effet visuel saisissant.

L'espace a été conçu pour les voyageurs exigeants qui apprécient le raffinement contemporain. Grande fenêtre panoramique, dressing intégré et coin salon font de cette chambre un véritable écrin de confort.`,
      equipments: [
        { name: 'Marbre Carrare', icon: 'panoramiques' },
        { name: 'Design contemporain', icon: 'Cintres' },
        { name: 'Dressing intégré', icon: 'linge' },
        { name: 'Coin salon', icon: 'Hamac' },
        { name: 'Vue panoramique', icon: 'VueSurLaPiscine' },
        { name: 'Salle de bain marbre', icon: 'Bidet' }
      ]
    },
    'bird-vintage': {
      name: 'Bird Vintage',
      subtitle: 'Charme rétro et authenticité d\'époque',
      images: ['/Chvint1.JPG', '/Chvint2.JPG', '/Chvint3.JPG', '/Chvint4.JPG', '/Chvint5.JPG'],
      description: `La chambre Bird Vintage vous plonge dans l'atmosphère authentique du début du XXe siècle. Mobilier chiné, papiers peints d'époque et objets de collection créent un décor unique et chaleureux.

Cette chambre de caractère conserve tout le charme de l'ancien tout en offrant le confort moderne. Parquet d'origine, moulures sculptées et cheminée en marbre témoignent du raffinement d'antan.

L'esprit vintage se retrouve dans chaque détail : lampes Art Déco, malles anciennes reconverties en rangements, et collection d'oiseaux qui donne son nom à la chambre. Un voyage dans le temps garanti.`,
      equipments: [
        { name: 'Mobilier d\'époque', icon: 'Cintres' },
        { name: 'Parquet ancien', icon: 'linge' },
        { name: 'Cheminée marbre', icon: 'EauChaude' },
        { name: 'Collection vintage', icon: 'JeuxSociété' },
        { name: 'Éclairage Art Déco', icon: 'cheveux' },
        { name: 'Caractère authentique', icon: 'Étendoir' }
      ]
    },
    'royal-auffreville': {
      name: 'Royal Auffreville',
      subtitle: 'Suite royale avec vue panoramique',
      images: ['/ChRose.JPG'],
      description: `La suite Royal Auffreville représente le summum du luxe et de l'élégance. Cette chambre d'exception offre une expérience digne des plus grands palaces européens.

Spacieuse et majestueuse, elle dispose d'un mobilier de style royal avec des finitions dorées et des étoffes précieuses. La vue panoramique sur le domaine et les jardins à la française est à couper le souffle.

Cette suite comprend un salon privé, un dressing sur mesure et une salle de bain en marbre avec baignoire îlot. Chaque élément évoque l'art de vivre à la française dans sa plus noble expression.`,
      equipments: [
        { name: 'Suite avec salon', icon: 'Hamac' },
        { name: 'Vue panoramique', icon: 'VueSurLaPiscine' },
        { name: 'Mobilier royal', icon: 'Cintres' },
        { name: 'Baignoire îlot', icon: 'Bidet' },
        { name: 'Dressing sur mesure', icon: 'linge' },
        { name: 'Finitions dorées', icon: 'panoramiques' }
      ]
    },
    'good-night': {
      name: 'Good Night',
      subtitle: 'Repos optimal et confort absolu',
      images: ['/Chvint2.JPG'],
      description: `La chambre Good Night a été spécialement conçue pour offrir la meilleure qualité de sommeil possible. Chaque élément contribue à créer un environnement propice au repos et à la régénération.

Matelas orthopédique haut de gamme, isolation phonique renforcée et système de ventilation silencieux garantissent des nuits réparatrices. L'obscurité totale est assurée par des rideaux occultants sur mesure.

L'ambiance zen et minimaliste, inspirée des traditions scandinaves, favorise la détente et la sérénité. Cette chambre est parfaite pour les voyageurs en quête de récupération après une journée bien remplie.`,
      equipments: [
        { name: 'Matelas orthopédique', icon: 'babybed' },
        { name: 'Isolation phonique', icon: 'EauChaude' },
        { name: 'Rideaux occultants', icon: 'cheveux' },
        { name: 'Ventilation silencieuse', icon: 'Étendoir' },
        { name: 'Ambiance zen', icon: 'JeuxSociété' },
        { name: 'Qualité de sommeil', icon: 'Serviettes' }
      ]
    },
    'amazon-fun': {
      name: 'Amazon Fun',
      subtitle: 'Aventure et détente tropicale',
      images: ['/Chvint3.JPG'],
      description: `La chambre Amazon Fun vous emmène dans une aventure exotique au cœur de la nature tropicale. Décoration inspirée de la forêt amazonienne avec des touches colorées et des matériaux naturels.

Cette chambre familiale spacieuse peut accueillir jusqu'à 4 personnes avec un lit double et des lits superposés design. L'ambiance ludique et chaleureuse en fait le choix idéal pour les familles avec enfants.

Les motifs végétaux, les couleurs vives et les accessoires en bois exotique créent une atmosphère unique et dépaysante. Un espace de jeu intégré permet aux enfants de s'amuser en toute sécurité.`,
      equipments: [
        { name: 'Chambre familiale', icon: 'babybed' },
        { name: 'Lits superposés design', icon: 'Cintres' },
        { name: 'Espace de jeu', icon: 'JeuxSociété' },
        { name: 'Décor tropical', icon: 'VueSurLeJardin' },
        { name: 'Matériaux naturels', icon: 'linge' },
        { name: 'Ambiance ludique', icon: 'Hamac' }
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
      router.push(`/rooms/chambres`);
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

  return (
    <div className="w-full bg-white inline-flex flex-col justify-start items-center gap-16 overflow-hidden">
      {/* Breadcrumb */}
      <div className="w-full px-24 py-8 inline-flex justify-start items-center gap-2.5 overflow-hidden">
        <div className="justify-start text-neutral-700 text-xs font-normal font-['Playfair_Display'] leading-none tracking-tight">
          Accueil &gt; Pièces &gt; Chambres &gt; {currentChambre.name}
        </div>
      </div>

      {/* Title Section */}
      <div className="w-full px-24 py-3 flex flex-col justify-center items-start gap-5 overflow-hidden">
        <div className="justify-start text-black text-4xl font-bold font-['Playfair_Display_SC'] leading-10 tracking-tight">
          {currentChambre.name}
        </div>
        <div className="justify-start text-[#8B5E3C] text-xs font-normal font-['Playfair_Display'] leading-none tracking-tight">
          {currentChambre.subtitle}
        </div>
      </div>

      {/* Main Image with Navigation */}
      <div className="w-[860px] h-[558px] relative overflow-hidden rounded-lg">
        <img 
          src={currentChambre.images[currentImageIndex]} 
          alt={currentChambre.name} 
          className="w-full h-full object-cover"
        />
        
        {/* Navigation Buttons - only show if more than 1 image */}
        {currentChambre.images.length > 1 && (
          <>
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
          </>
        )}
      </div>

      {/* Thumbnail Images - only show if more than 1 image */}
      {currentChambre.images.length > 1 && (
        <div className="w-full px-24 py-3.5 inline-flex justify-start items-center gap-7 overflow-x-auto overflow-hidden">
          {currentChambre.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-48 h-32 relative rounded-lg overflow-hidden transition-all duration-200 flex-shrink-0 ${
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
      <div className="w-full px-24 py-2.5 flex flex-col justify-start items-start gap-6 overflow-hidden">
        <div className="self-stretch h-12 py-5 inline-flex justify-start items-center gap-2.5 overflow-hidden">
          <div className="justify-start text-black text-3xl font-bold font-['Playfair_Display_SC'] leading-9">
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
      <div className="w-full px-24 flex flex-col justify-start items-start gap-11 overflow-hidden">
        <div className="w-72 h-20 relative overflow-hidden">
          <div className="absolute left-8 top-7 justify-start text-black text-3xl font-bold font-['Playfair_Display_SC'] leading-9">
            Équipements
          </div>
        </div>
        <div className="self-stretch grid grid-cols-2 gap-4 max-w-4xl">
          {currentChambre.equipments.map((equipment, index) => (
            <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <CustomIcon name={equipment.icon} className="w-6 h-6 text-[#D4AF37]" />
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

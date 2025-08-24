import { Header } from "../../component/Header";
import { Footer } from "../../component/Footer";
import { CuisineDetailSection } from "../../component/CuisineDetailSection";

export default function RoomDetailPage({ params }) {
  const { roomId } = params;

  // 如果是厨房页面，使用专门的组件
  if (roomId === 'cuisine') {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <CuisineDetailSection />
        </main>
        <Footer />
      </div>
    );
  }

  // 其他房间的信息映射
  const roomInfo = {
    'chambres': {
      title: 'Chambres',
      description: 'Des chambres confortables pour un repos paisible.',
      features: ['Lit king-size', 'Armoire spacieuse', 'Vue sur le jardin', 'Climatisation']
    },
    'salle-sport': {
      title: 'Salle de Sport',
      description: 'Un espace dédié au fitness et au bien-être.',
      features: ['Équipements modernes', 'Miroirs muraux', 'Tapis de yoga', 'Ventilation optimale']
    },
    'piscine': {
      title: 'Piscine',
      description: 'Une magnifique piscine pour se détendre et se rafraîchir.',
      features: ['Piscine chauffée', 'Transats', 'Parasols', 'Douche extérieure']
    },
    'sous-sol': {
      title: 'Sous-sol',
      description: 'Un espace polyvalent au sous-sol.',
      features: ['Cave à vin', 'Espace de rangement', 'Buanderie', 'Atelier']
    },
    'espace-jeux': {
      title: 'Espace jeux',
      description: 'Un espace dédié aux loisirs et aux jeux pour toute la famille.',
      features: ['Baby-foot', 'Billard', 'Jeux de société', 'Console de jeux']
    },
    'salon': {
      title: 'Salon',
      description: 'Un salon spacieux et confortable pour se détendre.',
      features: ['Canapé en cuir', 'Cheminée', 'TV grand écran', 'Bibliothèque']
    },
    'jardin': {
      title: 'Jardin',
      description: 'Un magnifique jardin paysager pour profiter de la nature.',
      features: ['Pelouse entretenue', 'Arbres fruitiers', 'Terrasse', 'Barbecue']
    }
  };

  const room = roomInfo[roomId] || {
    title: 'Pièce non trouvée',
    description: 'Cette pièce n\'existe pas.',
    features: []
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="px-14 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <div className="text-neutral-700 text-xs font-normal font-['Playfair_Display'] leading-none tracking-tight">
            Accueil &gt; Pièces &gt; {room.title}
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
              Caractéristiques
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
            <span className="text-gray-500 font-['Playfair_Display']">Photo de {room.title}</span>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

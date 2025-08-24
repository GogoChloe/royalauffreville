"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bed, Star, Users, ArrowRight, ChevronRight } from "lucide-react";

export function ChambresDetailSection() {
  const router = useRouter();

  // 卧室列表
  const chambres = [
    { 
      id: 'princess-rose', 
      name: 'Princess Rose', 
      image: '/ChRose.JPG',
      description: 'Chambre romantique aux tons rosés',
      capacity: 2
    },
    { 
      id: 'strong-marble', 
      name: 'Strong Marble', 
      image: '/ChGN.JPG',
      description: 'Élégance du marbre et modernité',
      capacity: 2
    },
    { 
      id: 'bird-vintage', 
      name: 'Bird Vintage', 
      image: '/Chvint1.JPG',
      description: 'Charme rétro et authenticité',
      capacity: 2
    },
    { 
      id: 'royal-auffreville', 
      name: 'Royal Auffreville', 
      image: '/ChRose.JPG',
      description: 'Suite royale avec vue panoramique',
      capacity: 2
    },
    { 
      id: 'good-night', 
      name: 'Good Night', 
      image: '/Chvint2.JPG',
      description: 'Repos optimal et confort absolu',
      capacity: 2
    },
    { 
      id: 'amazon-fun', 
      name: 'Amazon Fun', 
      image: '/Chvint3.JPG',
      description: 'Aventure et détente tropicale',
      capacity: 2
    }
  ];

  const handleChambreClick = (chambreId) => {
    router.push(`/rooms/chambres/${chambreId}`);
  };

  return (
    <div className="w-full max-w-[1165px] mx-auto bg-white">
      {/* Breadcrumb */}
      <div className="px-14 py-4 inline-flex justify-start items-center gap-2.5">
        <div className="text-neutral-700 text-xs font-normal font-['Playfair_Display'] leading-none tracking-tight">
          Accueil &gt; Chambres
        </div>
      </div>

      {/* Main Content Container */}
      <div className="px-14 py-7 flex flex-col justify-start items-start">
        {/* Title Section */}
        <div className="w-[669px] h-28 relative mb-8">
          <div className="absolute left-[0.50px] top-[58px] text-black text-3xl font-bold font-['Playfair_Display_SC'] leading-9">
            Les Chambres
          </div>
        </div>

        {/* Chambres List */}
        <div className="w-full space-y-6 mb-12">
          {chambres.map((chambre, index) => (
            <Card 
              key={chambre.id}
              className="group cursor-pointer border border-gray-200 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-md overflow-hidden"
              onClick={() => handleChambreClick(chambre.id)}
            >
              <CardContent className="p-0">
                <div className="flex items-center justify-between bg-[#8B5E3C]/80 hover:bg-[#8B5E3C] transition-colors duration-300 rounded-lg">
                  <div className="flex-1 px-6 py-6">
                    <div className="flex items-center gap-4">
                      {/* Chambre Image Thumbnail */}
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={chambre.image} 
                          alt={chambre.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Chambre Info */}
                      <div className="flex-1">
                        <h3 className="text-white text-lg font-normal font-['Playfair_Display'] leading-7 mb-1">
                          {chambre.name}
                        </h3>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Bed className="w-4 h-4 text-[#D4AF37]" />
                            <span className="text-[#D4AF37] text-xs font-['Playfair_Display']">
                              Chambre double
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-[#D4AF37]" />
                            <span className="text-[#D4AF37] text-xs font-['Playfair_Display']">
                              {chambre.capacity} personnes
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Rating Stars */}
                      <div className="flex items-center gap-1 mr-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                        ))}
                      </div>

                      {/* Arrow Icon */}
                      <div className="flex-shrink-0 mr-2">
                        <ChevronRight className="w-6 h-6 text-white group-hover:text-[#D4AF37] transition-colors duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Description Section */}
        <div className="w-full space-y-4">
          <div className="py-5 inline-flex justify-start items-center gap-2.5">
            <div className="text-black text-3xl font-bold font-['Playfair_Display_SC'] leading-9">
              Description
            </div>
          </div>
          
          <div className="text-black text-sm font-normal font-['Playfair_Display'] leading-snug tracking-tight">
            Nos chambres élégantes sont toutes équipées de literie haut de gamme, soigneusement sélectionnée pour offrir un soutien optimal et une douceur enveloppante. 
            Chaque chambre révèle une atmosphère singulière : du charme rétro à l'élégance contemporaine, du raffinement du marbre à l'authenticité de l'industriel. 
            <br/><br/>
            Tout a été pensé avec soin par la propriétaire, jusque dans les moindres détails — rideaux occultants, matières nobles, éclairages tamisés. 
            Une décoration harmonieuse et une ambiance apaisante vous invitent à un repos profond, que ce soit pour une nuit ou pour un long séjour.
            <br/><br/>
            Chaque chambre dispose d'un accès à une salle de bain privée ou partagée, avec des équipements modernes et des produits d'accueil de qualité. 
            L'attention portée aux détails garantit un séjour mémorable dans un cadre d'exception.
          </div>
        </div>

        {/* Features Section */}
        <div className="w-full mt-12 space-y-6">
          <div className="text-black text-3xl font-bold font-['Playfair_Display_SC'] leading-9">
            Équipements des chambres
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center border border-gray-200 hover:border-[#D4AF37] transition-colors duration-300">
              <CardContent className="p-0">
                <Bed className="w-12 h-12 text-[#D4AF37] mb-4 mx-auto" />
                <h4 className="text-lg font-bold font-['Playfair_Display_SC'] mb-2">Literie Premium</h4>
                <p className="text-sm text-gray-600 font-['Playfair_Display']">
                  Matelas haut de gamme et linge de maison de luxe
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6 text-center border border-gray-200 hover:border-[#D4AF37] transition-colors duration-300">
              <CardContent className="p-0">
                <Star className="w-12 h-12 text-[#D4AF37] mb-4 mx-auto" />
                <h4 className="text-lg font-bold font-['Playfair_Display_SC'] mb-2">Service 5 étoiles</h4>
                <p className="text-sm text-gray-600 font-['Playfair_Display']">
                  Attention personnalisée et service de qualité
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-6 text-center border border-gray-200 hover:border-[#D4AF37] transition-colors duration-300">
              <CardContent className="p-0">
                <Users className="w-12 h-12 text-[#D4AF37] mb-4 mx-auto" />
                <h4 className="text-lg font-bold font-['Playfair_Display_SC'] mb-2">Confort optimal</h4>
                <p className="text-sm text-gray-600 font-['Playfair_Display']">
                  Espaces pensés pour votre bien-être et détente
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="w-full mt-12 text-center">
          <Button 
            size="lg"
            className="bg-[#D4AF37] hover:bg-[#B8941F] text-white px-8 py-3 font-['Playfair_Display']"
            onClick={() => router.push('/reservation')}
          >
            Réserver votre chambre
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}

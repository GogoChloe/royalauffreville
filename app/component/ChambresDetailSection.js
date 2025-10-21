"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Breadcrumb } from "./Breadcrumb";
import { useLanguage } from '../context/LanguageContext';

export function ChambresDetailSection() {
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [fromMaison, setFromMaison] = useState(false);

  // 调试：打印翻译对象
  console.log('ChambresDetailSection - t:', t);
  console.log('ChambresDetailSection - t.chambresSection:', t?.chambresSection);

  useEffect(() => {
    // 检查是否从 La maison 页面来的
    const from = searchParams.get('from');
    if (from === 'maison') {
      setFromMaison(true);
    }
  }, [searchParams]);

  // 卧室列表
  const chambres = [
    { 
      id: 'princess-rose', 
      name: t.chambresSection?.princessRose || 'Princess Rose', 
      image: '/ChRose.JPG',
      description: t.chambresSection?.princessRoseDesc || 'Chambre romantique aux tons rosés',
      capacity: 2
    },
    { 
      id: 'strong-marble', 
      name: t.chambresSection?.strongMarble || 'Strong Marble', 
      image: '/ChGN.JPG',
      description: t.chambresSection?.strongMarbleDesc || 'Élégance du marbre et modernité',
      capacity: 2
    },
    { 
      id: 'bird-vintage', 
      name: t.chambresSection?.birdVintage || 'Bird Vintage', 
      image: '/Chvint1.JPG',
      description: t.chambresSection?.birdVintageDesc || 'Charme rétro et authenticité',
      capacity: 2
    },
    { 
      id: 'royal-auffreville', 
      name: t.chambresSection?.royalAuffreville || 'Royal Auffreville', 
      image: '/ChRose2.JPG',
      description: t.chambresSection?.royalAuffrevilleDesc || 'Suite royale avec vue panoramique',
      capacity: 2
    },
    { 
      id: 'good-night', 
      name: t.chambresSection?.goodNight || 'Good Night', 
      image: '/Chvint2.JPG',
      description: t.chambresSection?.goodNightDesc || 'Repos optimal et confort absolu',
      capacity: 2
    },
    { 
      id: 'amazon-fun', 
      name: t.chambresSection?.amazonFun || 'Amazon Fun', 
      image: '/Chvint3.JPG',
      description: t.chambresSection?.amazonFunDesc || 'Aventure et détente tropicale',
      capacity: 2
    }
  ];

  const handleChambreClick = (chambreId) => {
    if (fromMaison) {
      router.push(`/rooms/chambres/${chambreId}?from=maison`);
    } else {
      router.push(`/rooms/chambres/${chambreId}`);
    }
  };

  // 构建面包屑导航数据
  const breadcrumbItems = fromMaison 
    ? [
        { label: t.chambreDetail?.breadcrumbHome || "Accueil", path: "/" },
        { label: t.chambreDetail?.breadcrumbHouse || "La maison", path: "/rooms" },
        { label: t.chambreDetail?.breadcrumbChambers || "Chambres", path: null } // 当前页面不可点击
      ]
    : [
        { label: t.chambreDetail?.breadcrumbHome || "Accueil", path: "/" },
        { label: t.chambreDetail?.breadcrumbChambers || "Chambres", path: null } // 当前页面不可点击
      ];

  return (
    <div className="w-full px-24 pt-32 py-8 pb-32 inline-flex flex-col justify-center items-center gap-12">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="self-stretch py-3 flex flex-col justify-center items-start gap-5 overflow-hidden">
        <div className="justify-start text-[#8B5E3C] text-3xl font-bold font-['Playfair_Display'] leading-9">{t.chambresSection?.title || 'Les Chambres'}</div>
        <div className="justify-start text-neutral-700 text-xs font-normal font-['Playfair_Display'] leading-none tracking-tight">{t.chambresSection?.subtitle || 'Découvrez nos chambres élégantes et confortables'}</div>
      </div>

      {/* Chambres Grid - 3 columns, 2 rows */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-18 justify-items-center w-full max-w-7xl mx-auto">
        {chambres.map((chambre) => (
          <div key={chambre.id} className="w-[18rem] h-[22rem]">
            <Button
              onClick={() => handleChambreClick(chambre.id)}
              variant="secondary"
              className="w-full h-full px-4 py-8 rounded-lg flex justify-center items-center font-['Playfair_Display'] relative overflow-hidden bg-cover bg-center hover:scale-105 transition-transform duration-200 cursor-pointer"
              style={{ backgroundImage: `url('${chambre.image}')` }}
            >
              <div className="relative z-10 text-white text-lg font-bold leading-7 bg-[#8B5E3C]/90 px-6 py-3 rounded-lg shadow-lg">
                {chambre.name}
              </div>
            </Button>
          </div>
        ))}
      </div>

      {/* Description Section */}
      <div className="w-full max-w-4xl mx-auto text-center">
        <p className="text-neutral-700 text-base font-normal font-['Playfair_Display'] leading-relaxed tracking-tight">
          {t.chambresSection?.description || 'Nos chambres élégantes sont toutes équipées de literie haut de gamme, soigneusement sélectionnée pour offrir un soutien optimal et une douceur enveloppante. Chaque chambre révèle une atmosphère singulière : du charme rétro à l\'élégance contemporaine, du raffinement du marbre à l\'authenticité de l\'industriel. Tout a été pensé avec soin par la propriétaire, jusque dans les moindres détails — rideaux occultants, matières nobles, éclairages tamisés. Une décoration harmonieuse et une ambiance apaisante vous invitent à un repos profond, que ce soit pour une nuit ou pour un long séjour.'}
        </p>
      </div>
    </div>
  );
}

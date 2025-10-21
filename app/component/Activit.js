"use client";

import { useRouter } from 'next/navigation';
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

export function Activit({ showTitle = true }) {
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language];
  
  // 活动数据
  const activities = [
    {
      id: 1,
      title: t.activitiesComp.indoor,
      description: t.activitiesComp.indoorDesc,
      image: "/interier.png",
      path: "/activites/interieur"
    },
    {
      id: 2,
      title: t.activitiesComp.outdoor, 
      description: t.activitiesComp.outdoorDesc,
      image: "/exterier.JPG",
      path: "/activites/exterieur"
    }
  ];

  return (
    <div className="w-full bg-white py-12 md:py-20 px-4 md:px-8 lg:px-16">
      {/* Header - only show on homepage */}
      {showTitle && (
        <div className="max-w-7xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-[#8B5E3C] text-3xl md:text-4xl lg:text-5xl font-black font-['Playfair_Display_SC'] leading-tight">
            {t.activitiesComp.title}
          </h2>
        </div>
      )}

      {/* Activities container */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {activities.map((activity) => (
            <div 
              key={activity.id} 
              className="group cursor-pointer"
              onClick={() => router.push(activity.path)}
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                {/* Background image */}
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  src={activity.image} 
                  alt={activity.title}
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                
                {/* Content overlay - centered */}
                <div className="absolute inset-0 flex items-center justify-center p-6 md:p-8">
                  <div className="bg-[#D4AF37]/80 rounded-2xl p-6 md:p-8 group-hover:bg-[#D4AF37]/90 transition-colors">
                    <h3 className="text-white text-2xl md:text-3xl font-bold font-['Playfair_Display_SC'] text-center mb-3">
                      {activity.title}
                    </h3>
                    <p className="text-white text-sm md:text-base font-normal font-['Playfair_Display'] text-center leading-relaxed">
                      {activity.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
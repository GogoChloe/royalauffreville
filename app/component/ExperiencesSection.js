"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "./Breadcrumb";

export function ExperiencesSection() {
  const [selectedExperience, setSelectedExperience] = useState(null);
  const router = useRouter();

  const experiences = [
    { key: "famille", title: "Moments en Famille", image: "/famille.JPG" },
    { key: "amis", title: "Retrouvailles Entre Amis", image: "/amis.JPG" },
    { key: "team", title: "Team Building", image: "/team.png" },
    { key: "wellness", title: "Retraite et Bien-être", image: "/stage.png" },
  ];

  const handleExperienceClick = (experienceKey) => {
    setSelectedExperience(experienceKey);
    // Pour l'instant, on peut juste afficher une alerte ou naviguer vers une page de détail
    // router.push(`/experiences/${experienceKey}`);
    console.log(`Navigating to experience: ${experienceKey}`);
  };

  // 构建面包屑导航数据
  const breadcrumbItems = [
    { label: "Accueil", path: "/" },
    { label: "Expériences", path: null } // 当前页面不可点击
  ];

  return (
    <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24 pt-32 py-8 pb-32 inline-flex flex-col justify-center items-center gap-12">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="self-stretch py-3 flex flex-col justify-center items-start gap-5 overflow-hidden">
        <div className="justify-start text-[#8B5E3C] text-2xl sm:text-3xl md:text-4xl font-bold font-['Playfair_Display'] leading-tight">Nos Expériences</div>
        <div className="justify-start text-neutral-700 text-sm sm:text-base font-normal font-['Playfair_Display'] leading-relaxed tracking-tight">
          Découvrez une large gamme d'activités et d'expériences pour enrichir votre séjour
        </div>
      </div>

      {/* Cards container - 2x2 grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {experiences.map((exp) => (
            <div key={exp.key} className="group">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  src={exp.image} 
                  alt={exp.title} 
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-2 bg-[#8B5E3C]/80 rounded-lg backdrop-blur-sm">
                  <div className="text-[#F5F0E6] text-sm md:text-base font-normal font-['Playfair_Display'] text-center whitespace-nowrap">
                    {exp.title}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 返回按钮 */}
        <div className="flex justify-center items-center mt-12">
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-[#8B5E3C] hover:bg-[#8B5E3C]/90 text-white text-base font-normal font-['Playfair_Display'] leading-normal rounded-md transition-colors"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  );
}

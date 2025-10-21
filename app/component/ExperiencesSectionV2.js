"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { Breadcrumb } from "./Breadcrumb";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

function ExperienceIcon({ variant }) {
  // 这里只是示例，你可以自定义 SVG 或图片
  return (
    <div className="w-12 h-12 rounded-full flex justify-center items-center bg-[#D4AF37]">
      <span className="text-white text-xl font-bold">{variant}</span>
    </div>
  );
}

export function ExperiencesSectionV2() {
  const { language } = useLanguage();
  const t = translations[language];
  const router = useRouter();
  const [selectedExperience, setSelectedExperience] = useState(null);

  const experiences = [
    {
      title: t.experiencesPage.family.title,
      description: t.experiencesPage.family.description,
      image: "/famille.JPG",
      color: "bg-[#D4AF37]",
      icon: 1,
      path: '/experiences/famille',
    },
    {
      title: t.experiencesPage.friends.title,
      description: t.experiencesPage.friends.description,
      image: "/amis.JPG",
      color: "bg-[#D4AF37]",
      icon: 2,
      path: '/experiences/entre-amis',
    },
    {
      title: t.experiencesPage.teamBuilding.title,
      description: t.experiencesPage.teamBuilding.description,
      image: "/team.png",
      color: "bg-[#D4AF37]",
      icon: 3,
      path: '/experiences/team-building',
    },
    {
      title: t.experiencesPage.wellness.title,
      description: t.experiencesPage.wellness.description,
      image: "/stage.png",
      color: "bg-[#D4AF37]",
      icon: 4,
      path: '/experiences/retraites-stages',
    },
  ];

  const handleExperienceClick = (path) => {
    router.push(path);
  };

  // 构建面包屑导航数据
  const breadcrumbItems = [
    { label: t.experiencesPage.breadcrumbHome, path: "/" },
    { label: t.experiencesPage.breadcrumbExperiences, path: null } // 当前页面不可点击
  ];

  return (
    <div className="w-full max-w-[1920px] mx-auto min-h-[1152px] relative overflow-x-auto">
      <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24 pt-32 py-8 pb-32 inline-flex flex-col justify-center items-center gap-12">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="self-stretch py-3 flex flex-col justify-center items-start gap-5 overflow-hidden">
          <div className="justify-start text-[#8B5E3C] text-2xl sm:text-3xl md:text-4xl font-bold font-['Playfair_Display'] leading-tight">{t.experiencesPage.title}</div>
          <div className="justify-start text-neutral-700 text-sm sm:text-base font-normal font-['Playfair_Display'] leading-relaxed tracking-tight">
            {t.experiencesPage.subtitle}
          </div>
        </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-8 w-full max-w-[1280px]">
            {experiences.map((exp, idx) => (
              <div
                key={exp.title}
                className="relative rounded-md shadow-lg overflow-hidden flex flex-col justify-start items-start bg-white cursor-pointer"
                style={{ minWidth: 608, minHeight: 456 }}
                onClick={() => handleExperienceClick(exp.path)}
              >
                <div className="relative w-[608px] h-[456px]">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover"
                  />
                  {/* 棕色渐变蒙层：上方透明度低，下方高 */}
                  <div className="absolute left-0 top-0 w-full h-full"
                    style={{
                      background: "linear-gradient(to bottom, rgba(139,94,60,0.1) 30%, rgba(139,94,60,0.95) 100%)"
                    }}
                  />
                </div>
                <div className="absolute left-0 top-[261px] w-[608px] p-8 flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <ExperienceIcon variant={exp.icon} />
                    <div>
                      <div className="text-white text-3xl font-semibold font-['Playfair_Display'] leading-[48px]">
                        {exp.title}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-white/90 text-lg font-normal font-['Cormorant'] leading-relaxed">
                      {exp.description}
                    </div>
                  </div>
                  <div className="pt-1 flex items-center gap-2 group">
                    <div className="group-hover:-translate-x-1 transition-transform duration-300">
                      <span className="text-[#D4AF37] text-base font-medium font-['Cormorant'] leading-normal">{t.experiencesPage.discover}</span>
                    </div>
                    <div className="group-hover:translate-x-1 transition-transform duration-300">
                      <span className="text-[#D4AF37] text-xl font-normal font-['Inter'] leading-7">→</span>
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
              {t.experiencesPage.backHome}
            </button>
          </div>
        </div>
      </div>
  );
}

"use client";

import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import { Breadcrumb } from "./Breadcrumb";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

const getLegendItems = (t) => [
  {
    id: "interest",
    color: "bg-amber-400",
    text: t.proxiComp.legend.interest,
    points: [
      { x: 0.8, y: 19.3, name: "Maison Monet", labelPos: "right" },
      { x: 33.2, y: 16.2, name: "Roche Guyon", labelPos: "bottom" },
      { x: 50.8, y: 56.4, name: "Thoiry Zoo Safari", labelPos: "top" },
      { x: 66.3, y: 60.4, name: "Chateau Saint Germain", labelPos: "right" },
      { x: 72.8, y: 80.9, name: "Chateau Versaille", labelPos: "right" },
      { x: 96.8, y: 68.6, name: "Tour Effel", labelPos: "left" },
      { x: 27, y: 32, name: "Mantes La Jolie", labelPos: "right" },
    ]
  },
  {
    id: "restaurants", 
    color: "bg-red-400",
    text: t.proxiComp.legend.restaurants,
    points: [
      { x: 0.1, y: 69, name: "The Club House", labelPos: "right" },
      { x: 10.9, y: 73.7, name: "L'Auberge de la Truite", labelPos: "right" },
      { x: 23.2, y: 57.8, name: "Food truck L'hambourg", labelPos: "right" },
      { x: 55.4, y: 60.1, name: "Chez Eric Leautey", labelPos: "right" },
      { x: 25.8, y: 35, name: "Rive Gauche", labelPos: "right" },
      { x: 22.4, y: 40.8, name: "Le Salengro", labelPos: "right" },
      { x: 27.1, y: 30.6, name: "Au Vieux Pêcheur", labelPos: "right" },
      { x: 24.4, y: 50.5, name: "Le Moulin de la Reillère", labelPos: "right" },
    ]
  },
  {
    id: "markets",
    color: "bg-teal-400", 
    text: t.proxiComp.legend.markets,
    points: [
      { x: 22.7, y: 45.3, name: "Grand frais", labelPos: "right" },
      { x: 22.6, y: 41, name: "E.Leclerc", labelPos: "right" },
      { x: 25, y: 48.3, name: "Carrefour Contact", labelPos: "right" },
      { x: 29.4, y: 27.9, name: "Carrefour Hypermarché", labelPos: "right" },
      { x: 6.3, y: 38.1, name: "Marché Du Vieux Pilori", labelPos: "right" },
      { x: 2.9, y: 42.8, name: "Auchan", labelPos: "right" },
    ]
  },
  {
    id: "activities",
    color: "bg-lime-400",
    text: t.proxiComp.legend.activities, 
    points: [
      { x: 0, y: 79.6, name: "Malowe Nature - Ferme", labelPos: "right" },
      { x: 2.3, y: 76.6, name: "Pisciculture", labelPos: "right" },
      { x: 31.3, y: 55.4, name: "Paintball et Airsoft", labelPos: "right" },
      { x: 11.9, y: 71.4, name: "Gb Quarter Horses", labelPos: "right" },
      { x: 26.3, y: 35, name: "Evasion Escape game", labelPos: "right" },
      { x: 33.2, y: 40.6, name: "Golf Bluegreen", labelPos: "right" },
      { x: 29.3, y: 32.9, name: "Alligator Land", labelPos: "right" },
    ]
  },
];

export function Proxi({ showBreadcrumb = false }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const { language } = useLanguage();
  const t = translations[language];
  const legendItems = getLegendItems(t);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  const breadcrumbItems = [
    { label: t.proxiComp.breadcrumbHome, path: "/" },
    { label: t.proxiComp.pageTitle, path: null }
  ];

  return (
    <div className="w-full bg-[#F5F0E6] flex flex-col justify-start items-start gap-2.5">
      {/* Breadcrumb - only show on dedicated page */}
      {showBreadcrumb && (
        <div className="w-full px-14 pt-32 pb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      )}

      {/* Page Title - only show on dedicated page */}
      {showBreadcrumb && (
        <div className="w-full px-14 py-3 flex flex-col gap-5">
          <h1 className="text-[#8B5E3C] text-4xl font-bold font-['Playfair_Display'] leading-10 tracking-tight">
            {t.proxiComp.pageTitle}
          </h1>
          <p className="text-[#231F20] text-base font-normal font-['Playfair_Display'] leading-relaxed tracking-tight">
            {t.proxiComp.pageDesc}
          </p>
        </div>
      )}

      {/* Section Title - only show on homepage */}
      {!showBreadcrumb && (
        <div className="self-stretch h-auto px-4 md:px-20 lg:px-80 py-12 md:py-20 lg:py-28 flex flex-col justify-center items-center gap-2.5">
          <div className="text-center text-[#8B5E3C] text-3xl md:text-4xl lg:text-5xl font-black font-['Playfair_Display_SC'] leading-tight md:leading-[56px]">
            {t.proxiComp.title}
          </div>
          <div className="w-full max-w-[512px] text-center text-[#8B5E3C] text-sm md:text-base font-normal font-['Playfair_Display'] leading-normal px-4">
            {t.proxiComp.subtitle}
          </div>
        </div>
      )}
      
      <div data-map="interactive" className="w-full min-h-[500px] md:min-h-[700px] lg:h-[900px] bg-[#F5F0E6] flex flex-col lg:flex-row justify-between items-start overflow-hidden">
        <div className="w-full lg:w-[454px] py-8 lg:py-16 flex flex-row lg:flex-col justify-around lg:justify-center items-center gap-4 lg:gap-10 overflow-x-auto lg:overflow-hidden">
          {legendItems.map((item) => (
            <div 
              key={item.id}
              data-property-1={activeCategory === item.id ? "Active" : "Default"} 
              className={`flex-shrink-0 px-4 md:px-8 lg:px-11 py-4 md:py-6 lg:py-9 flex justify-center items-center gap-2.5 cursor-pointer transition-all duration-200 ${
                activeCategory === item.id ? 'bg-[#D4AF37]/20 rounded-lg' : 'hover:bg-[#8B5E3C]/10 rounded-lg'
              }`}
              onClick={() => handleCategoryClick(item.id)}
            >
              <div className={`w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 ${item.color} rounded-full transition-all duration-200 ${
                activeCategory === item.id ? 'scale-110 shadow-lg' : ''
              }`} />
              <div className={`text-center text-base md:text-2xl lg:text-3xl font-normal font-['Playfair_Display_SC'] leading-tight md:leading-9 transition-colors duration-200 whitespace-nowrap ${
                activeCategory === item.id ? 'text-[#D4AF37]' : 'text-[#8B5E3C]'
              }`}>
                {item.text}
              </div>
            </div>
          ))}
        </div>
        
        <div className="relative flex-1 flex justify-stretch items-stretch">
          {/* Base map image */}
          <img 
            className="w-full h-full object-contain" 
            src="/LandscapeMapAuffreville.png" 
            alt="Carte de la région d'Auffreville"
          />
          
          {/* Interactive points overlay */}
          <div className="absolute inset-0">
            {legendItems.map((category) => (
              <div key={category.id}>
                {activeCategory === category.id && category.points.map((point, index) => {
                  const isVertical = point.labelPos === 'top' || point.labelPos === 'bottom';
                  const getTransform = () => {
                    switch(point.labelPos) {
                      case 'left': return 'translateX(-100%)';
                      case 'right': return 'translateY(-50%)';
                      case 'top': return 'translate(-50%, -100%)';
                      case 'bottom': return 'translateX(-50%)';
                      default: return 'translateY(-50%)';
                    }
                  };
                  
                  return (
                    <div
                      key={index}
                      className={`absolute flex items-center gap-1 ${
                        point.labelPos === 'left' ? 'flex-row-reverse' : 
                        isVertical ? 'flex-col' : ''
                      } ${point.labelPos === 'top' ? 'flex-col-reverse' : ''}`}
                      style={{ 
                        left: `${point.x}%`, 
                        top: `${point.y}%`, 
                        transform: getTransform()
                      }}
                    >
                      <div 
                        className={`w-3.5 h-3.5 ${category.color} rounded-full shadow-lg cursor-pointer hover:scale-125 transition-transform duration-200`} 
                        title={point.name}
                        onClick={() => point.url && window.open(point.url, '_blank')}
                      />
                      <div 
                        className={`text-neutral-700 text-xs md:text-sm font-normal font-['Playfair_Display'] leading-tight tracking-tight whitespace-nowrap ${isVertical ? 'text-center' : ''} ${point.url ? 'cursor-pointer hover:text-blue-600 hover:underline' : ''}`}
                        onClick={() => point.url && window.open(point.url, '_blank')}
                      >
                        {point.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
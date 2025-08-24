"use client";

import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";

const legendItems = [
  {
    id: "interest",
    color: "bg-amber-400",
    text: "Points d'intérêt",
    points: [
      { x: 8, y: 132, name: "Maison Monet" },
      { x: 327, y: 104, name: "Roche Guyon" },
      { x: 402, y: 365, name: "Thoiry Zoo Safari" },
      { x: 654, y: 290, name: "Chateau Saint Germain" },
      { x: 639, y: 553, name: "Chateau Versaille" },
      { x: 806, y: 469, name: "Tour Effel" },
      { x: 8, y: 219, name: "Mantes La Jolie" },
    ]
  },
  {
    id: "restaurants", 
    color: "bg-red-400",
    text: "Restaurants",
    points: [
      { x: 1, y: 472, name: "The Club House" },
      { x: 107, y: 504, name: "L'Auberge de la Truite" },
      { x: 229, y: 395, name: "Food truck L'hambourg" },
      { x: 526, y: 411, name: "Chez Eric Leautey" },
      { x: 244, y: 239, name: "Rive Gauche" },
      { x: 221, y: 279, name: "Le Salengro" },
      { x: 267, y: 209, name: "Au Vieux Pêcheur" },
      { x: 221, y: 345, name: "Le Moulin de la Reillère" },
    ]
  },
  {
    id: "markets",
    color: "bg-teal-400", 
    text: "Supermarchés / Marchés",
    points: [
      { x: 224, y: 310, name: "Grand frais" },
      { x: 223, y: 280, name: "E.Leclerc" },
      { x: 207, y: 330, name: "Carrefour Contact" },
      { x: 290, y: 191, name: "Carrefour Hypermarché" },
      { x: 62, y: 247, name: "Marché Du Vieux Pilori" },
      { x: 29, y: 272, name: "Auchan" },
    ]
  },
  {
    id: "activities",
    color: "bg-lime-400",
    text: "Activité", 
    points: [
      { x: -3, y: 544, name: "Malowe Nature - Ferme" },
      { x: 23, y: 524, name: "Pisciculture" },
      { x: 308, y: 379, name: "Paintball et Airsoft" },
      { x: 117, y: 488, name: "Gb Quarter Horses" },
      { x: 259, y: 239, name: "Evasion Escape game" },
      { x: 327, y: 278, name: "Golf Bluegreen" },
      { x: 289, y: 225, name: "Alligator Land" },
    ]
  },
];

export function Proxi() {
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="w-full bg-[#F5F0E6] inline-flex flex-col justify-start items-start gap-2.5 ">
      <div className="self-stretch h-64 px-80 py-28 inline-flex flex-col justify-center items-center gap-2.5 ">
        <div className="text-center justify-center text-[#8B5E3C] text-5xl font-black font-['Playfair_Display_SC'] leading-[56px]">
          Autour de Royal Auffreville
        </div>
        <div className="w-[512px] h-14 text-center justify-center text-[#8B5E3C] text-base font-normal font-['Playfair_Display'] leading-normal">
          Préparez votre séjour en explorant les meilleures adresses
        </div>
      </div>
      
      <div data-map="interactive" className="w-[1440px] h-[684px] bg-[#F5F0E6] inline-flex justify-between items-start overflow-hidden">
        <div className="w-[454px] self-stretch py-16 inline-flex flex-col justify-center items-center gap-10 overflow-hidden">
          {legendItems.map((item) => (
            <div 
              key={item.id}
              data-property-1={activeCategory === item.id ? "Active" : "Default"} 
              className={`self-stretch px-11 py-9 inline-flex justify-center items-center gap-2.5 overflow-hidden cursor-pointer transition-all duration-200 ${
                activeCategory === item.id ? 'bg-[#D4AF37]/20 rounded-lg' : 'hover:bg-[#8B5E3C]/10 rounded-lg'
              }`}
              onClick={() => handleCategoryClick(item.id)}
            >
              <div className={`w-12 h-12 ${item.color} rounded-full transition-all duration-200 ${
                activeCategory === item.id ? 'scale-110 shadow-lg' : ''
              }`} />
              <div className={`text-center justify-center text-3xl font-normal font-['Playfair_Display_SC'] leading-9 transition-colors duration-200 ${
                activeCategory === item.id ? 'text-[#D4AF37]' : 'text-[#8B5E3C]'
              }`}>
                {item.text}
              </div>
            </div>
          ))}
        </div>
        
        <div className=" flex justify-stretch items-stretch">
          {/* Base map image */}
          <img 
            className="w-full object-cover" 
            src="/LandscapeMapAuffreville.png" 
            alt="Carte de la région d'Auffreville"
          />
          
          {/* Interactive points overlay */}
          <div className="absolute inset-0">
            {legendItems.map((category) => (
              <div key={category.id}>
                {activeCategory === category.id && category.points.map((point, index) => (
                  <div
                    key={index}
                    className="absolute flex items-center gap-1"
                    style={{ left: `${point.x}px`, top: `${point.y}px` }}
                  >
                    <div 
                      className={`w-3.5 h-3.5 ${category.color} rounded-full shadow-lg cursor-pointer hover:scale-125 transition-transform duration-200`} 
                      title={point.name}
                      onClick={() => point.url && window.open(point.url, '_blank')}
                    />
                    <div 
                      className={`text-neutral-700 text-sm font-normal font-['Playfair_Display'] leading-tight tracking-tight whitespace-nowrap ${point.url ? 'cursor-pointer hover:text-blue-600 hover:underline' : ''}`}
                      onClick={() => point.url && window.open(point.url, '_blank')}
                    >
                      {point.name}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
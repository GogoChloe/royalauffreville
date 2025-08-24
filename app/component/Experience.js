"use client";

// 数据源：体验卡片
const experiences = [
  { key: "famille", title: "Moments en Famille", image: "/famille.JPG" },
  { key: "amis", title: "Retrouvailles Entre Amis", image: "/amis.JPG" },
  { key: "team", title: "Team Building", image: "/team.png" },
  { key: "wellness", title: "Retraite et Bien-être", image: "/stage.png" },
];

export function Experience() {
  return (
    <div className="w-full bg-[#F5F0E6] py-12 md:py-20 px-4 md:px-8 lg:px-16">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-12 md:mb-16">
        <h2 className="text-[#D4AF37] text-3xl md:text-4xl lg:text-5xl font-black font-['Playfair_Display_SC'] leading-tight mb-4">
          Une maison, mille expériences
        </h2>
        <p className="text-[#8B5E3C] text-base md:text-lg font-normal font-['Playfair_Display']">
          Des moments pour tous les goûts
        </p>
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
      </div>
    </div>
  );
}

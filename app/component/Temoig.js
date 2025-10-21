"use client";

import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

// 客户评价数据 - 来自真实Airbnb评论
const testimonials = [
  {
    id: 1,
    name: "Charlotte",
    location: "Sydney, Australie",
    date: "septembre 2024",
    avatar: "https://placehold.co/60x60",
    rating: 5,
    review: "Nous avons passé un très bon séjour chez Ludovic. La maison est équipée d'appareils modernes et est très confortable. Nous avons beaucoup apprécié notre escapade en famille...",
    flag: "🇦🇺",
    airbnbUrl: "https://www.airbnb.fr/rooms/916705848531563024?adults=9&guests=9&search_mode=regular_search&source_impression_id=p3_1753304084_P37kFQ6h6pukAlah&previous_page_section_name=1000&federated_search_id=3ba16147-423a-463f-bc7d-53e920741285"
  },
  {
    id: 2,
    name: "Loris",
    location: "Versailles, France",
    date: "mai 2025",
    avatar: "https://placehold.co/60x60",
    rating: 5,
    review: "Très belle propriété. Nous avons passé un weekend exceptionnel. Hyper spacieux. De belles prestations. Merci Ludovic...",
    flag: "🇫🇷",
    airbnbUrl: "https://www.airbnb.fr/rooms/916705848531563024?adults=9&guests=9&search_mode=regular_search&source_impression_id=p3_1753304084_P37kFQ6h6pukAlah&previous_page_section_name=1000&federated_search_id=3ba16147-423a-463f-bc7d-53e920741285"
  },
  {
    id: 3,
    name: "Bradley",
    location: "Cliffsend, Royaume-Uni",
    date: "avril 2025",
    avatar: "https://placehold.co/60x60",
    rating: 5,
    review: "Nous avons passé un très bon séjour, un super logement, très bien situé, super accueillant et serviable...",
    flag: "🇬🇧",
    airbnbUrl: "https://www.airbnb.fr/rooms/916705848531563024?adults=9&guests=9&search_mode=regular_search&source_impression_id=p3_1753304084_P37kFQ6h6pukAlah&previous_page_section_name=1000&federated_search_id=3ba16147-423a-463f-bc7d-53e920741285"
  },
  {
    id: 4,
    name: "Marie",
    location: "France",
    date: "juin 2025",
    avatar: "https://placehold.co/60x60",
    rating: 5,
    review: "Magnifique maison, propre et spacieuse ! Ludovic est réactif et accueillant. Nous avons passé un excellent weekend en famille...",
    flag: "🇫🇷",
    airbnbUrl: "https://www.airbnb.fr/rooms/916705848531563024?adults=9&guests=9&search_mode=regular_search&source_impression_id=p3_1753304084_P37kFQ6h6pukAlah&previous_page_section_name=1000&federated_search_id=3ba16147-423a-463f-bc7d-53e920741285"
  },
  {
    id: 5,
    name: "Maksym",
    location: "Ukraine",
    date: "juillet 2025",
    avatar: "https://placehold.co/60x60",
    rating: 5,
    review: "C'était un merveilleux week-end dans cette maison. La nature, l'atmosphère, la maison - excellent 🔥 J'ai passé du temps avec mes amis et tout le monde s'est senti comme à la maison...",
    flag: "🇺🇦",
    airbnbUrl: "https://www.airbnb.fr/rooms/916705848531563024?adults=9&guests=9&search_mode=regular_search&source_impression_id=p3_1753304084_P37kFQ6h6pukAlah&previous_page_section_name=1000&federated_search_id=3ba16147-423a-463f-bc7d-53e920741285"
  },
  {
    id: 6,
    name: "Lynne",
    location: "Australie",
    date: "août 2025",
    avatar: "https://placehold.co/60x60",
    rating: 5,
    review: "Nous avons passé un séjour fantastique ici. La maison était parfaite pour notre famille de 11 personnes, avec tout ce dont nous avions besoin pour nous amuser et nous détendre...",
    flag: "🇦🇺",
    airbnbUrl: "https://www.airbnb.fr/rooms/916705848531563024?adults=9&guests=9&search_mode=regular_search&source_impression_id=p3_1753304084_P37kFQ6h6pukAlah&previous_page_section_name=1000&federated_search_id=3ba16147-423a-463f-bc7d-53e920741285"
  },
  {
    id: 7,
    name: "Adrien",
    location: "France",
    date: "janvier 2025",
    avatar: "https://placehold.co/60x60",
    rating: 5,
    review: "La maison correspondait parfaitement aux photos ainsi qu'à la description. La qualité des prestations a rendu le séjour très agréable. Merci à Ludovic pour sa disponibilité...",
    flag: "🇫🇷",
    airbnbUrl: "https://www.airbnb.fr/rooms/916705848531563024?adults=9&guests=9&search_mode=regular_search&source_impression_id=p3_1753304084_P37kFQ6h6pukAlah&previous_page_section_name=1000&federated_search_id=3ba16147-423a-463f-bc7d-53e920741285"
  },
  {
    id: 8,
    name: "Herve",
    location: "France",
    date: "décembre 2024",
    avatar: "https://placehold.co/60x60",
    rating: 5,
    review: "Superbe maison, avec de grands espaces séparés pour chaque famille mais tous très bien équipés, une très grande pièce à vivre, le tout avec une décoration de qualité...",
    flag: "🇫🇷",
    airbnbUrl: "https://www.airbnb.fr/rooms/916705848531563024?adults=9&guests=9&search_mode=regular_search&source_impression_id=p3_1753304084_P37kFQ6h6pukAlah&previous_page_section_name=1000&federated_search_id=3ba16147-423a-463f-bc7d-53e920741285"
  },
  {
    id: 9,
    name: "Emily",
    location: "Pennsylvanie, États-Unis",
    date: "juin 2024",
    avatar: "https://placehold.co/60x60",
    rating: 5,
    review: "Emplacement merveilleux à proximité de Paris, Versailles et Giverny. Les salles de bains et la cuisine étaient haut de gamme. Les lits étaient très confortables...",
    flag: "🇺🇸",
    airbnbUrl: "https://www.airbnb.fr/rooms/916705848531563024?adults=9&guests=9&search_mode=regular_search&source_impression_id=p3_1753304084_P37kFQ6h6pukAlah&previous_page_section_name=1000&federated_search_id=3ba16147-423a-463f-bc7d-53e920741285"
  }
];

// 星星评分组件
function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`w-5 h-5 ${
            index < rating 
              ? "fill-[#D4AF37] text-[#D4AF37]" 
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

// 单个评价卡片组件
function TestimonialCard({ testimonial, t }) {
  return (
    <div className="w-full max-w-sm md:w-96 h-auto md:h-72 px-4 py-6 md:py-8 relative bg-white/40 shadow-[0px_4px_4px_0px_rgba(139,94,60,0.10)] border border-[#8B5E3C]/10 flex flex-col justify-start items-start gap-2 overflow-hidden rounded-lg">
      {/* 用户信息 */}
      <div className="w-full md:w-52 px-2 py-1 flex justify-start items-center gap-[5px] overflow-hidden">
        <div className="w-12 h-12 md:w-14 md:h-14 relative flex-shrink-0">
          <img 
            className="w-12 h-12 md:w-14 md:h-14 left-0 top-0 absolute rounded-full object-cover" 
            src={testimonial.avatar} 
            alt={testimonial.name}
          />
        </div>
        <div className="px-2 md:px-3 flex flex-col justify-center items-start overflow-hidden gap-1 min-w-0 flex-1">
          <div className="text-[#8B5E3C] text-sm md:text-base font-normal font-playfair leading-normal truncate w-full">
            {testimonial.name}
          </div>
          <div className="text-[#6A6A6A] text-xs font-normal font-playfair leading-none tracking-tight whitespace-nowrap overflow-hidden text-ellipsis w-full">
            {testimonial.location}
          </div>
          <div className="text-[#3E3E3E] text-xs font-normal font-playfair leading-none tracking-tight">
            {testimonial.date}
          </div>
        </div>
      </div>

      {/* 星星评分 */}
      <div className="px-2 flex justify-start items-center overflow-hidden">
        <StarRating rating={testimonial.rating} />
      </div>

      {/* 评价内容 */}
      <div className="w-full p-2 flex flex-col justify-start items-start gap-3 md:gap-4 overflow-hidden flex-1">
        <div className="self-stretch flex justify-center items-start gap-2.5 overflow-hidden">
          <div className="flex-1 text-[#3E3E3E] text-sm md:text-base font-normal font-playfair leading-relaxed md:leading-normal">
            {testimonial.review}
          </div>
        </div>
        <div className="self-stretch flex justify-between items-center overflow-hidden mt-auto">
          <div className="flex justify-between items-center overflow-hidden">
            <a 
              href={testimonial.airbnbUrl || "#"}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#8B5E3C] text-xs md:text-sm font-normal font-playfair leading-tight tracking-tight cursor-pointer hover:text-[#D4AF37] transition-colors group"
            >
              <span>{t.testimonialComp.readMore}</span>
              <svg 
                className="w-3 h-3 transition-transform group-hover:translate-x-0.5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6L16 12l-6 6" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* 引号图标 */}
      <Quote className="w-6 h-6 md:w-8 md:h-8 absolute right-3 md:right-4 top-3 md:top-4 text-[#D4AF37]/30" />
      
      {/* 国旗 */}
      <div className="absolute right-3 md:right-4 bottom-3 md:bottom-4 text-xl md:text-2xl">
        {testimonial.flag}
      </div>
    </div>
  );
}

export function Temoig() {
  const { language } = useLanguage();
  const t = translations[language];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  // 检测屏幕尺寸，调整可见卡片数量
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1); // 移动端显示1个
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2); // 平板显示2个
      } else {
        setVisibleCards(3); // 桌面显示3个
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 自动滚动
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = testimonials.length - visibleCards;
        return prevIndex >= maxIndex ? 0 : prevIndex + 1;
      });
    }, 5000); // 每5秒滚动一次

    return () => clearInterval(interval);
  }, [visibleCards]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = testimonials.length - visibleCards;
      return prevIndex >= maxIndex ? 0 : prevIndex + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = testimonials.length - visibleCards;
      return prevIndex <= 0 ? maxIndex : prevIndex - 1;
    });
  };

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + visibleCards);

  return (
    <div className="w-full py-24 px-4 md:px-7 bg-[#F5F0E6] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.01)] flex flex-col justify-start items-center gap-12 md:gap-20 overflow-hidden">
      {/* 标题 */}
      <div className="w-full text-center text-[#8B5E3C] text-3xl md:text-5xl font-black font-playfair leading-tight md:leading-[56px]">
        {t.testimonialComp.title}
      </div>
      
      {/* 评价卡片容器 */}
      <div className="relative w-full max-w-7xl mx-auto">
        {/* 导航按钮 - 在移动端隐藏，桌面端显示 */}
        <button
          onClick={prevSlide}
          className="hidden md:block absolute -left-6 lg:-left-12 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110"
          aria-label="Avis précédent"
        >
          <ChevronLeft className="w-6 h-6 text-[#8B5E3C]" />
        </button>
        
        <button
          onClick={nextSlide}
          className="hidden md:block absolute -right-6 lg:-right-12 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110"
          aria-label="Avis suivant"
        >
          <ChevronRight className="w-6 h-6 text-[#8B5E3C]" />
        </button>

        {/* 评价卡片 */}
        <div className="px-4 md:px-8 lg:px-12 py-6 md:py-10 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 overflow-hidden">
          {visibleTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} t={t} />
          ))}
        </div>

        {/* 指示器 */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {Array.from({ length: testimonials.length - visibleCards + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-[#8B5E3C] scale-110' 
                  : 'bg-[#8B5E3C]/30 hover:bg-[#8B5E3C]/50'
              }`}
              aria-label={`Aller à l'avis ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
"use client"
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

// 数字滚动组件
function CountUp({ end, duration = 2000, shouldStart }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;
    
    let startTime;
    setCount(0); // 重置计数器
    
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration, shouldStart]);

  return count;
}

export function ChiffreCles() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3, // 当组件30%可见时触发
        rootMargin: '0px 0px -50px 0px' // 稍微提前一点触发
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [isVisible]);

  return (
    <div 
      ref={containerRef}
      className="w-full py-16 md:py-28 px-4 md:px-40 inline-flex flex-col justify-center items-center gap-12 md:gap-20 overflow-hidden bg-[#FFFFFF]"
    >
      {/* 标题 */}
      <div className="w-full text-center text-[#D4AF37] text-3xl md:text-5xl font-black font-playfair leading-tight md:leading-[56px]">
        {t.stats.title}
      </div>
      
      {/* 描述 */}
      <div className="w-full max-w-[1058px] text-center text-[#3E3E3E] text-base md:text-lg font-normal font-playfair leading-6 md:leading-7">
        {t.stats.description}
      </div>
      
      {/* 统计数据 */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10 overflow-hidden w-full">
        {/* 面积 */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
          <div className="bg-[#FFFFFF] px-4 py-2 rounded-lg shadow-sm">
            <span className="text-4xl md:text-8xl font-black font-playfair text-[#8B5E3C]">
              <CountUp end={500} duration={2500} shouldStart={isVisible} />
            </span>
          </div>
          <div className="text-2xl md:text-6xl font-black font-playfair text-[#3E3E3E]">
            {t.stats.area}
          </div>
        </div>

        {/* 房间数 */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
          <div className="text-4xl md:text-8xl font-black font-playfair text-[#8B5E3C]">
            <CountUp end={6} duration={2000} shouldStart={isVisible} />
          </div>
          <div className="text-xl md:text-4xl font-black font-playfair text-[#3E3E3E]">
            {t.stats.bedrooms}
          </div>
        </div>

        {/* 客人数 */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
          <div className="text-4xl md:text-8xl font-black font-playfair text-[#8B5E3C]">
            <CountUp end={12} duration={2200} shouldStart={isVisible} />
          </div>
          <div className="text-xl md:text-4xl font-black font-playfair text-[#3E3E3E]">
            {t.stats.guests}
          </div>
        </div>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <div 
      className="w-full min-h-screen md:h-[566px] inline-flex flex-col justify-center items-center gap-16 md:gap-32 overflow-hidden bg-cover bg-no-repeat px-4 md:px-0 pointer-events-auto relative z-40"
      style={{
        backgroundImage: "url('/Hero.JPG')",
        backgroundPosition: "center 40%",
      }}
    >
      <div className="py-16 md:py-20 px-4 md:px-8 bg-[#8B5E3C]/80 rounded-[32px] flex flex-col justify-center items-center max-w-7xl mx-auto">
        <div className="w-full max-w-[1078px] text-center justify-start text-white text-2xl md:text-5xl font-black font-playfair leading-tight md:leading-[56px]">
          Un havre de paix à seulement 45 minutes de Paris
        </div>
        <div className="w-full max-w-[1136px] text-center justify-start text-white text-lg md:text-xl font-bold font-playfair leading-7 md:leading-9 mt-4">
          Évadez-vous dans notre domaine d'exception pour un séjour inoubliable
        </div>
      </div>
      <div className="inline-flex justify-start items-start relative z-[9999]">
        <Button 
          asChild
          className="px-4 py-2 bg-[#8B5E3C]/80 hover:bg-[#8B5E3C70] rounded-md flex justify-center items-center gap-2.5 text-white text-base font-normal font-playfair leading-normal pointer-events-auto relative z-[9999]"
        >
          <Link href="/reservation">
            Réserver Votre Séjour
          </Link>
        </Button>
      </div>
    </div>
  );
}
"use client";

import { Header } from "../../component/Header";
import { Footer } from "../../component/Footer";
import { Breadcrumb } from "../../component/Breadcrumb";
import { useRouter } from 'next/navigation';
import { useLanguage } from "../../context/LanguageContext";

export default function TeamBuildingPage() {
  const router = useRouter();
  const { language, t } = useLanguage();

  const breadcrumbItems = [
    { label: t.teamBuildingPage.breadcrumbHome, path: "/" },
    { label: t.teamBuildingPage.breadcrumbExperiences, path: "/experiences" },
    { label: t.teamBuildingPage.breadcrumbTeamBuilding, path: null }
  ];

  const teamFeatures = t.teamBuildingPage.features;
  const teamMoments = t.teamBuildingPage.moments;
  const localActivities = t.teamBuildingPage.activities;

  return (
    <div className="min-h-screen bg-[#F5F0E6] overflow-hidden">
      <Header />
      
      {/* Breadcrumb */}
      <div className="w-full px-14 pt-32 pb-8">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      
      {/* Page Header */}
      <div className="w-full px-14 py-3 flex flex-col gap-5">
        <h1 className="text-[#8B5E3C] text-4xl font-bold font-['Playfair_Display'] leading-10 tracking-tight">
          {t.teamBuildingPage.title}
        </h1>
        <p className="text-[#231F20] text-xs font-normal font-['Playfair_Display'] leading-none tracking-tight">
          {t.teamBuildingPage.subtitle}
        </p>
      </div>

      {/* Hero Image with Testimonial */}
      <div className="relative w-full h-[859px] mt-8">
        <img 
          className="w-full h-full object-cover" 
          src="/team.png" 
          alt="Team Building Royal Auffreville"
        />
        
        {/* Testimonial Card */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[996px] h-[531px] bg-white/90 rounded-[48px] flex flex-col justify-center items-center p-12">
          
          {/* Quote Icons */}
          <div className="absolute left-8 top-20 text-6xl text-[#8B5E3C] font-serif">"</div>
          <div className="absolute right-8 bottom-20 text-6xl text-[#8B5E3C] font-serif rotate-180">"</div>
          
          {/* Quote Text */}
          <div className="text-center text-[#8B5E3C] text-3xl font-bold font-['Playfair_Display'] leading-9 mb-8 max-w-[705px]">
            {t.teamBuildingPage.testimonial.quote}
          </div>
          
          {/* Author */}
          <div className="text-center text-[#8B5E3C] text-3xl font-bold font-['Playfair_Display'] leading-9 mb-8">
            {t.teamBuildingPage.testimonial.author}
          </div>
          
          {/* CTA Button */}
          <button 
            onClick={() => router.push('/rooms')}
            className="px-4 py-2 bg-[#D4AF37] rounded-md text-white text-lg font-medium font-['Cormorant'] leading-relaxed hover:bg-[#D4AF37]/90 transition-colors"
          >
            {t.teamBuildingPage.cta.button}
          </button>
        </div>
      </div>

      {/* Why Teams Love Section */}
      <div className="w-full px-4 py-20">
        <div className="max-w-[1120px] mx-auto">
          <h2 className="text-center text-[#231F20] text-4xl font-semibold font-['Playfair_Display'] leading-[60px] mb-16">
            {t.teamBuildingPage.sections.whyTeams}
          </h2>
          
          <div className="grid grid-cols-2 gap-8">
            {teamFeatures.map((feature, index) => (
              <div key={index} className="p-8 bg-white rounded-md shadow-md flex flex-col items-center">
                <div className="w-16 h-20 pb-4 flex justify-center items-start">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex justify-center items-center">
                    <span className="text-3xl">{feature.icon}</span>
                  </div>
                </div>
                <div className="text-center text-[#231F20] text-lg font-normal font-['Cormorant'] leading-loose">
                  {feature.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Moments to Share Section */}
      <div className="w-full px-80 py-20 bg-white">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="text-center text-[#231F20] text-4xl font-semibold font-['Playfair_Display'] leading-[60px] mb-16">
            {t.teamBuildingPage.sections.momentsToShare}
          </h2>
          
          <div className="flex justify-center gap-8">
            {teamMoments.map((moment, index) => (
              <div key={index} className="w-96 flex flex-col gap-4">
                <div className="bg-white rounded-md shadow-lg overflow-hidden">
                  <img 
                    src={moment.image} 
                    alt={moment.title}
                    className="w-full h-96 object-cover"
                  />
                </div>
                <div className="text-center text-[#231F20] text-xl font-medium font-['Cormorant'] leading-loose">
                  {moment.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Local Activities Section */}
      <div className="w-full px-4 py-20 bg-white">
        <div className="max-w-[1425px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[#374151] text-4xl font-semibold font-['Playfair_Display'] leading-[60px] mb-3">
              {t.teamBuildingPage.sections.localActivities}
            </h2>
            <p className="text-[#374151] text-lg font-normal font-['Cormorant'] leading-loose max-w-[672px] mx-auto">
              {t.teamBuildingPage.sections.localActivitiesSubtitle}
            </p>
          </div>
          
          <div className="flex justify-center gap-6 flex-wrap">
            {localActivities.map((activity, index) => (
              <div key={index} className="w-96 bg-white rounded-md shadow-md overflow-hidden">
                <div className="h-72 bg-gray-100 relative overflow-hidden">
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 rounded-full flex justify-center items-center">
                    <span className="text-2xl">{activity.emoji}</span>
                  </div>
                </div>
                <div className="px-6 pt-6 pb-6 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 text-[#D4AF37]">📍</div>
                    <span className="text-[#D4AF37] text-sm font-medium font-['Cormorant']">
                      {activity.time}
                    </span>
                  </div>
                  <h3 className="text-[#374151] text-2xl font-semibold font-['Playfair_Display'] leading-9">
                    {activity.title}
                  </h3>
                  <p className="text-[#6B7280] text-base font-normal font-['Cormorant'] leading-relaxed">
                    {activity.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-6">
            <div className="flex justify-center items-center gap-2">
              <span className="text-[#D4AF37] text-xl">📍</span>
              <p className="text-[#374151] text-base font-normal font-['Cormorant']">
                {t.teamBuildingPage.sections.moreActivities}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full py-24 flex flex-col items-center gap-16">
        <h2 className="text-center text-[#8B5E3C] text-4xl font-semibold font-['Playfair_Display'] leading-[52px] max-w-4xl">
          {t.teamBuildingPage.cta.title}
        </h2>
        
        <button 
          onClick={() => router.push('/reservation')}
          className="px-10 py-4 bg-[#D4AF37] rounded-md shadow-lg text-white text-xl font-medium font-['Cormorant'] leading-loose hover:bg-[#D4AF37]/90 transition-colors"
        >
          {t.teamBuildingPage.cta.button2}
        </button>
      </div>

      <Footer />
    </div>
  );
}

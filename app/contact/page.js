"use client";

import { Header } from "../component/Header";
import { Footer } from "../component/Footer";
import Contact from "../component/Contact";
import { Breadcrumb } from "../component/Breadcrumb";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

export default function ContactPage() {
  const { language } = useLanguage();
  const t = translations[language];
  
  const breadcrumbItems = [
    { label: t.contactPage.breadcrumbHome, path: "/" },
    { label: t.contactPage.breadcrumbContact, path: null }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="pt-32 px-4 sm:px-8 md:px-16 lg:px-24">
        <Breadcrumb items={breadcrumbItems} />
        <div className="py-8">
          <h1 className="text-[#8B5E3C] text-4xl font-bold font-['Playfair_Display'] mb-4">
            {t.contactPage.title}
          </h1>
          <p className="text-neutral-700 text-base font-['Playfair_Display'] leading-relaxed mb-8">
            {t.contactPage.subtitle}
          </p>
        </div>
      </div>
      <Contact showTitle={false} />
      <Footer />
    </div>
  );
}

"use client";

import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterError, setNewsletterError] = useState('');
  const { language } = useLanguage();
  const t = translations[language];

  const navigationItems = [
    t.nav.house,
    t.testimonials.title,
    t.nav.experiences,
    t.nav.activities,
    t.nav.proximity,
    t.nav.contact,
  ];

  const legalItems = [
    t.footer.legalItems.terms,
    t.footer.legalItems.privacy
  ];

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(newsletterEmail)) {
      setNewsletterError(t.contact.errors.emailInvalid);
      return;
    }

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: newsletterEmail,
          type: 'newsletter'
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setNewsletterEmail('');
        setNewsletterError('');
        alert(t.footer.newsletterSuccess);
      } else {
        alert('Une erreur s\'est produite. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Une erreur s\'est produite. Veuillez réessayer.');
    }
  };

  return (
    <div className="w-full border-t border-[#D4AF37] inline-flex flex-col justify-start items-start overflow-hidden">
      {/* Newsletter Section */}
      <div className="self-stretch px-7 py-8 bg-[#8B5E3C]/70 border-b border-[#D4AF37] inline-flex justify-center items-center">
        <div className="w-full max-w-md flex flex-col gap-3">
          <div className="text-center text-white text-lg font-normal font-['Playfair_Display'] leading-normal">
            {t.footer.newsletter}
          </div>
          <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => {
                setNewsletterEmail(e.target.value);
                setNewsletterError('');
              }}
              placeholder={t.footer.newsletterPlaceholder}
              className={`flex-1 px-4 py-2 bg-white border ${newsletterError ? 'border-red-500' : 'border-[#D4AF37]'} rounded-md text-sm font-['Lato'] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50`}
              required
            />
            <Button 
              type="submit"
              className="bg-[#D4AF37] hover:bg-[#D4AF37]/80 text-[#8B5E3C] font-['Playfair_Display'] px-6 py-2"
            >
              {t.footer.subscribe}
            </Button>
          </form>
          {newsletterError && <p className="text-red-300 text-xs text-center">{newsletterError}</p>}
        </div>
      </div>
      
      <div className="self-stretch h-80 px-7 py-12 bg-[#8B5E3C]/80 inline-flex justify-center items-start gap-11 overflow-hidden">
        {/* Logo and Contact Info Section */}
        <div className="w-80 self-stretch inline-flex flex-col justify-start items-center overflow-hidden">
          <div className="self-stretch inline-flex justify-center items-center mb-4">
            <div>
              <img src="/logo.png" alt="Royal Auffreville Logo" className="h-16 brightness-0 invert" />
            </div>
          </div>
          
          <div className="self-stretch py-2 flex flex-col justify-start items-start gap-2 overflow-hidden">
            <div className="w-full flex justify-start items-center gap-4 py-1">
              <MapPin className="w-6 h-6 text-white flex-shrink-0" />
              <div className="flex-1 text-white text-sm font-normal font-['Playfair_Display'] leading-relaxed">
                20 rue de la Haie Boulland, 78930
              </div>
            </div>
            
            <div className="w-full flex justify-start items-center gap-4 py-1">
              <Mail className="w-6 h-6 text-white flex-shrink-0" />
              <div className="flex-1 text-white text-sm font-normal font-['Playfair_Display'] leading-relaxed">
                royalauffreville@gmail.com
              </div>
            </div>
            
            <div className="w-full flex justify-start items-center gap-4 py-1">
              <Phone className="w-6 h-6 text-white flex-shrink-0" />
              <div className="flex-1 text-white text-sm font-normal font-['Playfair_Display'] leading-relaxed">
                +33 (0)781368887
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 self-stretch inline-flex flex-col justify-start items-start gap-3 overflow-hidden">
          <div className="px-7 py-2 inline-flex justify-center items-center gap-2.5 overflow-hidden">
            <div className="justify-start text-white text-base font-normal font-['Playfair_Display'] leading-normal">
              {t.footer.navigation}
            </div>
          </div>
          
          <div className="flex-1 flex flex-col justify-start items-start gap-1.5 overflow-hidden">
            {navigationItems.map((item, index) => (
              <div key={index} className="px-9 py-0.5 inline-flex justify-center items-center gap-2.5 overflow-hidden cursor-pointer hover:opacity-80">
                <div className="justify-start text-white text-xs font-normal font-['Playfair_Display'] leading-none tracking-tight">
                  {item}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Section */}
        <div className="flex-1 self-stretch inline-flex flex-col justify-start items-start gap-3 overflow-hidden">
          <div className="px-7 py-2 inline-flex justify-center items-center overflow-hidden">
            <div className="justify-start text-white text-base font-normal font-['Playfair_Display'] leading-normal">
              {t.footer.legal}
            </div>
          </div>
          
          <div className="flex flex-col justify-center items-start gap-2.5 overflow-hidden">
            {legalItems.map((item, index) => (
              <div key={index} className="px-9 py-0.5 inline-flex justify-center items-center gap-2.5 overflow-hidden cursor-pointer hover:opacity-80">
                <div className="justify-start text-white text-xs font-normal font-['Playfair_Display'] leading-none tracking-tight">
                  {item}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Media Section */}
        <div className="flex-1 self-stretch inline-flex flex-col justify-start items-center gap-3 overflow-hidden">
          <div className="px-7 py-2 inline-flex justify-center items-center gap-2.5 overflow-hidden">
            <div className="justify-start text-white text-base font-normal font-['Playfair_Display'] leading-normal">
              {t.footer.follow}
            </div>
          </div>
          
          <div className="flex flex-col justify-start items-start overflow-hidden">
            <div className="inline-flex justify-center items-center overflow-hidden cursor-pointer hover:opacity-80">
              <Instagram className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright Section */}
      <div className="self-stretch h-16 px-[553px] py-1.5 bg-[#8B5E3C]/80 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)] border-t border-[#D4AF37] inline-flex justify-center items-center gap-2.5 overflow-hidden">
        <div className="justify-start text-white text-xs font-normal font-['Playfair_Display'] leading-none tracking-tight">
          {t.footer.copyright}
        </div>
      </div>
    </div>
  );
}
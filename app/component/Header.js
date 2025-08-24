"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { ChevronDown, UserRound } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AuthModal } from "./AuthModal";

const navigationItems = [
  { label: "La Maison", href: "/rooms" },
  { label: "Expériences", href: "/#experiences" },
  { label: "Activité", href: "/#activite" },
  { label: "Proximité", href: "/#proximite" },
  { label: "Contact", href: "/#contact" },
];

export function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleUserClick = () => {
    setIsAuthModalOpen(true);
  };

  const handleAuthModalClose = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full px-20 bg-[#F5F0E6] inline-flex justify-start items-center overflow-hidden py-2 pointer-events-auto z-50">
      {/* Logo Section */}
      <Link href="/" className="w-56 flex justify-start items-center pointer-events-auto">
        <div className="w-full relative mx-2">
          <img 
            className="w-full rounded-full" 
            src="/logo.png" 
            alt="Logo"
          />
        </div>
      </Link>

      {/* Main Content Section */}
      <div className="w-[1047px] flex justify-between items-center pointer-events-auto">
        {/* Navigation Menu */}
        <div className="px-9 py-2.5 flex justify-center items-center gap-2.5 overflow-hidden">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-0">
              {navigationItems.map((item, idx) => (
                <NavigationMenuItem key={idx}>
                  <div className="w-36 flex justify-center items-center gap-2.5 overflow-hidden">
                    <NavigationMenuLink 
                      href={item.href}
                      className="justify-start text-black text-base font-normal font-['Playfair_Display'] leading-normal hover:text-[#8B5E3C] hover:underline hover:bg-transparent transition-all duration-200 border-none hover:border-none pointer-events-auto"
                    >
                      {item.label}
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        <div className="flex items-center gap-4">
        {/* User Icon */}
        <div 
          className="w-6 h-6 relative overflow-hidden cursor-pointer hover:opacity-70 transition-opacity pointer-events-auto"
          onClick={handleUserClick}
        >
          <UserRound className="w-6 h-6 text-black" />
        </div>

        {/* Réserver Button */}
        <div className="flex justify-start items-start">
          <Link href="/reservation">
            <Button 
              className="px-4 py-2 bg-[#D4AF37] hover:bg-[#D4AF37]/80 rounded-md flex justify-center items-center gap-2.5 text-[#FFFFFF] text-base font-normal font-['Playfair_Display'] leading-normal pointer-events-auto"
              onClick={() => console.log('Réserver button clicked')}
            >
              Réserver
            </Button>
          </Link>
        </div>

        {/* Language Selector */}
        <div className="inline-flex flex-col justify-start items-start gap-1.5">
          <Select defaultValue="fr">
            <SelectTrigger className="w-fit px-3 py-2 bg-orange-50 rounded-md inline-flex justify-start items-center gap-2.5 border-none font-['Playfair_Display'] focus:!ring-0 focus:!ring-offset-0 focus-visible:!ring-0 focus-visible:!border-none outline-none !pointer-events-auto">
              <SelectValue className="justify-start text-[#3E3E3E] text-base font-normal font-['Playfair_Display'] leading-normal !pointer-events-auto" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 rounded-md shadow-lg z-50 !pointer-events-auto">
              <SelectItem 
                value="fr" 
                className="text-[#3E3E3E] font-['Playfair_Display'] hover:bg-orange-50 focus:bg-orange-50 !pointer-events-auto cursor-pointer"
              >
                Fr
              </SelectItem>
              <SelectItem 
                value="en" 
                className="text-[#3E3E3E] font-['Playfair_Display'] hover:bg-orange-50 focus:bg-orange-50 !pointer-events-auto cursor-pointer"
              >
                En
              </SelectItem>
              <SelectItem 
                value="cn" 
                className="text-[#3E3E3E] font-['Playfair_Display'] hover:bg-orange-50 focus:bg-orange-50 !pointer-events-auto cursor-pointer"
              >
                中文
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      </div>

      {/* AuthModal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={handleAuthModalClose} 
      />
    </div>
  );
}
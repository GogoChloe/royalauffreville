"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { ChevronDown, UserRound } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { Menu } from "lucide-react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const handleUserClick = () => {
    setIsAuthModalOpen(true);
  };

  const handleAuthModalClose = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-[#F5F0E6] z-50 shadow flex items-center px-4 md:px-20 py-2">
      {/* Logo */}
      <Link href="/" className="flex items-center shrink-0 z-50">
        <img className="w-full rounded-full" src="/logo.png" alt="Logo" />
      </Link>

      {/* 桌面导航 */}
      <nav className="hidden md:flex flex-1 justify-center items-center gap-2.5">
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
      </nav>

      {/* 桌面右侧操作区 */}
      <div className="hidden md:flex items-center gap-4 ml-auto">
        <div className="w-6 h-6 relative overflow-hidden cursor-pointer hover:opacity-70 transition-opacity pointer-events-auto" onClick={handleUserClick}>
          <UserRound className="w-6 h-6 text-black" />
        </div>
        <Link href="/reservation">
          <Button className="px-4 py-2 bg-[#D4AF37] hover:bg-[#D4AF37]/80 rounded-md flex justify-center items-center gap-2.5 text-[#FFFFFF] text-base font-normal font-['Playfair_Display'] leading-normal pointer-events-auto">
            Réserver
          </Button>
        </Link>
        <div className="inline-flex flex-col justify-start items-start gap-1.5">
          <Select defaultValue="fr">
            <SelectTrigger className="w-fit px-3 py-2 bg-orange-50 rounded-md inline-flex justify-start items-center gap-2.5 border-none font-['Playfair_Display'] focus:!ring-0 focus:!ring-offset-0 focus-visible:!ring-0 focus-visible:!border-none outline-none !pointer-events-auto">
              <SelectValue className="justify-start text-[#3E3E3E] text-base font-normal font-['Playfair_Display'] leading-normal !pointer-events-auto" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 rounded-md shadow-lg z-50 !pointer-events-auto">
              <SelectItem value="fr" className="text-[#3E3E3E] font-['Playfair_Display'] hover:bg-orange-50 focus:bg-orange-50 !pointer-events-auto cursor-pointer">Fr</SelectItem>
              <SelectItem value="en" className="text-[#3E3E3E] font-['Playfair_Display'] hover:bg-orange-50 focus:bg-orange-50 !pointer-events-auto cursor-pointer">En</SelectItem>
              <SelectItem value="cn" className="text-[#3E3E3E] font-['Playfair_Display'] hover:bg-orange-50 focus:bg-orange-50 !pointer-events-auto cursor-pointer">中文</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* 移动端汉堡按钮 */}
      <button className="md:hidden ml-auto z-50 p-2" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
        <Menu className="w-7 h-7 text-black" />
      </button>

      {/* 移动端抽屉菜单 */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/40 z-[999] flex md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="bg-[#F5F0E6] w-4/5 max-w-xs h-full shadow-lg p-6 flex flex-col gap-8" onClick={e => e.stopPropagation()}>
            <button className="self-end mb-4" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <nav className="flex flex-col gap-6">
              {navigationItems.map((item, idx) => (
                <Link key={idx} href={item.href} className="text-lg font-['Playfair_Display'] text-black hover:text-[#8B5E3C]" onClick={() => setMobileMenuOpen(false)}>
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-4 mt-auto">
              <Button className="px-4 py-2 bg-[#D4AF37] hover:bg-[#D4AF37]/80 rounded-md text-[#FFFFFF] text-base font-normal font-['Playfair_Display'] leading-normal" onClick={() => { setMobileMenuOpen(false); window.location.href='/reservation'; }}>
                Réserver
              </Button>
              <div className="inline-flex flex-col justify-start items-start gap-1.5">
                <Select defaultValue="fr">
                  <SelectTrigger className="w-fit px-3 py-2 bg-orange-50 rounded-md inline-flex justify-start items-center gap-2.5 border-none font-['Playfair_Display'] focus:!ring-0 focus:!ring-offset-0 focus-visible:!ring-0 focus-visible:!border-none outline-none !pointer-events-auto">
                    <SelectValue className="justify-start text-[#3E3E3E] text-base font-normal font-['Playfair_Display'] leading-normal !pointer-events-auto" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 rounded-md shadow-lg z-50 !pointer-events-auto">
                    <SelectItem value="fr" className="text-[#3E3E3E] font-['Playfair_Display'] hover:bg-orange-50 focus:bg-orange-50 !pointer-events-auto cursor-pointer">Fr</SelectItem>
                    <SelectItem value="en" className="text-[#3E3E3E] font-['Playfair_Display'] hover:bg-orange-50 focus:bg-orange-50 !pointer-events-auto cursor-pointer">En</SelectItem>
                    <SelectItem value="cn" className="text-[#3E3E3E] font-['Playfair_Display'] hover:bg-orange-50 focus:bg-orange-50 !pointer-events-auto cursor-pointer">中文</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 登录弹窗 */}
      <AuthModal isOpen={isAuthModalOpen} onClose={handleAuthModalClose} />
    </header>
  );
}
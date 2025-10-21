"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Calendar, Mail, Phone, MapPin, Settings, LogOut } from 'lucide-react';
import { Header } from '../component/Header';
import { Footer } from '../component/Footer';
import { useLanguage } from '../context/LanguageContext';

export default function EspaceClientPage() {
  const { language, t } = useLanguage();
  const router = useRouter();
  const [userInfo] = useState({
    name: 'Jean Dupont',
    email: 'jean.dupont@gmail.com',
    phone: '+33 1 23 45 67 89',
    address: '123 rue de la Paix, 75001 Paris'
  });

  const handleReservation = () => {
    router.push('/reservation');
  };

  const handleEditProfile = () => {
    router.push('/profile-settings');
  };

  const handleLogout = () => {
    // 这里可以添加登出逻辑，比如清除token等
    console.log('User logged out');
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#F5F0E6]">
      <Header />
      
      {/* Page Title Section */}
      <div className="bg-white border-b pt-20">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-['Playfair_Display'] text-[#8B5E3C]">
                {t.espaceClient.mySpace}
              </h1>
              <p className="text-stone-600 font-['Lato'] text-sm mt-1">
                {t.espaceClient.manageReservations}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-[#8B5E3C] rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-xl font-['Playfair_Display'] text-[#8B5E3C]">
                  {userInfo.name}
                </h2>
                <p className="text-stone-600 font-['Lato'] text-sm">
                  {t.espaceClient.memberSince}
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#8B5E3C]" />
                  <span className="font-['Lato'] text-sm text-stone-700">{userInfo.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#8B5E3C]" />
                  <span className="font-['Lato'] text-sm text-stone-700">{userInfo.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#8B5E3C]" />
                  <span className="font-['Lato'] text-sm text-stone-700">{userInfo.address}</span>
                </div>
              </div>
              
              <button 
                onClick={handleEditProfile}
                className="w-full mt-6 py-2 bg-[#8B5E3C] hover:bg-[#8B5E3C]/90 text-white rounded-md font-['Playfair_Display'] transition-colors cursor-pointer text-sm flex items-center justify-center gap-2"
              >
                <Settings className="w-4 h-4" />
                {t.espaceClient.editInfo}
              </button>
              
              <button 
                onClick={handleLogout}
                className="w-full mt-3 py-2 bg-white hover:bg-gray-50 text-stone-600 border border-stone-300 rounded-md font-['Playfair_Display'] transition-colors cursor-pointer text-sm flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                {t.espaceClient.logout}
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h3 className="text-lg font-['Playfair_Display'] text-[#8B5E3C] mb-4">
                {t.espaceClient.myReservations}
              </h3>
              
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                <p className="text-stone-600 font-['Lato'] text-sm">
                  {t.espaceClient.noReservations}
                </p>
                <button 
                  onClick={handleReservation}
                  className="mt-4 px-6 py-2 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white rounded-md font-['Playfair_Display'] transition-colors cursor-pointer text-sm"
                >
                  {t.espaceClient.makeReservation}
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-['Playfair_Display'] text-[#8B5E3C] mb-4">
                {t.espaceClient.quickActions}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button 
                  onClick={handleReservation}
                  className="p-4 border border-[#8B5E3C] rounded-md hover:bg-[#8B5E3C]/5 transition-colors text-left"
                >
                  <h4 className="font-['Playfair_Display'] text-[#8B5E3C] mb-2">{t.espaceClient.newReservation}</h4>
                  <p className="font-['Lato'] text-sm text-stone-600">{t.espaceClient.bookNextExperience}</p>
                </button>
                
                <button className="p-4 border border-[#8B5E3C] rounded-md hover:bg-[#8B5E3C]/5 transition-colors text-left">
                  <h4 className="font-['Playfair_Display'] text-[#8B5E3C] mb-2">{t.espaceClient.myFavorites}</h4>
                  <p className="font-['Lato'] text-sm text-stone-600">{t.espaceClient.manageFavorites}</p>
                </button>
                
                <button className="p-4 border border-[#8B5E3C] rounded-md hover:bg-[#8B5E3C]/5 transition-colors text-left">
                  <h4 className="font-['Playfair_Display'] text-[#8B5E3C] mb-2">{t.espaceClient.history}</h4>
                  <p className="font-['Lato'] text-sm text-stone-600">{t.espaceClient.viewHistory}</p>
                </button>
                
                <button className="p-4 border border-[#8B5E3C] rounded-md hover:bg-[#8B5E3C]/5 transition-colors text-left">
                  <h4 className="font-['Playfair_Display'] text-[#8B5E3C] mb-2">{t.espaceClient.support}</h4>
                  <p className="font-['Lato'] text-sm text-stone-600">{t.espaceClient.contactTeam}</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
    
  );
}

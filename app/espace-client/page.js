"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Calendar, Mail, Phone, MapPin, Settings, LogOut } from 'lucide-react';
import { Header } from '../component/Header';
import { Footer } from '../component/Footer';

export default function EspaceClientPage() {
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

  return (
    <div className="min-h-screen bg-[#F5F0E6]">
      <Header />
      
      {/* Page Title Section */}
      <div className="bg-white border-b pt-20">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-['Playfair_Display'] text-[#8B5E3C]">
                Mon Espace Client
              </h1>
              <p className="text-stone-600 font-['Lato'] text-sm mt-1">
                Gérez vos réservations et préférences
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
                  Membre depuis août 2025
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
              
              <button className="w-full mt-6 py-2 bg-[#8B5E3C] hover:bg-[#8B5E3C]/90 text-white rounded-md font-['Playfair_Display'] transition-colors cursor-pointer text-sm flex items-center justify-center gap-2">
                <Settings className="w-4 h-4" />
                Modifier mes informations
              </button>
              
              <button className="w-full mt-3 py-2 bg-white hover:bg-gray-50 text-stone-600 border border-stone-300 rounded-md font-['Playfair_Display'] transition-colors cursor-pointer text-sm flex items-center justify-center gap-2">
                <LogOut className="w-4 h-4" />
                Déconnexion
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h3 className="text-lg font-['Playfair_Display'] text-[#8B5E3C] mb-4">
                Mes Réservations
              </h3>
              
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                <p className="text-stone-600 font-['Lato'] text-sm">
                  Aucune réservation pour le moment
                </p>
                <button 
                  onClick={handleReservation}
                  className="mt-4 px-6 py-2 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white rounded-md font-['Playfair_Display'] transition-colors cursor-pointer text-sm"
                >
                  Faire une réservation
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-['Playfair_Display'] text-[#8B5E3C] mb-4">
                Actions Rapides
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button 
                  onClick={handleReservation}
                  className="p-4 border border-[#8B5E3C] rounded-md hover:bg-[#8B5E3C]/5 transition-colors text-left"
                >
                  <h4 className="font-['Playfair_Display'] text-[#8B5E3C] mb-2">Nouvelle Réservation</h4>
                  <p className="font-['Lato'] text-sm text-stone-600">Réserver votre prochaine expérience</p>
                </button>
                
                <button className="p-4 border border-[#8B5E3C] rounded-md hover:bg-[#8B5E3C]/5 transition-colors text-left">
                  <h4 className="font-['Playfair_Display'] text-[#8B5E3C] mb-2">Mes Favoris</h4>
                  <p className="font-['Lato'] text-sm text-stone-600">Gérer vos expériences favorites</p>
                </button>
                
                <button className="p-4 border border-[#8B5E3C] rounded-md hover:bg-[#8B5E3C]/5 transition-colors text-left">
                  <h4 className="font-['Playfair_Display'] text-[#8B5E3C] mb-2">Historique</h4>
                  <p className="font-['Lato'] text-sm text-stone-600">Consulter vos anciennes réservations</p>
                </button>
                
                <button className="p-4 border border-[#8B5E3C] rounded-md hover:bg-[#8B5E3C]/5 transition-colors text-left">
                  <h4 className="font-['Playfair_Display'] text-[#8B5E3C] mb-2">Support</h4>
                  <p className="font-['Lato'] text-sm text-stone-600">Contactez notre équipe</p>
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

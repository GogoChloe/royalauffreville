"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Contact() {
  const [chatMessage, setChatMessage] = useState('');
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    telephone: '',
    email: '',
    message: ''
  });

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (chatMessage.trim()) {
      // Handle chat message submission
      console.log('Chat message:', chatMessage);
      setChatMessage('');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle contact form submission
    console.log('Form data:', formData);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="w-full min-h-screen px-3.5 py-24 flex flex-col justify-start items-center bg-white">
      {/* Title */}
      <div className="w-full py-1 flex justify-center items-center mb-8">
        <h1 className="text-[#D4AF37] text-5xl font-black font-['Playfair_Display_SC'] leading-[56px] text-center">
          Une question ? On est là pour vous
        </h1>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-[1400px] flex flex-col justify-start items-center gap-16">
        
        {/* Chat Assistant Section */}
        <Card className="w-full lg:w-[665px] bg-[#F5F0E6] border border-[#D4AF37]/30 shadow-lg">
          <CardContent className="p-12">
            <div className="text-center mb-12">
              <h2 className="text-[#8B5E3C] text-2xl font-black font-['Playfair_Display_SC'] leading-7">
                Bienvenue chez Royal Auffreville ！ Je suis l'assistant maison, prêt à vous répondre des questions
              </h2>
            </div>
            
            <form onSubmit={handleChatSubmit} className="space-y-6">
              <div className="bg-[#F5F0E6] rounded-t-2xl p-6">
                <textarea
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Écrivez ici..."
                  className="w-full h-24 px-4 py-3 bg-[#F5F0E6] border border-[#D4AF37]/40 rounded-md resize-none placeholder:text-gray-400 text-sm font-['Playfair_Display'] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                />
              </div>
              <Button 
                type="submit"
                className="w-full bg-[#8B5E3C]/50 hover:bg-[#8B5E3C]/70 text-[#F5F0E6] font-['Playfair_Display'] py-3"
              >
                Envoyer
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Form Section */}
        <Card className="w-full lg:w-[665px] bg-[#F5F0E6] border border-[#D4AF37]/30 shadow-lg">
          <CardContent className="p-12">
            <div className="text-center mb-12">
              <h2 className="text-[#8B5E3C] text-2xl font-black font-['Playfair_Display_SC'] leading-7">
                Vous n'avez pas trouvé votre réponse ? Écrivez-nous
              </h2>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Prénom */}
                <div className="space-y-3">
                  <label className="text-[#3E3E3E] text-sm font-normal font-['Lato']">
                    Prénom*
                  </label>
                  <input
                    type="text"
                    value={formData.prenom}
                    onChange={(e) => handleInputChange('prenom', e.target.value)}
                    className="w-full px-4 py-3 bg-[#F5F0E6] border border-[#D4AF37] rounded-md text-sm font-['Lato'] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                    required
                  />
                </div>

                {/* Nom */}
                <div className="space-y-3">
                  <label className="text-[#3E3E3E] text-sm font-normal font-['Lato']">
                    Nom*
                  </label>
                  <input
                    type="text"
                    value={formData.nom}
                    onChange={(e) => handleInputChange('nom', e.target.value)}
                    className="w-full px-4 py-3 bg-[#F5F0E6] border border-[#D4AF37] rounded-md text-sm font-['Lato'] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                    required
                  />
                </div>

                {/* Téléphone */}
                <div className="space-y-3">
                  <label className="text-[#3E3E3E] text-sm font-normal font-['Lato']">
                    Téléphone*
                  </label>
                  <input
                    type="tel"
                    value={formData.telephone}
                    onChange={(e) => handleInputChange('telephone', e.target.value)}
                    className="w-full px-4 py-3 bg-[#F5F0E6] border border-[#D4AF37] rounded-md text-sm font-['Lato'] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-3">
                  <label className="text-[#3E3E3E] text-sm font-normal font-['Lato']">
                    E-mail*
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 bg-[#F5F0E6] border border-[#D4AF37] rounded-md text-sm font-['Lato'] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                    required
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-3">
                <label className="text-[#3E3E3E] text-sm font-normal font-['Playfair_Display']">
                  Votre message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Écrivez ici..."
                  className="w-full h-24 px-4 py-3 bg-[#F5F0E6] border border-[#D4AF37]/40 rounded-md resize-none placeholder:text-gray-400 text-sm font-['Playfair_Display'] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                />
              </div>

              <Button 
                type="submit"
                className="w-full bg-[#8B5E3C]/50 hover:bg-[#8B5E3C]/70 text-[#F5F0E6] font-['Playfair_Display'] py-3 mt-8"
              >
                Envoyer
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
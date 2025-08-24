"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Calendar, Users, Baby, User, CreditCard, Shield } from "lucide-react";

export function ReservationFormSection() {
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    adults: '1',
    children: '1',
    infants: '1',
    paymentMethod: 'card',
    acceptTerms: false
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Reservation data:', formData);
    // 这里可以添加提交逻辑
  };

  return (
    <div className="self-stretch px-24 py-8 inline-flex flex-col justify-start items-start gap-16">
      <div className="self-stretch inline-flex justify-start items-center gap-2.5 overflow-hidden">
        <div className="justify-start text-neutral-700 text-xs font-normal font-['Playfair_Display'] leading-none tracking-tight">Accueil &gt; Réservation</div>
      </div>
      
      <div className="self-stretch py-3 flex flex-col justify-center items-start gap-5 overflow-hidden">
        <div className="justify-start text-[#8B5E3C] text-3xl font-bold font-['Playfair_Display'] leading-9">Réservez votre séjour</div>
        <div className="justify-start text-neutral-700 text-xs font-normal font-['Playfair_Display'] leading-none tracking-tight">Choisissez vos dates et options</div>
      </div>

      <div className="inline-flex justify-start items-start gap-14">
        {/* Left Column */}
        <div className="w-[658px] inline-flex flex-col justify-start items-start gap-20">
          {/* Date Selection Form */}
          <div className="self-stretch px-8 py-10 bg-white rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex flex-col justify-start items-start gap-4 overflow-hidden">
            <div className="self-stretch h-20 inline-flex justify-center items-center overflow-hidden">
              <div className="flex-1 px-[5px] inline-flex flex-col justify-start items-start gap-4">
                <div className="self-stretch flex flex-col justify-center items-start">
                  <div className="w-28 justify-start text-black text-base font-normal font-['Playfair_Display'] leading-normal">Date d&apos;arrivée</div>
                  <div className="self-stretch px-3 py-2 bg-white rounded-md border border-[#D4AF37] inline-flex justify-start items-center gap-2">
                    <Calendar className="w-6 h-6 text-[#D4AF37]" />
                    <input
                      type="date"
                      value={formData.checkIn}
                      onChange={(e) => handleInputChange('checkIn', e.target.value)}
                      className="bg-transparent border-none outline-none flex-1 text-black font-['Playfair_Display']"
                    />
                  </div>
                </div>
              </div>
              <div className="px-[5px] inline-flex flex-col justify-center items-start">
                <div className="flex flex-col justify-start items-start">
                  <div className="w-28 justify-start text-black text-base font-normal font-['Playfair_Display'] leading-normal">Date de départ</div>
                  <div className="w-64 px-3 py-2 bg-white rounded-md border border-[#D4AF37] inline-flex justify-start items-center gap-2">
                    <Calendar className="w-6 h-6 text-[#D4AF37]" />
                    <input
                      type="date"
                      value={formData.checkOut}
                      onChange={(e) => handleInputChange('checkOut', e.target.value)}
                      className="bg-transparent border-none outline-none flex-1 text-black font-['Playfair_Display']"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Guest Selection */}
            <div className="self-stretch h-20 inline-flex justify-center items-center overflow-hidden">
              <div className="flex-1 px-[5px] inline-flex flex-col justify-start items-start gap-4">
                <div className="self-stretch flex flex-col justify-center items-start">
                  <div className="w-28 justify-start text-black text-base font-normal font-['Playfair_Display'] leading-normal">Adultes</div>
                  <Select value={formData.adults} onValueChange={(value) => handleInputChange('adults', value)}>
                    <SelectTrigger className="w-48 px-3 py-2 rounded-md border border-[#D4AF37] inline-flex justify-start items-center gap-2.5 cursor-pointer font-['Playfair_Display']">
                      <div className="flex items-center gap-2">
                        <Users className="w-6 h-6 text-[#D4AF37]" />
                        <SelectValue />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="6">6</SelectItem>
                      <SelectItem value="7">7</SelectItem>
                      <SelectItem value="8">8</SelectItem>
                      <SelectItem value="9">9</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="11">11</SelectItem>
                      <SelectItem value="12">12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex-1 px-[5px] inline-flex flex-col justify-start items-start gap-4">
                <div className="flex flex-col justify-start items-start">
                  <div className="w-28 justify-start text-black text-base font-normal font-['Playfair_Display'] leading-normal">Enfant</div>
                  <Select value={formData.children} onValueChange={(value) => handleInputChange('children', value)}>
                    <SelectTrigger className="w-40 px-3 py-2 rounded-md border border-[#D4AF37] inline-flex justify-start items-center gap-2.5 cursor-pointer font-['Playfair_Display']">
                      <div className="flex items-center gap-2">
                        <User className="w-6 h-6 text-[#D4AF37]" />
                        <SelectValue />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4+">4+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex-1 px-[5px] inline-flex flex-col justify-center items-start">
                <div className="self-stretch flex flex-col justify-start items-start">
                  <div className="w-28 justify-start text-black text-base font-normal font-['Playfair_Display'] leading-normal">Enfants</div>
                  <Select value={formData.infants} onValueChange={(value) => handleInputChange('infants', value)}>
                    <SelectTrigger className="w-40 px-3 py-2 rounded-md border border-[#D4AF37] inline-flex justify-start items-center gap-2.5 cursor-pointer font-['Playfair_Display']">
                      <div className="flex items-center gap-2">
                        <Baby className="w-6 h-6 text-[#D4AF37]" />
                        <SelectValue />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4+">4+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="self-stretch p-8 bg-white rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex flex-col justify-start items-start gap-4 overflow-hidden">
            <div className="self-stretch h-7 inline-flex justify-start items-center overflow-hidden">
              <div className="w-56 h-5 justify-start text-yellow-800 text-xl font-normal font-['Playfair_Display'] leading-7">Méthode de paiement</div>
            </div>
            
            {/* Card Payment */}
            <div className="self-stretch p-4 rounded-lg border border-amber-400 flex flex-col justify-start items-start gap-4 overflow-hidden">
              <div data-state="default" className="self-stretch inline-flex justify-start items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                  className="w-4 h-4 bg-white rounded-full border border-[#D4AF37]"
                />
                <CreditCard className="w-5 h-4 text-[#D4AF37]" />
                <div className="justify-start text-black text-base font-normal font-['Playfair_Display'] leading-normal">Carte Bancaire</div>
              </div>
            </div>
            
            {/* PayPal Payment */}
            <div className="self-stretch p-4 rounded-lg border border-amber-400 flex flex-col justify-start items-start gap-4 overflow-hidden">
              <div className="self-stretch inline-flex justify-start items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="paypal"
                  checked={formData.paymentMethod === 'paypal'}
                  onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                  className="w-4 h-4 bg-white rounded-full border border-[#D4AF37]"
                />
                <CreditCard className="w-5 h-4 text-[#D4AF37]" />
                <div className="justify-start text-black text-base font-normal font-['Playfair_Display'] leading-normal">Paypal</div>
              </div>
            </div>
            
            {/* Klarna Payment */}
            <div className="self-stretch p-4 rounded-lg border border-amber-400 flex flex-col justify-start items-start gap-4 overflow-hidden">
              <div className="self-stretch inline-flex justify-start items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="klarna"
                  checked={formData.paymentMethod === 'klarna'}
                  onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                  className="w-4 h-4 bg-white rounded-full border border-[#D4AF37]"
                />
                <CreditCard className="w-5 h-4 text-[#D4AF37]" />
                <div className="justify-start text-black text-base font-normal font-['Playfair_Display'] leading-normal">Paiement en 3X par Klarna</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Summary */}
        <div className="w-[497px] px-4 py-7 rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-amber-400 inline-flex flex-col justify-center items-center gap-6 overflow-hidden">
          <div className="self-stretch py-4 inline-flex justify-start items-center gap-2.5 overflow-hidden">
            <div className="justify-start text-yellow-800 text-3xl font-bold font-['Playfair_Display'] leading-9">Résumé de votre séjour</div>
          </div>
          
          <div className="self-stretch px-2.5 py-2 flex flex-col justify-center items-center gap-4 overflow-hidden">
            <div className="self-stretch h-32 flex flex-col justify-start items-center gap-5 overflow-hidden">
              <div className="self-stretch h-7 inline-flex justify-between items-center overflow-hidden">
                <div className="w-56 h-8 justify-start text-black text-base font-normal font-['Playfair_Display'] leading-normal">Location de la maison</div>
                <div className="w-12 h-8 justify-start text-black text-base font-normal font-['Playfair_Display'] leading-normal">6000€</div>
              </div>
              <div className="self-stretch h-7 inline-flex justify-between items-center overflow-hidden">
                <div className="w-32 h-8 justify-start text-black text-base font-normal font-['Playfair_Display'] leading-normal">Frais de ménage</div>
                <div className="w-10 h-8 justify-start text-black text-base font-normal font-['Playfair_Display'] leading-normal">200€ </div>
              </div>
              <div className="self-stretch h-7 inline-flex justify-between items-center overflow-hidden">
                <div className="w-32 h-8 justify-start text-black text-base font-normal font-['Playfair_Display'] leading-normal">Frais de service</div>
                <div className="w-10 h-8 justify-start text-black text-base font-normal font-['Playfair_Display'] leading-normal">200€</div>
              </div>
              <div className="self-stretch h-7 inline-flex justify-between items-center overflow-hidden">
                <div className="w-20 h-8 justify-start text-black text-base font-normal font-['Playfair_Display'] leading-normal">Taxes</div>
                <div className="w-10 h-8 justify-start text-black text-base font-normal font-['Playfair_Display'] leading-normal">200€</div>
              </div>
            </div>
            
            <div className="w-96 h-0 border-t border-neutral-700/30" />
            
            <div className="self-stretch h-8 inline-flex justify-between items-center overflow-hidden">
              <div className="w-11 h-8 justify-start text-black text-xl font-bold font-['Playfair_Display'] leading-7">Total</div>
              <div className="w-16 h-8 justify-start text-black text-xl font-bold font-['Playfair_Display'] leading-7">6600€</div>
            </div>
          </div>
          
          <div className="self-stretch p-6 flex flex-col justify-center items-center gap-6 overflow-hidden">
            <div className="self-stretch inline-flex justify-start items-center gap-2.5 overflow-hidden">
              <Checkbox
                checked={formData.acceptTerms}
                onCheckedChange={(checked) => handleInputChange('acceptTerms', checked)}
                className="w-4 h-4 border-[#D4AF37]"
              />
              <div className="flex-1 justify-start text-black text-base font-normal font-['Playfair_Display'] leading-normal">J&apos;accepte les conditions générales de vente</div>
            </div>
            
            <Button
              onClick={handleSubmit}
              disabled={!formData.acceptTerms}
              className="self-stretch px-6 py-4 bg-[#D4AF37] rounded-lg inline-flex justify-center items-center gap-2.5 overflow-hidden disabled:opacity-50 hover:bg-[#B8941F] font-['Playfair_Display']"
            >
              <div className="justify-start text-white text-base font-normal leading-normal">Réserver maintenant</div>
            </Button>
            
            <div className="px-4 inline-flex justify-center items-center gap-2.5 overflow-hidden">
              <Shield className="w-6 h-6 text-black" />
              <div className="justify-start text-black text-base font-normal font-['Playfair_Display'] leading-normal">Paiement sécurisé</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

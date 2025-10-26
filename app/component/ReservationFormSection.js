"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import { Calendar, Users, Baby, User, CreditCard, Shield, AlertCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useRouter } from "next/navigation";

// French public holidays for 2025-2026
const FRENCH_HOLIDAYS = [
  '2025-01-01', '2025-04-21', '2025-05-01', '2025-05-08', '2025-05-29',
  '2025-06-09', '2025-07-14', '2025-08-15', '2025-11-01', '2025-11-11',
  '2025-12-25', '2026-01-01', '2026-04-06', '2026-05-01', '2026-05-08',
  '2026-05-14', '2026-05-25', '2026-07-14', '2026-08-15', '2026-11-01',
  '2026-11-11', '2026-12-25'
];

const WEEKDAY_PRICE = 700; // 周中价格
const WEEKEND_PRICE = 850; // 周末和假期价格
const CLEANING_FEE = 200;
const SERVICE_FEE = 150;
const TAX_RATE = 0.055; // 5.5% 法国旅游税

export function ReservationFormSection() {
  const { language, t } = useLanguage();
  const router = useRouter();
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    adults: '1',
    children: '0',
    infants: '0',
    paymentMethod: 'card',
    acceptTerms: false
  });
  
  const [pricing, setPricing] = useState({
    nights: 0,
    weekdayNights: 0,
    weekendNights: 0,
    basePrice: 0,
    cleaningFee: 0,
    serviceFee: 0,
    taxes: 0,
    total: 0
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate if a date is weekend or holiday
  const isWeekendOrHoliday = (date) => {
    const dayOfWeek = date.getDay();
    const dateString = date.toISOString().split('T')[0];
    
    // Friday (5), Saturday (6), Sunday (0) or holiday
    return dayOfWeek === 0 || dayOfWeek === 5 || dayOfWeek === 6 || FRENCH_HOLIDAYS.includes(dateString);
  };

  // Calculate pricing based on dates
  useEffect(() => {
    if (formData.checkIn && formData.checkOut) {
      const checkIn = new Date(formData.checkIn);
      const checkOut = new Date(formData.checkOut);
      
      if (checkOut <= checkIn) {
        setErrors(prev => ({ ...prev, dates: t.reservationPage.errors?.invalidDates || 'Invalid dates' }));
        return;
      }
      
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.dates;
        return newErrors;
      });

      let weekdayCount = 0;
      let weekendCount = 0;
      let currentDate = new Date(checkIn);

      while (currentDate < checkOut) {
        if (isWeekendOrHoliday(currentDate)) {
          weekendCount++;
        } else {
          weekdayCount++;
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }

      const basePrice = (weekdayCount * WEEKDAY_PRICE) + (weekendCount * WEEKEND_PRICE);
      const totalNights = weekdayCount + weekendCount;
      const cleaningFee = CLEANING_FEE;
      const serviceFee = SERVICE_FEE;
      const subtotal = basePrice + cleaningFee + serviceFee;
      const taxes = Math.round(subtotal * TAX_RATE);
      const total = subtotal + taxes;

      setPricing({
        nights: totalNights,
        weekdayNights: weekdayCount,
        weekendNights: weekendCount,
        basePrice,
        cleaningFee,
        serviceFee,
        taxes,
        total
      });
    }
  }, [formData.checkIn, formData.checkOut]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.checkIn) {
      newErrors.checkIn = t.reservationPage.errors?.checkInRequired || 'Check-in date is required';
    }
    
    if (!formData.checkOut) {
      newErrors.checkOut = t.reservationPage.errors?.checkOutRequired || 'Check-out date is required';
    }
    
    if (!formData.acceptTerms) {
      newErrors.terms = t.reservationPage.errors?.acceptTerms || 'You must accept the terms';
    }
    
    if (pricing.nights < 1) {
      newErrors.dates = t.reservationPage.errors?.minStay || 'Minimum 1 night stay required';
    }

    const totalGuests = parseInt(formData.adults) + parseInt(formData.children);
    if (totalGuests > 12) {
      newErrors.guests = t.reservationPage.errors?.maxGuests || 'Maximum 12 guests allowed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const reservationData = {
        ...formData,
        pricing,
        createdAt: new Date().toISOString(),
        status: 'pending'
      };

      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      if (response.ok) {
        const result = await response.json();
        // Redirect to confirmation page
        router.push(`/reservation/confirmation?id=${result.id}`);
      } else {
        const error = await response.json();
        setErrors({ submit: error.message || 'Reservation failed' });
      }
    } catch (error) {
      console.error('Reservation error:', error);
      setErrors({ submit: t.reservationPage.errors?.serverError || 'Server error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="self-stretch px-24 py-8 inline-flex flex-col justify-start items-start gap-16">
      <div className="self-stretch inline-flex justify-start items-center gap-2.5 overflow-hidden">
        <div className="justify-start text-neutral-700 text-xs font-normal font-['Playfair_Display'] leading-none tracking-tight">
          {t.reservationPage.breadcrumbHome} &gt; {t.reservationPage.breadcrumbReservation}
        </div>
      </div>
      
      {/* Error Messages */}
      {Object.keys(errors).length > 0 && (
        <div className="self-stretch p-4 bg-red-50 border border-red-200 rounded-lg flex flex-col gap-2">
          {Object.values(errors).map((error, index) => (
            <div key={index} className="flex items-center gap-2 text-red-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm font-['Playfair_Display']">{error}</span>
            </div>
          ))}
        </div>
      )}
      
      <div className="self-stretch py-3 flex flex-col justify-center items-start gap-5 overflow-hidden">
        <div className="justify-start text-[#8B5E3C] text-3xl font-bold font-['Playfair_Display'] leading-9">
          {t.reservationPage.title}
        </div>
        <div className="justify-start text-neutral-700 text-xs font-normal font-['Playfair_Display'] leading-none tracking-tight">
          {t.reservationPage.subtitle}
        </div>
      </div>

      <div className="inline-flex justify-start items-start gap-14">
        {/* Left Column */}
        <div className="w-[658px] inline-flex flex-col justify-start items-start gap-20">
          {/* Date Selection Form */}
          <div className="self-stretch px-8 py-10 bg-white rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex flex-col justify-start items-start gap-4 overflow-hidden">
            <div className="self-stretch h-20 inline-flex justify-center items-center overflow-hidden">
              <div className="flex-1 px-[5px] inline-flex flex-col justify-start items-start gap-4">
                <div className="self-stretch flex flex-col justify-center items-start">
                  <div className="w-28 justify-start text-black text-base font-normal font-['Playfair_Display'] leading-normal">
                    {t.reservationPage.checkInDate}
                  </div>
                  <div className="self-stretch px-3 py-2 bg-white rounded-md border border-[#D4AF37] inline-flex justify-start items-center gap-2">
                    <Calendar className="w-6 h-6 text-[#D4AF37]" strokeWidth={1.5} />
                    <input
                      type="date"
                      value={formData.checkIn}
                      onChange={(e) => handleInputChange('checkIn', e.target.value)}
                      min={getTodayDate()}
                      className="bg-transparent border-none outline-none flex-1 text-black font-['Playfair_Display']"
                    />
                  </div>
                </div>
              </div>
              <div className="px-[5px] inline-flex flex-col justify-center items-start">
                <div className="flex flex-col justify-start items-start">
                  <div className="w-28 justify-start text-black text-base font-normal font-['Playfair_Display'] leading-normal">
                    {t.reservationPage.checkOutDate}
                  </div>
                  <div className="w-64 px-3 py-2 bg-white rounded-md border border-[#D4AF37] inline-flex justify-start items-center gap-2">
                    <Calendar className="w-6 h-6 text-[#D4AF37]" strokeWidth={1.5} />
                    <input
                      type="date"
                      value={formData.checkOut}
                      onChange={(e) => handleInputChange('checkOut', e.target.value)}
                      min={formData.checkIn || getTomorrowDate()}
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
                  <div className="w-28 justify-start text-black text-base font-normal font-['Playfair_Display'] leading-normal">
                    {t.reservationPage.adults}
                  </div>
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
                  <div className="w-28 justify-start text-black text-base font-normal font-['Playfair_Display'] leading-normal">
                    {t.reservationPage.children}
                  </div>
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
                  <div className="w-28 justify-start text-black text-base font-normal font-['Playfair_Display'] leading-normal">
                    {t.reservationPage.infants}
                  </div>
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
              <div className="w-56 h-5 justify-start text-yellow-800 text-xl font-normal font-['Playfair_Display'] leading-7">
                {t.reservationPage.paymentMethod}
              </div>
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
                <div className="justify-start text-black text-base font-normal font-['Playfair_Display'] leading-normal">
                  {t.reservationPage.bankCard}
                </div>
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
                <div className="justify-start text-black text-base font-normal font-['Playfair_Display'] leading-normal">
                  {t.reservationPage.paypal}
                </div>
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
                <div className="justify-start text-black text-base font-normal font-['Playfair_Display'] leading-normal">
                  {t.reservationPage.klarna}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Summary */}
        <div className="w-[497px] px-4 py-7 rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-amber-400 inline-flex flex-col justify-center items-center gap-6 overflow-hidden">
          <div className="self-stretch py-4 inline-flex justify-start items-center gap-2.5 overflow-hidden">
            <div className="justify-start text-yellow-800 text-3xl font-bold font-['Playfair_Display'] leading-9">
              {t.reservationPage.summaryTitle}
            </div>
          </div>
          
          {pricing.nights > 0 && (
            <div className="self-stretch px-2 py-1 bg-[#D4AF37]/10 rounded-lg">
              <p className="text-sm font-['Playfair_Display'] text-[#8B5E3C]">
                {pricing.nights} {pricing.nights === 1 ? (t.reservationPage.night || 'night') : (t.reservationPage.nights || 'nights')}
                {pricing.weekdayNights > 0 && ` (${pricing.weekdayNights} ${t.reservationPage.weekday || 'weekday'} × ${WEEKDAY_PRICE}€)`}
                {pricing.weekendNights > 0 && ` (${pricing.weekendNights} ${t.reservationPage.weekend || 'weekend'} × ${WEEKEND_PRICE}€)`}
              </p>
            </div>
          )}
          
          <div className="self-stretch px-2.5 py-2 flex flex-col justify-center items-center gap-4 overflow-hidden">
            <div className="self-stretch flex flex-col justify-start items-center gap-5 overflow-hidden">
              <div className="self-stretch h-7 inline-flex justify-between items-center overflow-hidden">
                <div className="w-56 h-8 justify-start text-black text-base font-normal font-['Playfair_Display'] leading-normal">
                  {t.reservationPage.houseRental}
                </div>
                <div className="h-8 justify-start text-black text-base font-normal font-['Playfair_Display'] leading-normal">
                  {pricing.basePrice > 0 ? `${pricing.basePrice}€` : '-'}
                </div>
              </div>
              <div className="self-stretch h-7 inline-flex justify-between items-center overflow-hidden">
                <div className="w-32 h-8 justify-start text-black text-base font-normal font-['Playfair_Display'] leading-normal">
                  {t.reservationPage.cleaningFees}
                </div>
                <div className="h-8 justify-start text-black text-base font-normal font-['Playfair_Display'] leading-normal">
                  {pricing.nights > 0 ? `${pricing.cleaningFee}€` : '-'}
                </div>
              </div>
              <div className="self-stretch h-7 inline-flex justify-between items-center overflow-hidden">
                <div className="w-32 h-8 justify-start text-black text-base font-normal font-['Playfair_Display'] leading-normal">
                  {t.reservationPage.serviceFees}
                </div>
                <div className="h-8 justify-start text-black text-base font-normal font-['Playfair_Display'] leading-normal">
                  {pricing.nights > 0 ? `${pricing.serviceFee}€` : '-'}
                </div>
              </div>
              <div className="self-stretch h-7 inline-flex justify-between items-center overflow-hidden">
                <div className="w-20 h-8 justify-start text-black text-base font-normal font-['Playfair_Display'] leading-normal">
                  {t.reservationPage.taxes}
                </div>
                <div className="h-8 justify-start text-black text-base font-normal font-['Playfair_Display'] leading-normal">
                  {pricing.nights > 0 ? `${pricing.taxes}€` : '-'}
                </div>
              </div>
            </div>
            
            <div className="w-96 h-0 border-t border-neutral-700/30" />
            
            <div className="self-stretch h-8 inline-flex justify-between items-center overflow-hidden">
              <div className="w-11 h-8 justify-start text-black text-xl font-bold font-['Playfair_Display'] leading-7">
                {t.reservationPage.total}
              </div>
              <div className="h-8 justify-start text-black text-xl font-bold font-['Playfair_Display'] leading-7">
                {pricing.total > 0 ? `${pricing.total}€` : '-'}
              </div>
            </div>
          </div>
          
          <div className="self-stretch p-6 flex flex-col justify-center items-center gap-6 overflow-hidden">
            <div className="self-stretch inline-flex justify-start items-center gap-2.5 overflow-hidden">
              <Checkbox
                checked={formData.acceptTerms}
                onCheckedChange={(checked) => handleInputChange('acceptTerms', checked)}
                className="w-4 h-4 border-[#D4AF37]"
              />
              <div className="flex-1 justify-start text-black text-base font-normal font-['Playfair_Display'] leading-normal">
                {t.reservationPage.acceptTerms}
              </div>
            </div>
            
            <Button
              onClick={handleSubmit}
              disabled={!formData.acceptTerms || isSubmitting || pricing.nights < 1}
              className="self-stretch px-6 py-4 bg-[#D4AF37] rounded-lg inline-flex justify-center items-center gap-2.5 overflow-hidden disabled:opacity-50 hover:bg-[#B8941F] font-['Playfair_Display']"
            >
              <div className="justify-start text-white text-base font-normal leading-normal">
                {isSubmitting ? (t.reservationPage.processing || 'Processing...') : t.reservationPage.bookNow}
              </div>
            </Button>
            
            <div className="px-4 inline-flex justify-center items-center gap-2.5 overflow-hidden">
              <Shield className="w-6 h-6 text-black" />
              <div className="justify-start text-black text-base font-normal font-['Playfair_Display'] leading-normal">
                {t.reservationPage.securePayment}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

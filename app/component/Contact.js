"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";

export default function Contact({ showTitle = true }) {
  const [chatMessage, setChatMessage] = useState('');
  const [countryCode, setCountryCode] = useState('+33');
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    telephone: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const { language } = useLanguage();
  const t = translations[language];

  // Country-specific phone number configurations
  const phoneConfigs = {
    '+33': { // France
      placeholder: '6 12 34 56 78',
      pattern: /^[0-9\s]{10,14}$/,
      stripPattern: /[^\d]/g,
      minDigits: 9,
      maxDigits: 10,
      errorMessage: 'Le numéro français doit contenir 9-10 chiffres (ex: 6 12 34 56 78)',
      format: (value) => {
        const digits = value.replace(/\D/g, '');
        if (digits.length <= 1) return digits;
        if (digits.length <= 3) return digits.slice(0, 1) + ' ' + digits.slice(1);
        if (digits.length <= 5) return digits.slice(0, 1) + ' ' + digits.slice(1, 3) + ' ' + digits.slice(3);
        if (digits.length <= 7) return digits.slice(0, 1) + ' ' + digits.slice(1, 3) + ' ' + digits.slice(3, 5) + ' ' + digits.slice(5);
        if (digits.length <= 9) return digits.slice(0, 1) + ' ' + digits.slice(1, 3) + ' ' + digits.slice(3, 5) + ' ' + digits.slice(5, 7) + ' ' + digits.slice(7);
        return digits.slice(0, 1) + ' ' + digits.slice(1, 3) + ' ' + digits.slice(3, 5) + ' ' + digits.slice(5, 7) + ' ' + digits.slice(7, 9) + (digits.length > 9 ? ' ' + digits.slice(9, 10) : '');
      }
    },
    '+31': { // Pays-Bas
      placeholder: '6 12345678',
      pattern: /^[0-9\s]{9,11}$/,
      stripPattern: /[^\d]/g,
      minDigits: 9,
      maxDigits: 9,
      errorMessage: 'Le numéro néerlandais doit contenir 9 chiffres',
      format: (value) => {
        const digits = value.replace(/\D/g, '');
        if (digits.length <= 1) return digits;
        return digits.slice(0, 1) + ' ' + digits.slice(1, 9);
      }
    },
    '+7': { // Russie
      placeholder: '912 345 67 89',
      pattern: /^[0-9\s]{10,13}$/,
      stripPattern: /[^\d]/g,
      minDigits: 10,
      maxDigits: 10,
      errorMessage: 'Le numéro russe doit contenir 10 chiffres',
      format: (value) => {
        const digits = value.replace(/\D/g, '');
        if (digits.length <= 3) return digits;
        if (digits.length <= 6) return digits.slice(0, 3) + ' ' + digits.slice(3);
        if (digits.length <= 8) return digits.slice(0, 3) + ' ' + digits.slice(3, 6) + ' ' + digits.slice(6);
        return digits.slice(0, 3) + ' ' + digits.slice(3, 6) + ' ' + digits.slice(6, 8) + ' ' + digits.slice(8, 10);
      }
    },
    '+1': { // USA
      placeholder: '555 123 4567',
      pattern: /^[0-9\s]{10,13}$/,
      stripPattern: /[^\d]/g,
      minDigits: 10,
      maxDigits: 10,
      errorMessage: 'Le numéro américain doit contenir 10 chiffres',
      format: (value) => {
        const digits = value.replace(/\D/g, '');
        if (digits.length <= 3) return digits;
        if (digits.length <= 6) return digits.slice(0, 3) + ' ' + digits.slice(3);
        return digits.slice(0, 3) + ' ' + digits.slice(3, 6) + ' ' + digits.slice(6, 10);
      }
    },
    '+44': { // UK
      placeholder: '7700 123456',
      pattern: /^[0-9\s]{10,12}$/,
      stripPattern: /[^\d]/g,
      minDigits: 10,
      maxDigits: 10,
      errorMessage: 'Le numéro britannique doit contenir 10 chiffres',
      format: (value) => {
        const digits = value.replace(/\D/g, '');
        if (digits.length <= 4) return digits;
        return digits.slice(0, 4) + ' ' + digits.slice(4, 10);
      }
    },
    '+49': { // Allemagne
      placeholder: '151 12345678',
      pattern: /^[0-9\s]{10,13}$/,
      stripPattern: /[^\d]/g,
      minDigits: 10,
      maxDigits: 11,
      errorMessage: 'Le numéro allemand doit contenir 10-11 chiffres',
      format: (value) => {
        const digits = value.replace(/\D/g, '');
        if (digits.length <= 3) return digits;
        return digits.slice(0, 3) + ' ' + digits.slice(3, 11);
      }
    },
    '+39': { // Italie
      placeholder: '312 345 6789',
      pattern: /^[0-9\s]{9,12}$/,
      stripPattern: /[^\d]/g,
      minDigits: 9,
      maxDigits: 10,
      errorMessage: 'Le numéro italien doit contenir 9-10 chiffres',
      format: (value) => {
        const digits = value.replace(/\D/g, '');
        if (digits.length <= 3) return digits;
        if (digits.length <= 6) return digits.slice(0, 3) + ' ' + digits.slice(3);
        return digits.slice(0, 3) + ' ' + digits.slice(3, 6) + ' ' + digits.slice(6, 10);
      }
    },
    '+34': { // Espagne
      placeholder: '612 34 56 78',
      pattern: /^[0-9\s]{9,11}$/,
      stripPattern: /[^\d]/g,
      minDigits: 9,
      maxDigits: 9,
      errorMessage: 'Le numéro espagnol doit contenir 9 chiffres',
      format: (value) => {
        const digits = value.replace(/\D/g, '');
        if (digits.length <= 3) return digits;
        if (digits.length <= 5) return digits.slice(0, 3) + ' ' + digits.slice(3);
        if (digits.length <= 7) return digits.slice(0, 3) + ' ' + digits.slice(3, 5) + ' ' + digits.slice(5);
        return digits.slice(0, 3) + ' ' + digits.slice(3, 5) + ' ' + digits.slice(5, 7) + ' ' + digits.slice(7, 9);
      }
    }
  };

  const validateName = (value) => {
    // Only allow letters, spaces, hyphens, and accented characters
    const nameRegex = /^[a-zA-ZÀ-ÿ\s-]*$/;
    return nameRegex.test(value);
  };

  const validatePhone = (value) => {
    // Only allow numbers and spaces
    const phoneRegex = /^[0-9\s]*$/;
    if (!phoneRegex.test(value)) return false;
    
    // Check country-specific validation
    const config = phoneConfigs[countryCode];
    if (config) {
      const digitsOnly = value.replace(config.stripPattern, '');
      return digitsOnly.length >= config.minDigits && digitsOnly.length <= config.maxDigits;
    }
    return true;
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (chatMessage.trim() && chatMessage.length <= 5000) {
      try {
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: chatMessage,
            type: 'chat'
          }),
        });
        
        const data = await response.json();
        
        if (data.success) {
          setChatMessage('');
          alert(t.contact.success.chat);
        } else {
          alert('Une erreur s\'est produite. Veuillez réessayer.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Une erreur s\'est produite. Veuillez réessayer.');
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    
    if (!validateName(formData.prenom)) {
      newErrors.prenom = t.contact.errors.firstNameInvalid;
    }
    
    if (!validateName(formData.nom)) {
      newErrors.nom = t.contact.errors.lastNameInvalid;
    }
    
    if (!formData.telephone.trim()) {
      newErrors.telephone = t.contact.errors.phoneRequired;
    } else if (!validatePhone(formData.telephone)) {
      const config = phoneConfigs[countryCode];
      newErrors.telephone = config ? config.errorMessage : 'Format de téléphone invalide';
    }
    
    if (!validateEmail(formData.email)) {
      newErrors.email = t.contact.errors.emailInvalid;
    }
    
    if (formData.message.length > 8000) {
      newErrors.message = t.contact.errors.messageTooLong;
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Send email
    try {
      const fullPhone = `${countryCode} ${formData.telephone}`;
      
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prenom: formData.prenom,
          nom: formData.nom,
          telephone: fullPhone,
          email: formData.email,
          message: formData.message,
          type: 'contact'
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Clear form on success
        setFormData({
          prenom: '',
          nom: '',
          telephone: '',
          email: '',
          message: ''
        });
        setErrors({});
        alert(t.contact.success.form);
      } else {
        alert('Une erreur s\'est produite. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Une erreur s\'est produite. Veuillez réessayer.');
    }
  };

  const isFormValid = () => {
    return (
      formData.prenom.trim() !== '' &&
      formData.nom.trim() !== '' &&
      formData.telephone.trim() !== '' &&
      formData.email.trim() !== '' &&
      validateName(formData.prenom) &&
      validateName(formData.nom) &&
      validatePhone(formData.telephone) &&
      validateEmail(formData.email)
    );
  };

  const handleInputChange = (field, value) => {
    // Validate on change
    let isValid = true;
    let formattedValue = value;
    
    if (field === 'prenom' || field === 'nom') {
      isValid = validateName(value);
      if (isValid) {
        setErrors(prev => ({ ...prev, [field]: undefined }));
      }
    } else if (field === 'telephone') {
      // Only allow numbers and spaces
      const phoneRegex = /^[0-9\s]*$/;
      isValid = phoneRegex.test(value);
      if (isValid) {
        // Auto-format phone number based on country
        const config = phoneConfigs[countryCode];
        if (config && config.format) {
          formattedValue = config.format(value);
        }
        setErrors(prev => ({ ...prev, [field]: undefined }));
      }
    } else if (field === 'email') {
      if (validateEmail(value) || value === '') {
        setErrors(prev => ({ ...prev, [field]: undefined }));
      }
    }
    
    if (isValid || field === 'email' || field === 'message') {
      setFormData(prev => ({
        ...prev,
        [field]: formattedValue
      }));
    }
  };

  const handleChatChange = (value) => {
    if (value.length <= 5000) {
      setChatMessage(value);
    }
  };

  return (
    <div className="w-full min-h-screen px-3.5 py-24 flex flex-col justify-start items-center bg-white">
      {/* Title - only show if showTitle is true */}
      {showTitle && (
        <div className="w-full py-1 flex justify-center items-center mb-8">
          <h1 className="text-[#D4AF37] text-5xl font-black font-['Playfair_Display_SC'] leading-[56px] text-center">
            {t.contact.title}
          </h1>
        </div>
      )}

      {/* Main Content */}
      <div className="w-full max-w-[1400px] flex flex-col justify-start items-center gap-16">
        
        {/* Chat Assistant Section */}
        <Card className="w-full lg:w-[665px] bg-[#F5F0E6] border border-[#D4AF37]/30 shadow-lg">
          <CardContent className="p-12">
            <div className="text-center mb-12">
              <h2 className="text-[#8B5E3C] text-2xl font-black font-['Playfair_Display_SC'] leading-7">
                {t.contact.chatTitle}
              </h2>
            </div>
            
            <form onSubmit={handleChatSubmit} className="space-y-6">
              <div className="bg-[#F5F0E6] rounded-t-2xl p-6">
                <textarea
                  value={chatMessage}
                  onChange={(e) => handleChatChange(e.target.value)}
                  placeholder={t.contact.placeholder.message}
                  className="w-full h-24 px-4 py-3 bg-[#F5F0E6] border border-[#D4AF37]/40 rounded-md resize-none placeholder:text-gray-400 text-sm font-['Playfair_Display'] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                />
              </div>
              <Button 
                type="submit"
                className="w-full bg-[#8B5E3C]/50 hover:bg-[#8B5E3C]/70 text-[#F5F0E6] font-['Playfair_Display'] py-3"
              >
                {t.contact.send}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Form Section */}
        <Card className="w-full lg:w-[665px] bg-[#F5F0E6] border border-[#D4AF37]/30 shadow-lg">
          <CardContent className="p-12">
            <div className="text-center mb-12">
              <h2 className="text-[#8B5E3C] text-2xl font-black font-['Playfair_Display_SC'] leading-7">
                {t.contact.formTitle}
              </h2>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Prénom */}
                <div className="space-y-3">
                  <label className="text-[#3E3E3E] text-sm font-normal font-['Lato']">
                    {t.contact.firstName}*
                  </label>
                  <input
                    type="text"
                    value={formData.prenom}
                    onChange={(e) => handleInputChange('prenom', e.target.value)}
                    placeholder={t.contact.placeholder.firstName}
                    className={`w-full px-4 py-3 bg-[#F5F0E6] border ${errors.prenom ? 'border-red-500' : 'border-[#D4AF37]'} rounded-md text-sm font-['Lato'] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50`}
                    required
                  />
                  {errors.prenom && <p className="text-red-500 text-xs">{errors.prenom}</p>}
                </div>

                {/* Nom */}
                <div className="space-y-3">
                  <label className="text-[#3E3E3E] text-sm font-normal font-['Lato']">
                    {t.contact.lastName}*
                  </label>
                  <input
                    type="text"
                    value={formData.nom}
                    onChange={(e) => handleInputChange('nom', e.target.value)}
                    placeholder={t.contact.placeholder.lastName}
                    className={`w-full px-4 py-3 bg-[#F5F0E6] border ${errors.nom ? 'border-red-500' : 'border-[#D4AF37]'} rounded-md text-sm font-['Lato'] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50`}
                    required
                  />
                  {errors.nom && <p className="text-red-500 text-xs">{errors.nom}</p>}
                </div>

                {/* Téléphone with Country Code */}
                <div className="space-y-3 md:col-span-2">
                  <label className="text-[#3E3E3E] text-sm font-normal font-['Lato']">
                    {t.contact.phone}*
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={countryCode}
                      onChange={(e) => {
                        setCountryCode(e.target.value);
                        setFormData(prev => ({ ...prev, telephone: '' }));
                        setErrors(prev => ({ ...prev, telephone: undefined }));
                      }}
                      className="px-3 py-3 bg-[#F5F0E6] border border-[#D4AF37] rounded-md text-sm font-['Lato'] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                    >
                      <option value="+33">🇫🇷 +33</option>
                      <option value="+31">🇳🇱 +31</option>
                      <option value="+7">🇷🇺 +7</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+49">🇩🇪 +49</option>
                      <option value="+39">🇮🇹 +39</option>
                      <option value="+34">🇪🇸 +34</option>
                    </select>
                    <input
                      type="tel"
                      value={formData.telephone}
                      onChange={(e) => handleInputChange('telephone', e.target.value)}
                      placeholder={phoneConfigs[countryCode]?.placeholder || ''}
                      className={`flex-1 px-4 py-3 bg-[#F5F0E6] border ${errors.telephone ? 'border-red-500' : 'border-[#D4AF37]'} rounded-md text-sm font-['Lato'] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50`}
                      required
                    />
                  </div>
                  {errors.telephone && <p className="text-red-500 text-xs">{errors.telephone}</p>}
                </div>
              </div>

              {/* Email - separate row */}
              <div className="space-y-3">
                <label className="text-[#3E3E3E] text-sm font-normal font-['Lato']">
                  {t.contact.email}*
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  onBlur={(e) => {
                    if (e.target.value && !validateEmail(e.target.value)) {
                      setErrors(prev => ({ ...prev, email: t.contact.errors.emailInvalid }));
                    }
                  }}
                  placeholder={t.contact.placeholder.email}
                  className={`w-full px-4 py-3 bg-[#F5F0E6] border ${errors.email ? 'border-red-500' : 'border-[#D4AF37]'} rounded-md text-sm font-['Lato'] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50`}
                  required
                />
                {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
              </div>

              {/* Message */}
              <div className="space-y-3">
                <label className="text-[#3E3E3E] text-sm font-normal font-['Playfair_Display']">
                  {t.contact.message}
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => {
                    if (e.target.value.length <= 8000) {
                      handleInputChange('message', e.target.value);
                    }
                  }}
                  placeholder={t.contact.placeholder.message}
                  className={`w-full h-24 px-4 py-3 bg-[#F5F0E6] border ${errors.message ? 'border-red-500' : 'border-[#D4AF37]/40'} rounded-md resize-none placeholder:text-gray-400 text-sm font-['Playfair_Display'] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50`}
                />
                {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}
              </div>

              <Button 
                type="submit"
                disabled={!isFormValid()}
                className={`w-full ${isFormValid() ? 'bg-[#8B5E3C] hover:bg-[#8B5E3C]/80' : 'bg-[#8B5E3C]/30 cursor-not-allowed hover:bg-[#8B5E3C]/40'} text-[#F5F0E6] font-['Playfair_Display'] py-3 mt-8 transition-all`}
              >
                {t.contact.send}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, MapPin, Save, X, AlertCircle } from 'lucide-react';
import { Header } from '../component/Header';
import { Footer } from '../component/Footer';
import { useLanguage } from '../context/LanguageContext';

export default function ProfileSettingsPage() {
  const { language, t } = useLanguage();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: 'Jean Dupont',
    email: 'jean.dupont@gmail.com',
    phone: '+33 1 23 45 67 89',
    address: '123 rue de la Paix, 75001 Paris',
    city: 'Paris',
    postalCode: '75001',
    country: 'France'
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t.profileSettings.errors.nameRequired;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t.profileSettings.errors.phoneRequired;
    } else if (!/^[\d\s\+\-\(\)]+$/.test(formData.phone)) {
      newErrors.phone = t.profileSettings.errors.phoneInvalid;
    }

    if (!formData.address.trim()) {
      newErrors.address = t.profileSettings.errors.addressRequired;
    }

    if (!formData.city.trim()) {
      newErrors.city = t.profileSettings.errors.cityRequired;
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = t.profileSettings.errors.postalCodeRequired;
    }

    if (!formData.country.trim()) {
      newErrors.country = t.profileSettings.errors.countryRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // 这里应该调用API保存数据
      console.log('Saving profile data:', formData);
      
      // 显示成功消息
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        router.push('/espace-client');
      }, 2000);
    }
  };

  const handleCancel = () => {
    router.push('/espace-client');
  };

  return (
    <div className="min-h-screen bg-[#F5F0E6]">
      <Header />
      
      {/* Page Title Section */}
      <div className="bg-white border-b pt-20">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-['Playfair_Display'] text-[#8B5E3C]">
                {t.profileSettings.title}
              </h1>
              <p className="text-stone-600 font-['Lato'] text-sm mt-1">
                {t.profileSettings.subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <Save className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-green-800 font-['Lato'] text-sm">
              {t.profileSettings.successMessage}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
          {/* Personal Information Section */}
          <div className="mb-8">
            <h2 className="text-xl font-['Playfair_Display'] text-[#8B5E3C] mb-6 flex items-center gap-2">
              <User className="w-5 h-5" />
              {t.profileSettings.personalInfo}
            </h2>
            
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-['Playfair_Display'] text-stone-700 mb-2">
                  {t.profileSettings.fullName} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-stone-300'} rounded-md font-['Lato'] text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent`}
                  placeholder={t.profileSettings.fullNamePlaceholder}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500 font-['Lato'] flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email (Read-only) */}
              <div>
                <label className="block text-sm font-['Playfair_Display'] text-stone-700 mb-2">
                  {t.profileSettings.email}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="w-full px-4 py-3 bg-gray-100 border border-stone-300 rounded-md font-['Lato'] text-sm text-gray-600 cursor-not-allowed"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <p className="mt-1 text-xs text-stone-500 font-['Lato']">
                  {t.profileSettings.emailNote}
                </p>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-['Playfair_Display'] text-stone-700 mb-2">
                  {t.profileSettings.phone} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className={`w-full px-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-stone-300'} rounded-md font-['Lato'] text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent`}
                  placeholder="+33 1 23 45 67 89"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500 font-['Lato'] flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="mb-8 pt-8 border-t border-stone-200">
            <h2 className="text-xl font-['Playfair_Display'] text-[#8B5E3C] mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              {t.profileSettings.addressInfo}
            </h2>
            
            <div className="space-y-6">
              {/* Address */}
              <div>
                <label className="block text-sm font-['Playfair_Display'] text-stone-700 mb-2">
                  {t.profileSettings.address} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className={`w-full px-4 py-3 border ${errors.address ? 'border-red-500' : 'border-stone-300'} rounded-md font-['Lato'] text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent`}
                  placeholder="123 rue de la Paix"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-500 font-['Lato'] flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.address}
                  </p>
                )}
              </div>

              {/* City and Postal Code */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-['Playfair_Display'] text-stone-700 mb-2">
                    {t.profileSettings.city} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    className={`w-full px-4 py-3 border ${errors.city ? 'border-red-500' : 'border-stone-300'} rounded-md font-['Lato'] text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent`}
                    placeholder="Paris"
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-500 font-['Lato'] flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.city}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-['Playfair_Display'] text-stone-700 mb-2">
                    {t.profileSettings.postalCode} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => handleChange('postalCode', e.target.value)}
                    className={`w-full px-4 py-3 border ${errors.postalCode ? 'border-red-500' : 'border-stone-300'} rounded-md font-['Lato'] text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent`}
                    placeholder="75001"
                  />
                  {errors.postalCode && (
                    <p className="mt-1 text-sm text-red-500 font-['Lato'] flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.postalCode}
                    </p>
                  )}
                </div>
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-['Playfair_Display'] text-stone-700 mb-2">
                  {t.profileSettings.country} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => handleChange('country', e.target.value)}
                  className={`w-full px-4 py-3 border ${errors.country ? 'border-red-500' : 'border-stone-300'} rounded-md font-['Lato'] text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent`}
                  placeholder="France"
                />
                {errors.country && (
                  <p className="mt-1 text-sm text-red-500 font-['Lato'] flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.country}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-stone-200">
            <button
              type="submit"
              className="flex-1 py-3 bg-[#8B5E3C] hover:bg-[#8B5E3C]/90 text-white rounded-md font-['Playfair_Display'] transition-colors cursor-pointer text-sm flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              {t.profileSettings.saveChanges}
            </button>
            
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 py-3 bg-white hover:bg-gray-50 text-stone-600 border border-stone-300 rounded-md font-['Playfair_Display'] transition-colors cursor-pointer text-sm flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4" />
              {t.profileSettings.cancel}
            </button>
          </div>
        </form>
      </div>
      
      <Footer />
    </div>
  );
}

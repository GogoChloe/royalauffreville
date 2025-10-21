"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

function GoogleLoginSuccessContent() {
  const { language, t } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // 从URL参数获取用户信息
    const name = searchParams.get('name') || searchParams.get('given_name') || t.googleLoginSuccess.dearClient;
    const email = searchParams.get('email');
    
    setUserName(name);
    setIsLoading(false);

    // 倒计时和自动跳转
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          router.push('/espace-client');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [searchParams, router, t]);

  const handleAccessAccount = () => {
    router.push('/espace-client'); // 立即跳转到账户首页
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F0E6] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#8B5E3C] mx-auto mb-6"></div>
          <h2 className="text-lg font-['Playfair_Display'] text-[#8B5E3C] mb-4">
            {t.googleLoginSuccess.connectingInProgress}
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F0E6] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center animate-fade-in">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        
        
        <h2 className="text-lg font-['Playfair_Display'] text-[#8B5E3C] mb-6 leading-relaxed">
          {t.googleLoginSuccess.hello} {userName}, {t.googleLoginSuccess.welcomeToRoyal}
        </h2>
        
        <p className="text-stone-600 font-['Lato'] text-sm mb-8 leading-relaxed">
          {t.googleLoginSuccess.connectionSuccess}
        </p>
        
        <button
          onClick={handleAccessAccount}
          className="w-full py-3 bg-[#8B5E3C] hover:bg-[#8B5E3C]/90 text-white rounded-md font-['Playfair_Display'] transition-colors cursor-pointer text-sm mb-4"
        >
          {t.googleLoginSuccess.accessMySpace}
        </button>
        
        <div className="text-xs text-stone-500 font-['Lato']">
          {t.googleLoginSuccess.automaticRedirect} {countdown} {countdown > 1 ? t.googleLoginSuccess.seconds : t.googleLoginSuccess.second}...
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-1 mt-4">
          <div 
            className="bg-[#8B5E3C] h-1 rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${((3 - countdown) / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-[#F5F0E6] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#8B5E3C] mx-auto mb-6"></div>
        <h2 className="text-lg font-['Playfair_Display'] text-[#8B5E3C] mb-4">
          Connexion en cours...
        </h2>
      </div>
    </div>
  );
}

export default function GoogleLoginSuccessPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <GoogleLoginSuccessContent />
    </Suspense>
  );
}

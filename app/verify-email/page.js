"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { Check, X, Mail, ArrowLeft } from 'lucide-react';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [verificationStatus, setVerificationStatus] = useState('loading'); // 'loading', 'success', 'failed'
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setVerificationStatus('failed');
        return;
      }

      try {
        // 这里应该调用后端API验证token
        // 现在模拟验证过程
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // 模拟验证结果：包含"test"或长度大于15认为是有效的
        if (token.includes('test') || token.length > 15) {
          setVerificationStatus('success');
        } else {
          setVerificationStatus('failed');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setVerificationStatus('failed');
      }
    };

    verifyEmail();
  }, [token]);

  const handleAccessAccount = () => {
    // 跳转到用户账户页面或首页
    router.push('/');
  };

  const handleResendEmail = () => {
    // 重新发送验证邮件
    // 这里应该调用API重新发送邮件
    alert('Un nouveau lien de vérification a été envoyé à votre adresse e-mail.');
  };

  // 加载状态
  if (verificationStatus === 'loading') {
    return (
      <div className="min-h-screen bg-[#F5F0E6] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#8B5E3C] mx-auto mb-6"></div>
          <h2 className="text-xl font-['Playfair_Display'] text-[#8B5E3C] mb-4">
            Vérification en cours...
          </h2>
          <p className="text-stone-600 font-['Lato'] text-sm">
            Nous vérifions votre adresse e-mail, veuillez patienter.
          </p>
        </div>
      </div>
    );
  }

  // 验证成功页面
  if (verificationStatus === 'success') {
    return (
      <div className="min-h-screen bg-[#F5F0E6] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          
          <h2 className="text-lg font-['Playfair_Display'] text-[#8B5E3C] mb-4 leading-relaxed">
            Votre adresse e-mail a été confirmée avec succès.
          </h2>
          
          <p className="text-stone-600 font-['Lato'] text-sm mb-8 leading-relaxed">
            Bienvenue dans votre espace Royal Auffreville.
          </p>
          
          <button
            onClick={handleAccessAccount}
            className="w-full py-3 bg-[#8B5E3C] hover:bg-[#8B5E3C]/90 text-white rounded-md font-['Playfair_Display'] transition-colors cursor-pointer text-sm"
          >
            Accéder à mon compte
          </button>
        </div>
      </div>
    );
  }

  // 验证失败页面
  return (
    <div className="min-h-screen bg-[#F5F0E6] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <X className="w-8 h-8 text-red-600" />
        </div>
        
        <h2 className="text-lg font-['Playfair_Display'] text-[#8B5E3C] mb-4">
          Lien de vérification expiré
        </h2>
        
        <p className="text-stone-600 font-['Lato'] text-sm mb-8 leading-relaxed">
          Il semble que ce lien ait expiré. Pas d'inquiétude, cliquez ci-dessous pour recevoir un nouveau lien.
        </p>
        
        <div className="space-y-3">
          <button
            onClick={handleResendEmail}
            className="w-full py-3 bg-[#8B5E3C] hover:bg-[#8B5E3C]/90 text-white rounded-md font-['Playfair_Display'] transition-colors cursor-pointer flex items-center justify-center gap-2 text-sm"
          >
            <Mail className="w-4 h-4" />
            Renvoyer le lien de vérification
          </button>
          
          <button
            onClick={() => router.push('/')}
            className="w-full py-3 bg-white hover:bg-gray-50 text-[#8B5E3C] border border-[#8B5E3C] rounded-md font-['Playfair_Display'] transition-colors cursor-pointer flex items-center justify-center gap-2 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-[#F5F0E6] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#8B5E3C] mx-auto mb-6"></div>
        <h2 className="text-xl font-['Playfair_Display'] text-[#8B5E3C] mb-4">
          Chargement...
        </h2>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <VerifyEmailContent />
    </Suspense>
  );
}

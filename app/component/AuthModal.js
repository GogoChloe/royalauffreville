"use client";

import { X, Eye, EyeOff } from "lucide-react";
import React, { useEffect, useState } from "react";

export function AuthModal({ isOpen, onClose }) {
  const [currentPage, setCurrentPage] = useState('initial'); // 'initial', 'login', 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // 重置状态当modal关闭时
  useEffect(() => {
    if (!isOpen) {
      setCurrentPage('initial');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setShowPassword(false);
      setShowConfirmPassword(false);
      setPasswordError('');
      setConfirmPasswordError('');
    }
  }, [isOpen]);

  // 邮箱验证
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    setIsEmailValid(validateEmail(email));
  }, [email]);

  // 密码验证
  const validatePassword = (password) => {
    if (password.length < 6) {
      return 'Le mot de passe doit contenir au moins 6 caractères';
    }
    return '';
  };

  // 验证密码
  useEffect(() => {
    if (password) {
      setPasswordError(validatePassword(password));
    } else {
      setPasswordError('');
    }
  }, [password]);

  // 验证确认密码
  useEffect(() => {
    if (confirmPassword && password && confirmPassword !== password) {
      setConfirmPasswordError('Les mots de passe ne correspondent pas');
    } else {
      setConfirmPasswordError('');
    }
  }, [password, confirmPassword]);

  // 阻止背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // 确保在服务端渲染时不显示任何内容
  if (typeof window === 'undefined') return null;
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    e.stopPropagation();
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  // 模拟检查用户是否已注册
  const checkUserExists = (email) => {
    // 这里应该调用API检查用户是否存在
    // 现在模拟：如果邮箱包含"existing"就认为已注册
    return email.includes('existing');
  };

  const handleEmailSubmit = () => {
    if (!isEmailValid) return;
    
    const userExists = checkUserExists(email);
    if (userExists) {
      setCurrentPage('login');
    } else {
      setCurrentPage('register');
    }
  };

  const handleBack = () => {
    setCurrentPage('initial');
  };

  const handleLogin = () => {
    // 处理登录逻辑
    console.log('Login with:', { email, password });
    onClose();
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError('Les mots de passe ne correspondent pas');
      return;
    }

    if (passwordError || confirmPasswordError) {
      return;
    }

    try {
      // 发送欢迎邮件
      await sendWelcomeEmail(email);
      
      // 处理注册逻辑
      console.log('Register with:', { email, password });
      
      // 显示成功消息
      alert(`Compte créé avec succès ! Veuillez vérifier votre e-mail pour activer votre compte.
      
Pour tester la vérification, vous pouvez utiliser ce lien :
${window.location.origin}/verify-email?token=verify_test_token_${Date.now()}`);
      
      onClose();
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Erreur lors de l\'envoi de l\'e-mail de confirmation. Veuillez réessayer.');
    }
  };

  const handleGoogleLogin = () => {
    // 模拟Google OAuth流程
    // 在实际应用中，这里应该是真实的Google OAuth URL
    
    // 模拟Google登录成功，获取用户信息
    const mockGoogleUser = {
      name: 'Jean Dupont',
      given_name: 'Jean',
      email: 'jean.dupont@gmail.com',
      picture: 'https://via.placeholder.com/150'
    };
    
    // 关闭模态框
    onClose();
    
    // 创建URL参数
    const params = new URLSearchParams({
      name: mockGoogleUser.name,
      given_name: mockGoogleUser.given_name,
      email: mockGoogleUser.email
    });
    
    // 跳转到Google登录成功页面
    window.location.href = `/google-login-success?${params.toString()}`;
    
    // 在实际应用中，这里应该是Google OAuth的真实流程：
    // const googleAuthUrl = `https://accounts.google.com/oauth/authorize?client_id=YOUR_GOOGLE_CLIENT_ID&redirect_uri=${encodeURIComponent(window.location.origin)}/google-login-success&response_type=code&scope=email profile`;
    // window.location.href = googleAuthUrl;
  };

  // 发送欢迎邮件函数
  const sendWelcomeEmail = async (email) => {
    // 这里模拟发送邮件的API调用
    // 在实际应用中，这应该调用后端API
    console.log('Sending welcome email to:', email);
    
    // 生成验证token（在实际应用中应该由后端生成）
    const verificationToken = 'verify_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
    const verificationUrl = `${window.location.origin}/verify-email?token=${verificationToken}`;
    
    const emailData = {
      to: email,
      subject: 'Bienvenue chez Royal Auffreville – Activez votre compte',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8B5E3C;">Bonjour et bienvenue chez Royal Auffreville,</h2>
          
          <p>Merci pour votre inscription !</p>
          
          <p>Il ne vous reste qu'une étape : cliquez ci-dessous pour confirmer votre adresse e-mail et activer votre compte.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background-color: #8B5E3C; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Vérifier mon e-mail
            </a>
          </div>
          
          <p>Si le bouton ne fonctionne pas, copiez et collez ce lien dans votre navigateur :</p>
          <p style="word-break: break-all; color: #666;">${verificationUrl}</p>
          
          <p>À très vite sur Royal Auffreville</p>
        </div>
      `,
      text: `Bonjour et bienvenue chez Royal Auffreville,

Merci pour votre inscription !

Il ne vous reste qu'une étape : cliquez ci-dessous pour confirmer votre adresse e-mail et activer votre compte.

Vérifiez votre e-mail: ${verificationUrl}

À très vite sur Royal Auffreville`
    };

    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 在实际应用中，这里应该是真实的API调用
    // const response = await fetch('/api/send-email', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(emailData)
    // });
    
    console.log('Verification URL generated:', verificationUrl);
    return true;
  };

  // 初始页面
  const renderInitialPage = () => (
    <>
      {/* Header Section */}
      <div className="self-stretch flex flex-col justify-start items-start gap-6 overflow-hidden">
        <div className="w-72 flex flex-col justify-start items-start gap-11">
          <div className="self-stretch text-center justify-start text-[#8B5E3C] text-base font-normal font-['Playfair_Display'] leading-normal">
            Connectez-vous ou créez votre compte
          </div>
        </div>
        <div className="self-stretch inline-flex justify-center items-center gap-2.5 overflow-hidden">
          <div className="flex-1 justify-start text-[#8B5E3C] text-xs font-normal font-['Playfair_Display'] leading-none tracking-tight">
            Parce que chaque moment compte, gardez précieusement votre réservation dans votre espace.
          </div>
        </div>
      </div>

      {/* Email Form */}
      <div className="self-stretch flex flex-col justify-center items-center gap-2">
        <div className="self-stretch flex flex-col justify-start items-start gap-2">
          <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
            <div className="justify-start text-stone-600 text-sm font-normal font-['Lato'] leading-tight">
              E-mail
            </div>
            <div className="self-stretch inline-flex justify-start items-start gap-2">
              <div className="flex-1 inline-flex flex-col justify-start items-start gap-1.5">
                <input
                  type="email"
                  placeholder="123@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="self-stretch pl-3 pr-14 py-2 bg-white rounded-md border border-slate-300 text-stone-600 text-sm font-normal font-['Lato'] leading-tight focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                />
              </div>
            </div>
          </div>
        </div>
        <button 
          onClick={handleEmailSubmit}
          disabled={!isEmailValid}
          className={`self-stretch py-2 rounded-md inline-flex justify-center items-center gap-2.5 transition-colors ${
            isEmailValid 
              ? 'bg-[#8B5E3C]/80 hover:bg-[#8B5E3C] cursor-pointer' 
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          <div className="justify-start text-white text-sm font-medium font-['Playfair_Display'] leading-normal">
            Continuer
          </div>
        </button>
      </div>

      {/* Divider */}
      <div className="self-stretch p-[5px] flex flex-col justify-center items-center gap-3.5 overflow-hidden">
        <div className="w-72 h-5 inline-flex justify-center items-center">
          <div className="w-16 h-0 border-t border-stone-600" />
          <div className="w-11 text-center justify-start text-stone-600 text-sm font-normal font-['Lato'] leading-tight">
            Ou
          </div>
          <div className="w-16 h-0 border-t border-stone-600" />
        </div>

        {/* Google Login Button */}
        <button 
          onClick={handleGoogleLogin}
          className="self-stretch px-4 py-2 bg-white rounded-md border border-slate-300 inline-flex justify-center items-center hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <div className="flex-1 text-center justify-start text-stone-600 text-sm font-normal font-['Lato'] leading-tight">
            Continuer avec Google
          </div>
        </button>
      </div>
    </>
  );

  // 登录页面
  const renderLoginPage = () => (
    <>
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-6 left-6 w-6 h-6 text-neutral-600 hover:text-neutral-800 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Header Section */}
      <div className="self-stretch flex flex-col justify-start items-start gap-6 overflow-hidden">
        <div className="w-72 flex flex-col justify-start items-start gap-11">
          <div className="self-stretch justify-start text-[#8B5E3C] text-base font-normal font-['Playfair_Display'] leading-normal">
            Déjà venu ?
          </div>
        </div>
        <div className="self-stretch inline-flex justify-center items-center gap-2.5 overflow-hidden">
          <div className="flex-1 justify-start text-[#8B5E3C] text-xs font-normal font-['Playfair_Display'] leading-none tracking-tight">
            Retrouvez votre réservation à tout moment depuis votre espace — juste avant de boucler vos valises et de laisser le quotidien derrière vous.
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="self-stretch relative flex flex-col justify-center items-center gap-6">
        <div className="self-stretch flex flex-col justify-start items-start gap-4">
          {/* Email Field */}
          <div className="self-stretch flex flex-col justify-start items-start gap-2">
            <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
              <div className="justify-start text-stone-600 text-sm font-normal font-['Playfair_Display'] leading-tight tracking-tight">
                E-mail
              </div>
              <div className="self-stretch inline-flex justify-start items-start gap-2">
                <div className="flex-1 inline-flex flex-col justify-start items-start gap-1.5">
                  <div className="self-stretch pl-3 pr-14 py-2 bg-white rounded-md border border-slate-300 inline-flex justify-start items-center">
                    <div className="justify-start text-[#8B5E3C] text-xs font-normal font-['Playfair_Display'] leading-none tracking-tight">
                      {email}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Password Field */}
          <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
            <div className="justify-start text-stone-600 text-sm font-normal font-['Playfair_Display'] leading-tight tracking-tight">
              Mot de passe
            </div>
            <div className="self-stretch inline-flex justify-start items-start gap-2">
              <div className="flex-1 bg-white rounded-md border border-slate-300 inline-flex flex-col justify-start items-start gap-1.5 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="saisir votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="self-stretch pl-3 pr-10 py-2 rounded-md text-[#8B5E3C] text-xs font-normal font-['Playfair_Display'] leading-none tracking-tight border-none focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8B5E3C]"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div className="self-stretch text-right justify-start text-[#8B5E3C] text-xs font-normal font-['Playfair_Display'] underline leading-tight tracking-tight cursor-pointer hover:opacity-70">
              Réinitialiser mon mot de passe
            </div>
          </div>
        </div>

        <button 
          onClick={handleLogin}
          className="self-stretch py-2 bg-[#8B5E3C]/80 hover:bg-[#8B5E3C] rounded-md inline-flex justify-center items-center gap-2.5 transition-colors"
        >
          <div className="justify-start text-white text-sm font-normal font-['Playfair_Display'] leading-tight tracking-tight">
            Continuer
          </div>
        </button>
      </div>

      {/* Divider and Google Login */}
      <div className="self-stretch p-[5px] flex flex-col justify-center items-center gap-3.5 overflow-hidden">
        <div className="w-72 h-5 inline-flex justify-center items-center">
          <div className="w-16 h-0 border-t border-stone-600" />
          <div className="w-11 text-center justify-start text-stone-600 text-sm font-normal font-['Lato'] leading-tight">
            Ou
          </div>
          <div className="w-16 h-0 border-t border-stone-600" />
        </div>

        <button 
          onClick={handleGoogleLogin}
          className="self-stretch px-4 py-2 bg-white rounded-md border border-slate-300 inline-flex justify-center items-center hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <div className="flex-1 text-center justify-start text-stone-600 text-sm font-normal font-['Lato'] leading-tight">
            Continuer avec Google
          </div>
        </button>
      </div>
    </>
  );

  // 注册页面
  const renderRegisterPage = () => (
    <>
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-6 left-6 w-6 h-6 text-neutral-600 hover:text-neutral-800 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Header Section */}
      <div className="self-stretch flex flex-col justify-start items-start gap-6 overflow-hidden">
        <div className="w-72 flex flex-col justify-start items-start gap-11">
          <div className="self-stretch justify-start text-[#8B5E3C] text-base font-normal font-['Playfair_Display'] leading-normal">
            Première visite ?
          </div>
        </div>
        <div className="self-stretch inline-flex justify-center items-center gap-2.5 overflow-hidden">
          <div className="flex-1 justify-start text-[#8B5E3C] text-xs font-normal font-['Playfair_Display'] leading-none tracking-tight">
            Créez votre compte et commencez votre voyage vers l'exceptionnel.
          </div>
        </div>
      </div>

      {/* Register Form */}
      <div className="self-stretch relative flex flex-col justify-center items-center gap-6">
        <div className="self-stretch flex flex-col justify-start items-start gap-4">
          {/* Email Field */}
          <div className="self-stretch flex flex-col justify-start items-start gap-2">
            <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
              <div className="justify-start text-stone-600 text-sm font-normal font-['Playfair_Display'] leading-tight tracking-tight">
                E-mail
              </div>
              <div className="self-stretch inline-flex justify-start items-start gap-2">
                <div className="flex-1 inline-flex flex-col justify-start items-start gap-1.5">
                  <div className="self-stretch pl-3 pr-14 py-2 bg-white rounded-md border border-slate-300 inline-flex justify-start items-center">
                    <div className="justify-start text-[#8B5E3C] text-xs font-normal font-['Playfair_Display'] leading-none tracking-tight">
                      {email}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Password Field */}
          <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
            <div className="justify-start text-stone-600 text-sm font-normal font-['Playfair_Display'] leading-tight tracking-tight">
              Mot de passe
            </div>
            <div className="self-stretch inline-flex justify-start items-start gap-2">
              <div className="flex-1 bg-white rounded-md border border-slate-300 inline-flex flex-col justify-start items-start gap-1.5 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Créer votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="self-stretch pl-3 pr-10 py-2 rounded-md text-[#8B5E3C] text-xs font-normal font-['Playfair_Display'] leading-none tracking-tight border-none focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8B5E3C]"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            {passwordError && (
              <div className="text-red-500 text-xs font-normal font-['Playfair_Display'] leading-tight">
                {passwordError}
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="self-stretch flex flex-col justify-start items-start gap-1.5">
            <div className="justify-start text-stone-600 text-sm font-normal font-['Playfair_Display'] leading-tight tracking-tight">
              Confirmer le mot de passe
            </div>
            <div className="self-stretch inline-flex justify-start items-start gap-2">
              <div className="flex-1 bg-white rounded-md border border-slate-300 inline-flex flex-col justify-start items-start gap-1.5 relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirmer votre mot de passe"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="self-stretch pl-3 pr-10 py-2 rounded-md text-[#8B5E3C] text-xs font-normal font-['Playfair_Display'] leading-none tracking-tight border-none focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8B5E3C]"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            {confirmPasswordError && (
              <div className="text-red-500 text-xs font-normal font-['Playfair_Display'] leading-tight">
                {confirmPasswordError}
              </div>
            )}
          </div>
        </div>

        <button 
          onClick={handleRegister}
          disabled={!password || !confirmPassword || password !== confirmPassword || passwordError || confirmPasswordError}
          className={`self-stretch py-2 rounded-md inline-flex justify-center items-center gap-2.5 transition-colors ${
            password && confirmPassword && password === confirmPassword && !passwordError && !confirmPasswordError
              ? 'bg-[#8B5E3C]/80 hover:bg-[#8B5E3C] cursor-pointer'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          <div className="justify-start text-white text-sm font-normal font-['Playfair_Display'] leading-tight tracking-tight">
            Créer le compte
          </div>
        </button>
      </div>

      {/* Divider and Google Login */}
      <div className="self-stretch p-[5px] flex flex-col justify-center items-center gap-3.5 overflow-hidden">
        <div className="w-72 h-5 inline-flex justify-center items-center">
          <div className="w-16 h-0 border-t border-stone-600" />
          <div className="w-11 text-center justify-start text-stone-600 text-sm font-normal font-['Lato'] leading-tight">
            Ou
          </div>
          <div className="w-16 h-0 border-t border-stone-600" />
        </div>

        <button 
          onClick={handleGoogleLogin}
          className="self-stretch px-4 py-2 bg-white rounded-md border border-slate-300 inline-flex justify-center items-center hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <div className="flex-1 text-center justify-start text-stone-600 text-sm font-normal font-['Lato'] leading-tight">
            Continuer avec Google
          </div>
        </button>
      </div>
    </>
  );

  return (
    <div 
      className="fixed inset-0 w-full h-full bg-black/30 flex justify-end items-start overflow-hidden"
      style={{ zIndex: 10000 }}
      onClick={handleBackdropClick}
    >
      <div 
        className="w-[497px] h-full px-24 py-28 relative bg-stone-100 rounded-md border border-slate-200 flex flex-col justify-start items-start gap-11"
        onClick={handleModalClick}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-6 h-6 text-neutral-600 hover:text-neutral-800 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Render different pages based on currentPage state */}
        {currentPage === 'initial' && renderInitialPage()}
        {currentPage === 'login' && renderLoginPage()}
        {currentPage === 'register' && renderRegisterPage()}
      </div>
    </div>
  );
}

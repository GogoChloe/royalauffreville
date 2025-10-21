import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { prenom, nom, telephone, email, message, type } = await request.json();
    
    // Email content
    const emailContent = type === 'contact' 
      ? `
Nouveau message de contact - Royal Auffreville

Prénom: ${prenom}
Nom: ${nom}
Téléphone: ${telephone}
Email: ${email}

Message:
${message}
      `
      : `
Nouveau message AI Assistant - Royal Auffreville

Message:
${message}
      `;

    // TODO: Implement actual email sending
    // For now, we'll just log it
    // You can integrate with services like:
    // - Nodemailer with SMTP
    // - SendGrid
    // - AWS SES
    // - Resend
    
    console.log('Email would be sent to: yiching.uhc@gmail.com');
    console.log('Subject:', type === 'contact' ? `Contact - ${prenom} ${nom}` : 'AI Assistant Query');
    console.log('Content:', emailContent);
    
    // Simulate success
    return NextResponse.json({ 
      success: true, 
      message: 'Message envoyé avec succès' 
    });
    
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Erreur lors de l\'envoi du message' 
    }, { status: 500 });
  }
}

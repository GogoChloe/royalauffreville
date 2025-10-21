# Email Integration Guide

## Current Status
The contact form is fully functional with validation and API endpoint. However, actual email sending needs to be configured with a real email service.

## Email Validation Rules
- **Nom & Prénom**: Only letters, spaces, hyphens, and accented characters allowed
- **Téléphone**: Only numbers, spaces, hyphens, and parentheses allowed
- **Email**: Standard email format validation
- **AI Chat Message**: Maximum 5000 characters (no visible counter)
- **Contact Message**: Maximum 8000 characters (no visible counter)

## Email Destination
All emails are sent to: **yiching.uhc@gmail.com**

## Supported Country Codes
- 🇫🇷 +33 (France) - Default
- 🇺🇸 +1 (USA)
- 🇬🇧 +44 (UK)
- 🇩🇪 +49 (Germany)
- 🇮🇹 +39 (Italy)
- 🇪🇸 +34 (Spain)
- 🇨🇳 +86 (China)
- 🇯🇵 +81 (Japan)
- 🇰🇷 +82 (South Korea)
- 🇮🇳 +91 (India)

## Integration Options

### Option 1: Resend (Recommended - Modern & Simple)
```bash
npm install resend
```

Update `/app/api/send-email/route.js`:
```javascript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const { prenom, nom, telephone, email, message, type } = await request.json();
  
  try {
    const data = await resend.emails.send({
      from: 'Royal Auffreville <onboarding@resend.dev>',
      to: 'yiching.uhc@gmail.com',
      subject: type === 'contact' ? `Contact - ${prenom} ${nom}` : 'AI Assistant Query',
      text: type === 'contact' 
        ? `Prénom: ${prenom}\nNom: ${nom}\nTéléphone: ${telephone}\nEmail: ${email}\n\nMessage:\n${message}`
        : `Message AI:\n${message}`
    });
    
    return NextResponse.json({ success: true, message: 'Message envoyé' });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
```

Add to `.env.local`:
```
RESEND_API_KEY=your_api_key_here
```

### Option 2: Nodemailer with Gmail
```bash
npm install nodemailer
```

Update `/app/api/send-email/route.js`:
```javascript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD, // Use App Password, not regular password
  },
});

export async function POST(request) {
  const { prenom, nom, telephone, email, message, type } = await request.json();
  
  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: 'yiching.uhc@gmail.com',
      subject: type === 'contact' ? `Contact - ${prenom} ${nom}` : 'AI Assistant Query',
      text: type === 'contact'
        ? `Prénom: ${prenom}\nNom: ${nom}\nTéléphone: ${telephone}\nEmail: ${email}\n\nMessage:\n${message}`
        : `Message AI:\n${message}`
    });
    
    return NextResponse.json({ success: true, message: 'Message envoyé' });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
```

Add to `.env.local`:
```
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
```

**Note**: To get Gmail App Password:
1. Go to Google Account settings
2. Security > 2-Step Verification > App passwords
3. Generate a new app password for "Mail"

### Option 3: SendGrid
```bash
npm install @sendgrid/mail
```

Update `/app/api/send-email/route.js`:
```javascript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(request) {
  const { prenom, nom, telephone, email, message, type } = await request.json();
  
  try {
    await sgMail.send({
      to: 'yiching.uhc@gmail.com',
      from: 'noreply@royalauffreville.com', // Use verified sender
      subject: type === 'contact' ? `Contact - ${prenom} ${nom}` : 'AI Assistant Query',
      text: type === 'contact'
        ? `Prénom: ${prenom}\nNom: ${nom}\nTéléphone: ${telephone}\nEmail: ${email}\n\nMessage:\n${message}`
        : `Message AI:\n${message}`
    });
    
    return NextResponse.json({ success: true, message: 'Message envoyé' });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
```

Add to `.env.local`:
```
SENDGRID_API_KEY=your_api_key_here
```

## Testing
Currently, the API logs to console instead of sending real emails. Check the terminal/console to see the email content being "sent".

## Implementation Steps
1. Choose an email service (Resend recommended for ease of use)
2. Install the required package
3. Get API credentials
4. Update `/app/api/send-email/route.js` with the code above
5. Add credentials to `.env.local`
6. Test the form

## Features Implemented
✅ Country code selector for phone numbers (default: +33 France)
✅ Name validation (letters only)
✅ Phone validation (numbers only)
✅ Email format validation
✅ Character limits (5000 for AI chat, 8000 for contact message)
✅ Conditional title display (homepage only)
✅ Error handling and user feedback
✅ API endpoint ready for email service integration

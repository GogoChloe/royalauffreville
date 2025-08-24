import Link from "next/link";

export function FooterSection() {
  return (
    <footer className="w-full bg-[#8B5E3C] text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-['Great_Vibes'] mr-2">Royal</span>
              <img 
                className="w-12 h-12 rounded-full mx-2" 
                src="/logo.png" 
                alt="Logo"
              />
              <span className="text-2xl font-['Great_Vibes']">Auffreville</span>
            </div>
            <p className="font-['Playfair_Display'] text-sm leading-relaxed max-w-md">
              Un havre de paix à seulement 45 minutes de Paris. Évadez-vous dans notre domaine d'exception pour un séjour inoubliable.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-['Playfair_Display'] font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 font-['Playfair_Display'] text-sm">
              <li><Link href="/" className="hover:text-[#D4AF37] transition-colors">Accueil</Link></li>
              <li><Link href="/#experiences" className="hover:text-[#D4AF37] transition-colors">Expériences</Link></li>
              <li><Link href="/#activite" className="hover:text-[#D4AF37] transition-colors">Activités</Link></li>
              <li><Link href="/#proximite" className="hover:text-[#D4AF37] transition-colors">Proximité</Link></li>
              <li><Link href="/#contact" className="hover:text-[#D4AF37] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-['Playfair_Display'] font-semibold mb-4">Contact</h3>
            <div className="space-y-2 font-['Playfair_Display'] text-sm">
              <p>123 Route Royale</p>
              <p>Auffreville, France</p>
              <p>Tél: +33 1 23 45 67 89</p>
              <p>Email: contact@royal-auffreville.fr</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="font-['Playfair_Display'] text-sm">
            © 2025 Royal Auffreville. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
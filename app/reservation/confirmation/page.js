"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Header } from "../../component/Header";
import { Footer } from "../../component/Footer";
import { useLanguage } from "../../context/LanguageContext";
import { CheckCircle2, Calendar, Users, CreditCard, Home, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function ConfirmationContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reservationId = searchParams.get('id');

  useEffect(() => {
    if (!reservationId) {
      setError('No reservation ID provided');
      setLoading(false);
      return;
    }

    // Fetch reservation details
    fetch(`/api/reservations?id=${reservationId}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setReservation(data);
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load reservation');
        setLoading(false);
      });
  }, [reservationId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F0E6]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-[#D4AF37] animate-spin" />
          <p className="text-[#8B5E3C] font-['Playfair_Display']">
            {t.reservationPage.loadingConfirmation || 'Loading confirmation...'}
          </p>
        </div>
      </div>
    );
  }

  if (error || !reservation) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F0E6] gap-6 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4 font-['Playfair_Display']">
            {t.reservationPage.errorTitle || 'Error'}
          </h1>
          <p className="text-[#8B5E3C] mb-6 font-['Playfair_Display']">
            {error || t.reservationPage.reservationNotFound || 'Reservation not found'}
          </p>
          <Button
            onClick={() => router.push('/')}
            className="bg-[#D4AF37] hover:bg-[#B8941F] font-['Playfair_Display']"
          >
            {t.reservationPage.returnHome || 'Return to Home'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F0E6] py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="w-20 h-20 text-green-500" />
          </div>
          <h1 className="text-4xl font-bold text-[#8B5E3C] mb-4 font-['Playfair_Display']">
            {t.reservationPage.confirmationTitle || 'Réservation Confirmée!'}
          </h1>
          <p className="text-lg text-neutral-700 mb-4 font-['Playfair_Display']">
            {t.reservationPage.confirmationMessage || 'Votre réservation a été confirmée avec succès.'}
          </p>
          <div className="inline-block bg-[#D4AF37]/10 px-6 py-3 rounded-lg">
            <p className="text-sm text-[#8B5E3C] mb-1 font-['Playfair_Display']">
              {t.reservationPage.confirmationNumber || 'Numéro de confirmation'}
            </p>
            <p className="text-2xl font-bold text-[#D4AF37] font-['Playfair_Display']">
              {reservation.confirmationNumber}
            </p>
          </div>
        </div>

        {/* Reservation Details */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-[#8B5E3C] mb-6 font-['Playfair_Display']">
            {t.reservationPage.reservationDetails || 'Détails de la réservation'}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Check-in/Check-out */}
            <div className="flex items-start gap-4">
              <Calendar className="w-6 h-6 text-[#D4AF37] mt-1" />
              <div>
                <p className="font-semibold text-[#8B5E3C] mb-2 font-['Playfair_Display']">
                  {t.reservationPage.checkInDate}
                </p>
                <p className="text-neutral-700 font-['Playfair_Display']">
                  {formatDate(reservation.checkIn)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Calendar className="w-6 h-6 text-[#D4AF37] mt-1" />
              <div>
                <p className="font-semibold text-[#8B5E3C] mb-2 font-['Playfair_Display']">
                  {t.reservationPage.checkOutDate}
                </p>
                <p className="text-neutral-700 font-['Playfair_Display']">
                  {formatDate(reservation.checkOut)}
                </p>
              </div>
            </div>

            {/* Guests */}
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-[#D4AF37] mt-1" />
              <div>
                <p className="font-semibold text-[#8B5E3C] mb-2 font-['Playfair_Display']">
                  {t.reservationPage.guests || 'Invités'}
                </p>
                <p className="text-neutral-700 font-['Playfair_Display']">
                  {reservation.adults} {t.reservationPage.adults}
                  {parseInt(reservation.children) > 0 && `, ${reservation.children} ${t.reservationPage.children}`}
                  {parseInt(reservation.infants) > 0 && `, ${reservation.infants} ${t.reservationPage.infants}`}
                </p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="flex items-start gap-4">
              <CreditCard className="w-6 h-6 text-[#D4AF37] mt-1" />
              <div>
                <p className="font-semibold text-[#8B5E3C] mb-2 font-['Playfair_Display']">
                  {t.reservationPage.paymentMethod}
                </p>
                <p className="text-neutral-700 font-['Playfair_Display'] capitalize">
                  {reservation.paymentMethod === 'card' && t.reservationPage.bankCard}
                  {reservation.paymentMethod === 'paypal' && t.reservationPage.paypal}
                  {reservation.paymentMethod === 'klarna' && t.reservationPage.klarna}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Price Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <h2 className="text-2xl font-bold text-[#8B5E3C] mb-6 font-['Playfair_Display']">
            {t.reservationPage.summaryTitle || 'Récapitulatif'}
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between text-neutral-700 font-['Playfair_Display']">
              <span>{t.reservationPage.houseRental}</span>
              <span>{reservation.pricing.basePrice}€</span>
            </div>
            <div className="flex justify-between text-neutral-700 font-['Playfair_Display']">
              <span>{t.reservationPage.cleaningFees}</span>
              <span>{reservation.pricing.cleaningFee}€</span>
            </div>
            <div className="flex justify-between text-neutral-700 font-['Playfair_Display']">
              <span>{t.reservationPage.serviceFees}</span>
              <span>{reservation.pricing.serviceFee}€</span>
            </div>
            <div className="flex justify-between text-neutral-700 font-['Playfair_Display']">
              <span>{t.reservationPage.taxes}</span>
              <span>{reservation.pricing.taxes}€</span>
            </div>
            
            <div className="border-t border-neutral-300 pt-4">
              <div className="flex justify-between text-xl font-bold text-[#8B5E3C] font-['Playfair_Display']">
                <span>{t.reservationPage.total}</span>
                <span>{reservation.pricing.total}€</span>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-[#D4AF37]/10 rounded-2xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-[#8B5E3C] mb-4 font-['Playfair_Display']">
            {t.reservationPage.nextSteps || 'Prochaines étapes'}
          </h2>
          <ul className="space-y-3 text-neutral-700 font-['Playfair_Display']">
            <li className="flex items-start gap-2">
              <span className="text-[#D4AF37] mt-1">✓</span>
              <span>{t.reservationPage.step1 || 'Vous recevrez un email de confirmation à votre adresse email.'}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#D4AF37] mt-1">✓</span>
              <span>{t.reservationPage.step2 || 'Le propriétaire vous contactera sous 24h pour les détails d\'arrivée.'}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#D4AF37] mt-1">✓</span>
              <span>{t.reservationPage.step3 || 'Vous pouvez consulter votre réservation dans votre espace client.'}</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => router.push('/espace-client')}
            className="bg-[#D4AF37] hover:bg-[#B8941F] px-8 py-6 text-lg font-['Playfair_Display']"
          >
            {t.reservationPage.viewReservations || 'Voir mes réservations'}
          </Button>
          <Button
            onClick={() => router.push('/')}
            variant="outline"
            className="border-[#D4AF37] text-[#8B5E3C] hover:bg-[#D4AF37]/10 px-8 py-6 text-lg font-['Playfair_Display']"
          >
            <Home className="w-5 h-5 mr-2" />
            {t.reservationPage.returnHome || 'Retour à l\'accueil'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F5F0E6]">
      <Header />
      <Suspense fallback={
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-12 h-12 text-[#D4AF37] animate-spin" />
        </div>
      }>
        <ConfirmationContent />
      </Suspense>
      <Footer />
    </div>
  );
}

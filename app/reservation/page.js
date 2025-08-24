import React from "react";
import { Footer } from "../component/Footer";
import { Header } from "../component/Header";
import { ReservationFormSection } from "../component/ReservationFormSection";

const Reservation = () => {
  return (
    <div className="flex flex-col items-start relative bg-[#f5f0e6] overflow-hidden">
      <Header />
      <ReservationFormSection />
      <Footer/>
    </div>
  );
};

export default Reservation;

"use client";

import { Header } from "../component/Header";
import { Footer } from "../component/Footer";
import { Proxi } from "../component/Proxi";

export default function ProximitePage() {
  return (
    <div className="min-h-screen bg-[#F5F0E6]">
      <Header />
      
      {/* Content - Proxi component with breadcrumb and title */}
      <Proxi showBreadcrumb={true} />

      <Footer />
    </div>
  );
}

import React from "react";
import { Activit } from "./component/Activit";
import { ChiffreCles } from "./component/ChiffreCles";
import Contact from "./component/Contact";
import { Footer } from "./component/Footer";
import { Hero } from "./component/Hero";
import { Pieces } from "./component/Pieces";
import { Proxi } from "./component/Proxi";
import { Temoig } from "./component/Temoig";
import { Experience } from "./component/Experience";
import { Header } from "./component/Header";
const HomePage = () => {
  return (
    <div className="w-full min-h-screen">
      <Header />
      <main className="w-full relative pt-20">
        <Hero />
        <ChiffreCles />
        <Temoig />
        <Pieces />
        <Experience />
        <Activit />
        <Proxi />
        <Contact />
        <Footer />
      </main>
    </div>
  );
};

export default HomePage;

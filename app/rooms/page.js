import { RoomsSection } from "../component/RoomsSection";
import { Header } from "../component/Header";
import { Footer } from "../component/Footer";


export default function Rooms() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <RoomsSection />
      </main>
      <Footer />
    </div>
  );
}

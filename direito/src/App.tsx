import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import AnaliseRisco from "@/pages/AnaliseRisco";
import Regularizacao from "@/pages/Regularizacao"; // Novo
import Contratos from "@/pages/Contratos";         // Novo
import Leiloes from "@/pages/Leiloes";             // Novo
import ScrollToTop from "@/components/ScrollToTop";

function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <About />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/analise-risco" element={<AnaliseRisco />} />
        <Route path="/regularizacao" element={<Regularizacao />} />
        <Route path="/contratos" element={<Contratos />} />
        <Route path="/leiloes" element={<Leiloes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

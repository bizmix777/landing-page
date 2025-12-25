import { useState } from "react";
import { ArrowLeft, Gavel, TrendingUp, AlertOctagon, SearchCheck, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { ContactModal } from "@/components/ContactModal";

export default function Leiloes() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Voltar ao Início</span>
          </Link>
          <div className="font-display font-bold text-xl text-primary">Direito & Negócios</div>
        </div>
      </nav>

      <section className="relative py-20 bg-emerald-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white border border-white/20 mb-6 backdrop-blur-sm">
            <Gavel className="w-4 h-4" />
            <span className="text-sm font-bold">ASSESSORIA EM LEILÕES</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-display leading-tight">
            Compre imóveis com <br />
            <span className="text-emerald-400">até 60% de desconto.</span>
          </h1>
          <p className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            Leilão não é sorte, é matemática e direito. Analisamos o processo para garantir que você não compre um problema, mas sim uma oportunidade de lucro.
          </p>
          
          {/* BOTÃO CORRIGIDO: Agora abre o Modal */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-emerald-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-emerald-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 cursor-pointer"
          >
            <TrendingUp className="w-5 h-5" />
            Quero Arrematar com Segurança
          </button>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm order-2 md:order-1">
              <h3 className="text-xl font-bold text-emerald-800 mb-6 flex items-center gap-2">
                <SearchCheck className="w-6 h-6" />
                O que analisamos antes do lance:
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-foreground">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" /> 
                  Nulidades no processo (para evitar anulação futura)
                </li>
                <li className="flex items-center gap-3 text-foreground">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" /> 
                  Dívidas que acompanham o imóvel (IPTU, Condomínio)
                </li>
                <li className="flex items-center gap-3 text-foreground">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" /> 
                  Estado de ocupação e dificuldade de despejo
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold text-foreground mb-6 font-display">O risco de fazer sozinho</h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Muitos arrematantes iniciantes ficam presos em imóveis com processos trabalhistas ocultos ou ocupantes que exigem anos de briga judicial para sair.
              </p>
              <div className="flex items-center gap-4 p-4 bg-red-50 rounded-lg border border-red-100 text-red-800 font-medium">
                <AlertOctagon className="w-6 h-6 shrink-0" />
                <p>Sem análise jurídica, o barato pode sair muito caro.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        serviceName="Assessoria em Leilões" 
      />
    </div>
  );
}

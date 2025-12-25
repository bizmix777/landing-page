import { useState } from "react";
import { ArrowLeft, Home, FileWarning, CheckCircle2, Map, FileText, Scale } from "lucide-react";
import { Link } from "react-router-dom";
import { ContactModal } from "@/components/ContactModal";

export default function Regularizacao() {
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

      <section className="relative py-20 bg-secondary overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white border border-white/20 mb-6 backdrop-blur-sm">
            <Home className="w-4 h-4" />
            <span className="text-sm font-bold">REGULARIZAÇÃO IMOBILIÁRIA</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-display leading-tight">
            Seu imóvel só é seu <br />
            <span className="text-primary-foreground">se estiver no seu nome.</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-50 max-w-2xl mx-auto mb-10 leading-relaxed">
            Contrato de gaveta não garante propriedade. Transformamos sua posse em Escritura e Matrícula registrada, valorizando seu patrimônio em até 40%.
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-white text-secondary px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 cursor-pointer"
          >
            <CheckCircle2 className="w-5 h-5" />
            Quero Regularizar Meu Imóvel
          </button>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6 font-display">Os perigos do "Contrato de Gaveta"</h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Ter apenas a posse ou um contrato simples deixa você vulnerável. O antigo dono pode vender o imóvel novamente, ter o bem penhorado por dívidas ou falecer e o bem entrar em inventário.
              </p>
              <ul className="space-y-4">
                {["Risco de perder o imóvel para dívidas do antigo dono", "Impossibilidade de vender financiado", "Desvalorização de mercado (30% a 50%)", "Insegurança jurídica para herdeiros"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                    <FileWarning className="w-5 h-5 text-red-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-secondary mb-6 flex items-center gap-2">
                <Scale className="w-6 h-6" />
                Como resolvemos:
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold shrink-0"><Map className="w-5 h-5" /></div>
                  <div><h4 className="font-bold text-foreground">Usucapião (Judicial ou Extrajudicial)</h4><p className="text-sm text-muted-foreground">Regularização baseada no tempo de posse, sem depender do antigo dono.</p></div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary font-bold shrink-0"><FileText className="w-5 h-5" /></div>
                  <div><h4 className="font-bold text-foreground">Adjudicação Compulsória</h4><p className="text-sm text-muted-foreground">Quando você pagou tudo, mas o vendedor se recusa (ou sumiu) e não passa a escritura.</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        serviceName="Regularização de Imóveis" 
      />
    </div>
  );
}

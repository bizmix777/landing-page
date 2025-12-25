import { useState } from "react";
import { ArrowLeft, FileSignature, ShieldAlert, PenTool, Lock, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { ContactModal } from "@/components/ContactModal";

export default function Contratos() {
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

      <section className="relative py-20 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white border border-white/20 mb-6 backdrop-blur-sm">
            <FileSignature className="w-4 h-4" />
            <span className="text-sm font-bold">CONTRATOS BLINDADOS</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-display leading-tight">
            Um contrato ruim pode <br />
            <span className="text-red-500">custar o seu patrimônio.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Não use modelos de internet. Criamos contratos personalizados que preveem cenários de crise, inadimplência e distrato, protegendo você de verdade.
          </p>
          
          {/* BOTÃO CORRIGIDO: Agora abre o Modal */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 cursor-pointer"
          >
            <PenTool className="w-5 h-5" />
            Solicitar Contrato Blindado
          </button>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-200 rounded-xl hover:border-primary/50 transition-colors">
              <ShieldAlert className="w-10 h-10 text-red-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Cláusulas Nulas</h3>
              <p className="text-muted-foreground">Identificamos cláusulas que parecem boas, mas que seriam anuladas por um juiz, deixando você desprotegido.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-xl hover:border-primary/50 transition-colors">
              <Lock className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Garantias Reais</h3>
              <p className="text-muted-foreground">Amarramos o contrato a garantias executáveis. Se a outra parte não pagar, você tem como receber.</p>
            </div>
            <div className="p-6 border border-gray-200 rounded-xl hover:border-primary/50 transition-colors">
              <Eye className="w-10 h-10 text-secondary mb-4" />
              <h3 className="text-xl font-bold mb-2">Multas e Distratos</h3>
              <p className="text-muted-foreground">Regras claras para saída. Evite brigas judiciais de anos definindo exatamente o que acontece se o negócio der errado.</p>
            </div>
          </div>
        </div>
      </section>

      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        serviceName="Contratos Blindados" 
      />
    </div>
  );
}

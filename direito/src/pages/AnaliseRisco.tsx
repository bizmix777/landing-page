import { useState } from "react";
import { ArrowLeft, Shield, AlertTriangle, Search, FileCheck, Clock, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { ContactModal } from "@/components/ContactModal";

export default function AnaliseRisco() {
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

      <section className="relative py-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white border border-white/20 mb-6 backdrop-blur-sm">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-bold">DUE DILIGENCE IMOBILIÁRIA</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-display leading-tight">
            Não assine o contrato <br />
            <span className="text-secondary">sem saber a verdade.</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            Investigamos o imóvel, os vendedores e as empresas envolvidas. 
            Descubra dívidas ocultas, processos e riscos de fraude antes de pagar.
          </p>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-secondary text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-secondary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 cursor-pointer"
          >
            <Search className="w-5 h-5" />
            Solicitar Análise Agora
          </button>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6 font-display">
                O barato que sai caro: <br />
                <span className="text-red-600">Riscos Invisíveis.</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                A certidão de matrícula não conta a história toda. Um vendedor com dívidas trabalhistas ou fiscais pode ter a venda anulada pela justiça anos depois, e você perde o imóvel.
              </p>
              <ul className="space-y-4">
                {["Processos Trabalhistas ocultos", "Dívidas Fiscais e Tributárias", "Fraude à Execução", "Indisponibilidade de Bens", "Riscos de Leilão Judicial"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                    <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                <FileCheck className="w-6 h-6" />
                O que entregamos no Relatório:
              </h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold shrink-0">1</div>
                  <div><h4 className="font-bold text-foreground">Varredura Completa (CPF/CNPJ)</h4><p className="text-sm text-muted-foreground">Análise de todos os proprietários e antecessores (até 10 anos).</p></div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold shrink-0">2</div>
                  <div><h4 className="font-bold text-foreground">Análise do Imóvel</h4><p className="text-sm text-muted-foreground">Situação na prefeitura, condomínio, cartório e órgãos ambientais.</p></div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold shrink-0">3</div>
                  <div><h4 className="font-bold text-foreground">Parecer Jurídico Final</h4><p className="text-sm text-muted-foreground">Nossa conclusão técnica: "Compra Segura", "Risco Moderado" ou "Não Compre".</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-12 font-display">Por que nossa análise é superior?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-border hover:border-primary/30 transition-colors">
              <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Velocidade Recorde</h3>
              <p className="text-muted-foreground">Usamos tecnologia própria para cruzar dados. Entregamos prévia em 24h e relatório completo em até 48h.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-border hover:border-primary/30 transition-colors">
              <Shield className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Visão de Negócio</h3>
              <p className="text-muted-foreground">Não falamos "juridiquês". Explicamos o risco real em dinheiro e probabilidade de perda.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-border hover:border-primary/30 transition-colors">
              <Search className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Investigação Profunda</h3>
              <p className="text-muted-foreground">Vamos além do básico. Investigamos empresas coligadas e "laranjas" para garantir sua segurança.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-display">Quanto vale a sua paz de espírito?</h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">O custo de uma análise preventiva é menos de 0,5% do valor do imóvel. O custo de um problema jurídico pode ser 100% do seu patrimônio.</p>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-green-600 text-white px-10 py-5 rounded-lg font-bold text-xl hover:bg-green-700 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
          >
            <CheckCircle2 className="w-6 h-6" />
            Proteger Meu Investimento Agora
          </button>
        </div>
      </section>

      <ContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        serviceName="Análise de Risco" 
      />
    </div>
  );
}

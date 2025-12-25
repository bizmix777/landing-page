import { useState } from "react";
import { Shield, Brain, Scale, ArrowRight, X, MessageCircle, User } from "lucide-react";

export function Hero() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  const contacts = [
    {
      name: "Dr. Henrique",
      role: "Sócio Fundador",
      phone: "5562992475080", // Brasil
      message: "Olá Dr. Henrique, gostaria de uma consultoria."
    },
    {
      name: "Dr. Pedro Emilio",
      role: "Advogado Associado",
      phone: "5562991040066", // Brasil
      message: "Olá Dr. Pedro, gostaria de falar sobre um processo."
    },
    {
      name: "Dr. Gabriel Gomes",
      role: "Advogado Associado",
      phone: "351934231913", // Portugal (351)
      message: "Olá Dr. Gabriel, preciso de orientação jurídica."
    }
  ];

  return (
    <section className="relative min-h-screen gradient-hero flex items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl opacity-50" />
      </div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-primary/20 text-primary mb-8 animate-fade-in shadow-sm backdrop-blur-sm">
            <Scale className="w-4 h-4" />
            <span className="text-sm font-bold tracking-wide">ADVOCACIA & INTELIGÊNCIA IMOBILIÁRIA</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight animate-fade-in font-display" style={{ animationDelay: "0.1s" }}>
            Protegendo seu Patrimônio com <br className="hidden md:block" />
            <span className="text-gradient">Visão de Negócios e Tecnologia</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto animate-fade-in leading-relaxed" style={{ animationDelay: "0.2s" }}>
            Unimos a segurança jurídica à agilidade comercial. 
            Soluções para compra, venda e regularização de imóveis com a experiência de quem empreende desde 1990.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <button
              onClick={scrollToServices}
              className="group bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              Soluções Jurídicas e Imobiliárias
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => setIsContactOpen(true)}
              className="bg-white border-2 border-primary/10 text-foreground px-8 py-4 rounded-lg font-semibold text-lg hover:border-primary/50 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Fale com os nossos advogados
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in text-left" style={{ animationDelay: "0.4s" }}>
            <div className="bg-white p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-bold text-xl text-foreground mb-3">Direito Digital</h3>
              <p className="text-muted-foreground leading-relaxed">
                Uso de tecnologia para acelerar processos, contratos inteligentes e due diligence profunda.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-100 transition-colors">
                <Shield className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-display font-bold text-xl text-foreground mb-3">Segurança Total</h3>
              <p className="text-muted-foreground leading-relaxed">
                Análise de risco completa antes de qualquer negócio. Não assine nada sem nossa validação.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-100 transition-colors">
                <Scale className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-display font-bold text-xl text-foreground mb-3">Visão de Dono</h3>
              <p className="text-muted-foreground leading-relaxed">
                Atuação como advogado e corretor. Entendemos a dor do empresário e a letra da lei.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DE CONTATO */}
      {isContactOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full relative shadow-2xl animate-scale-in">
            <button 
              onClick={() => setIsContactOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 font-display">Fale com a Equipe</h3>
              <p className="text-gray-500 mt-2">Escolha um especialista para iniciar o atendimento:</p>
            </div>

            <div className="space-y-3">
              {contacts.map((contact, index) => (
                <a
                  key={index}
                  href={`https://wa.me/${contact.phone}?text=${encodeURIComponent(contact.message)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-green-200 hover:bg-green-50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-green-200 group-hover:text-green-700 transition-colors">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 group-hover:text-green-800">{contact.name}</h4>
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{contact.role}</p>
                  </div>
                  <MessageCircle className="w-5 h-5 text-gray-300 ml-auto group-hover:text-green-600" />
                </a>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <button 
                onClick={() => setIsContactOpen(false)}
                className="text-sm text-gray-400 hover:text-gray-600 underline"
              >
                Fechar janela
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

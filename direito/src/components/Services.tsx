import { CheckCircle2, FileText, Search, Home, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: <Search className="w-8 h-8 text-primary" />,
    title: "Análise de Risco (Due Diligence)",
    description: "Investigação completa de dívidas, processos e pendências do imóvel e dos vendedores. Segurança zero surpresas.",
    link: "/analise-risco"
  },
  {
    icon: <Home className="w-8 h-8 text-secondary" />,
    title: "Regularização de Imóveis",
    description: "Usucapião, inventários, desmembramentos e retificações de área. Transformamos posse em propriedade registrada.",
    link: "/regularizacao" // Link Ativado
  },
  {
    icon: <FileText className="w-8 h-8 text-primary" />,
    title: "Contratos Blindados",
    description: "Elaboração e revisão de contratos de compra e venda, locação e permuta com cláusulas de proteção avançada.",
    link: "/contratos" // Link Ativado
  },
  {
    icon: <CheckCircle2 className="w-8 h-8 text-secondary" />,
    title: "Assessoria em Leilões",
    description: "Análise jurídica prévia de editais e imóveis de leilão para garantir a arrematação segura e lucrativa.",
    link: "/leiloes" // Link Ativado
  }
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display">
            Soluções Jurídicas e Imobiliárias
          </h2>
          <p className="text-lg text-muted-foreground">
            Atuamos em todas as etapas do seu negócio imobiliário, garantindo velocidade e conformidade legal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col h-full p-6 rounded-xl bg-gray-50 border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all duration-300 group relative">
              <div className="mb-4 p-3 bg-white rounded-lg w-fit shadow-sm group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 font-display">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                {service.description}
              </p>
              
              {service.link && (
                <Link 
                  to={service.link}
                  className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all mt-auto"
                >
                  Saiba Mais
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

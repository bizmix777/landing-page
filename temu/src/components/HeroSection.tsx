import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center bg-gradient-hero overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--gold)) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-navy-light/50 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-gold/30 mb-8 animate-fade-in">
            <TrendingUp size={16} className="text-gold" />
            <span className="font-body text-sm text-primary-foreground/90">
              Sourcing Estratégico para Empresas
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-in-delay-1">
            Aumente o{" "}
            <span className="text-gradient-gold">Valuation</span>
            <br />
            da sua Empresa reduzindo o{" "}
            <span className="text-gradient-gold">CMV</span>
          </h1>

          {/* Subtitle */}
          <p className="font-body text-lg sm:text-xl text-primary-foreground/70 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-delay-2">
            Conectamos seu negócio diretamente às cadeias de suprimento globais
            para maximizar a margem líquida e aumentar sua competitividade.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-delay-3">
            <Button variant="hero" size="xl">
              Quero Reduzir Custos
              <ArrowRight size={20} />
            </Button>
            <Button variant="hero-outline" size="xl">
              Ver Simulação
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-12 border-t border-primary-foreground/10 animate-fade-in-delay-3">
            <div className="text-center">
              <p className="font-display text-3xl sm:text-4xl font-bold text-gold mb-1">
                60%
              </p>
              <p className="font-body text-sm text-primary-foreground/60">
                Economia Média
              </p>
            </div>
            <div className="text-center">
              <p className="font-display text-3xl sm:text-4xl font-bold text-gold mb-1">
                500+
              </p>
              <p className="font-body text-sm text-primary-foreground/60">
                Fornecedores
              </p>
            </div>
            <div className="text-center">
              <p className="font-display text-3xl sm:text-4xl font-bold text-gold mb-1">
                R$2M+
              </p>
              <p className="font-body text-sm text-primary-foreground/60">
                Economizados
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-gold rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

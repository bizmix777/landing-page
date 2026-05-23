import { TrendingDown, TrendingUp, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";

const SimulatorSection = () => {
  const comparisons = [
    { item: "Produto A", local: 100, bizmix: 40 },
    { item: "Produto B", local: 250, bizmix: 95 },
    { item: "Produto C", local: 180, bizmix: 72 },
  ];

  return (
    <section className="py-20 sm:py-28 bg-navy relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--gold)) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block font-body text-sm font-semibold text-gold uppercase tracking-wider mb-4">
            Simulador de Economia
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Veja o Quanto Você Pode{" "}
            <span className="text-gradient-gold">Economizar</span>
          </h2>
          <p className="font-body text-lg text-primary-foreground/70 max-w-2xl mx-auto">
            Compare os preços dos fornecedores locais com o sourcing direto da
            Bizmix
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl shadow-elevated overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-4 gap-4 p-6 bg-muted border-b border-border">
              <div className="font-body font-semibold text-foreground">
                Produto
              </div>
              <div className="font-body font-semibold text-foreground text-center flex items-center justify-center gap-2">
                <TrendingUp className="w-4 h-4 text-destructive" />
                Preço Local
              </div>
              <div className="font-body font-semibold text-foreground text-center flex items-center justify-center gap-2">
                <TrendingDown className="w-4 h-4 text-gold" />
                Bizmix Sourcing
              </div>
              <div className="font-body font-semibold text-foreground text-center flex items-center justify-center gap-2">
                <Percent className="w-4 h-4 text-gold" />
                Economia
              </div>
            </div>

            {/* Table Body */}
            {comparisons.map((row, index) => {
              const economy = Math.round(
                ((row.local - row.bizmix) / row.local) * 100
              );
              return (
                <div
                  key={index}
                  className={`grid grid-cols-4 gap-4 p-6 items-center transition-colors hover:bg-muted/50 ${
                    index !== comparisons.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="font-body font-medium text-foreground">
                    {row.item}
                  </div>
                  <div className="text-center">
                    <span className="font-body text-lg text-muted-foreground line-through">
                      R$ {row.local.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="font-display text-xl font-bold text-gold">
                      R$ {row.bizmix.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gold/10 font-body font-semibold text-gold">
                      {economy}%
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Summary Footer */}
            <div className="p-6 bg-navy">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="font-body text-primary-foreground/80 text-sm mb-1">
                    Economia Média
                  </p>
                  <p className="font-display text-4xl font-bold text-gold">
                    60%
                  </p>
                </div>
                <Button variant="hero" size="lg">
                  Solicitar Orçamento Personalizado
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="font-body text-sm text-primary-foreground/50 mb-6">
            Valores ilustrativos baseados em casos reais de clientes
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {["Temu", "Alibaba", "1688", "Made-in-China"].map((partner) => (
              <span
                key={partner}
                className="font-body text-lg text-primary-foreground/30 hover:text-gold/60 transition-colors"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimulatorSection;

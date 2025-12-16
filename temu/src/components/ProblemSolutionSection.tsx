import { AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";

const ProblemSolutionSection = () => {
  return (
    <section id="servicos" className="py-20 sm:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block font-body text-sm font-semibold text-gold uppercase tracking-wider mb-4">
            Por que escolher a Bizmix?
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Transforme seu <span className="text-gradient-gold">Custo</span> em{" "}
            <span className="text-gradient-gold">Lucro</span>
          </h2>
        </div>

        {/* Problem / Solution Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Problem Card */}
          <div className="group relative bg-card rounded-2xl p-8 shadow-card border border-border hover:border-destructive/30 transition-all duration-500">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-destructive/60 to-destructive/20 rounded-t-2xl" />
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground">
                O Problema
              </h3>
            </div>

            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-6">
              Sua empresa paga caro por intermediários locais que aumentam drasticamente o custo de aquisição dos produtos.
            </p>

            <ul className="space-y-3">
              {[
                "Margens de lucro apertadas",
                "Dependência de distribuidores locais",
                "Preços não competitivos no mercado",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 font-body text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-destructive/60" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Solution Card */}
          <div className="group relative bg-card rounded-2xl p-8 shadow-card border border-border hover:border-gold/50 transition-all duration-500">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold to-gold-light rounded-t-2xl" />
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-gold" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground">
                A Solução
              </h3>
            </div>

            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-6">
              Nossa auditoria conecta você direto à fábrica com o modelo <strong className="text-foreground">Factory-to-Business</strong>.
            </p>

            <ul className="space-y-3">
              {[
                "Importação direta da fonte",
                "Redução de até 60% nos custos",
                "Maior competitividade e margem",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 font-body text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-gold flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Process Flow */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h3 className="font-display text-2xl font-bold text-center text-foreground mb-12">
            Como Funciona
          </h3>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {[
              { step: "01", title: "Análise", desc: "Auditamos seus custos atuais" },
              { step: "02", title: "Sourcing", desc: "Identificamos fornecedores globais" },
              { step: "03", title: "Negociação", desc: "Fechamos os melhores preços" },
              { step: "04", title: "Entrega", desc: "Logística completa até você" },
            ].map((item, index, arr) => (
              <div key={index} className="flex items-center gap-4">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-navy flex items-center justify-center mb-3 shadow-card">
                    <span className="font-display text-xl font-bold text-gold">
                      {item.step}
                    </span>
                  </div>
                  <h4 className="font-display text-lg font-semibold text-foreground mb-1">
                    {item.title}
                  </h4>
                  <p className="font-body text-sm text-muted-foreground max-w-[120px]">
                    {item.desc}
                  </p>
                </div>
                {index < arr.length - 1 && (
                  <ArrowRight className="hidden md:block w-6 h-6 text-gold/50 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;

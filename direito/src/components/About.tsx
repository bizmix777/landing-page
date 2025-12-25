import { Award, Briefcase, Lightbulb, User } from "lucide-react";

const team = [
  {
    name: "Henrique",
    role: "Sócio Fundador | OAB & CRECI",
    bio: "Pioneiro em tecnologia (1990) e internet (1996). Une 30+ anos de visão empresarial com a segurança jurídica.",
    mission: "Missão: Fazer pessoas e empresas andarem mais rápido para a sabedoria.",
    highlight: true, // Destaque para você
  },
  {
    name: "Pedro Emilio",
    role: "Advogado Associado",
    bio: "Foco em modernização jurídica e resolução ágil de conflitos. Trazendo inovação para a prática do direito.",
    mission: "Compromisso com a excelência e agilidade processual.",
    highlight: false,
  },
  {
    name: "Gabriel Gomes",
    role: "Advogado Associado",
    bio: "Especialista em análise detalhada e estratégias jurídicas. Dedicação total à proteção patrimonial dos clientes.",
    mission: "Segurança jurídica em cada etapa do processo.",
    highlight: false,
  },
];

export function About() {
  return (
    <section id="sobre" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <User className="w-4 h-4" />
            <span className="text-sm font-bold">QUEM SOMOS</span>
          </div>
          
          {/* AQUI ESTÁ A MUDANÇA QUE VOCÊ QUERIA: */}
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-display">
            Sobre os Especialistas
          </h2>
          
          <p className="text-lg text-muted-foreground">
            Uma banca jurídica familiar que une a sabedoria de 30 anos de mercado com a energia da nova advocacia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div 
              key={index} 
              className={`relative p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 ${
                member.highlight 
                  ? "bg-white border-2 border-primary/20 shadow-xl" 
                  : "bg-white border border-border shadow-sm hover:shadow-md"
              }`}
            >
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 text-2xl font-bold ${
                member.highlight ? "bg-primary text-white" : "bg-gray-100 text-gray-500"
              }`}>
                {member.name.charAt(0)}
              </div>

              <h3 className="text-2xl font-bold text-foreground mb-1 font-display">
                Dr. {member.name}
              </h3>
              <p className={`text-sm font-semibold mb-4 uppercase tracking-wider ${
                member.highlight ? "text-primary" : "text-muted-foreground"
              }`}>
                {member.role}
              </p>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {member.bio}
              </p>

              <div className={`p-4 rounded-lg flex gap-3 ${
                member.highlight ? "bg-primary/5" : "bg-gray-50"
              }`}>
                {member.highlight ? (
                  <Lightbulb className="w-5 h-5 text-primary shrink-0" />
                ) : (
                  <Award className="w-5 h-5 text-gray-400 shrink-0" />
                )}
                <p className="text-sm font-medium text-foreground italic">
                  "{member.mission}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

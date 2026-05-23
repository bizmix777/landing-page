import { Mail, Phone, MapPin, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contato" className="bg-navy border-t border-primary-foreground/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <a href="#inicio" className="inline-block mb-6">
              <span className="font-display text-3xl font-bold text-primary-foreground">
                Biz<span className="text-gradient-gold">mix</span>
              </span>
            </a>
            <p className="font-body text-primary-foreground/70 leading-relaxed mb-6">
              Sourcing estratégico para empresas que querem maximizar lucros através da importação direta.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/70 hover:bg-gold hover:text-navy transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-primary-foreground/70 hover:bg-gold hover:text-navy transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h4 className="font-display text-lg font-semibold text-primary-foreground mb-6">
              Links Rápidos
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Início", href: "#inicio" },
                { label: "Serviços", href: "#servicos" },
                { label: "Sobre Nós", href: "#" },
                { label: "Política de Privacidade", href: "#" },
                { label: "Termos de Uso", href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-primary-foreground/70 hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-display text-lg font-semibold text-primary-foreground mb-6">
              Contato
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold flex-shrink-0" />
                <a
                  href="mailto:contato@bizmix.com.br"
                  className="font-body text-primary-foreground/70 hover:text-gold transition-colors"
                >
                  contato@bizmix.com.br
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold flex-shrink-0" />
                <a
                  href="tel:+5511999999999"
                  className="font-body text-primary-foreground/70 hover:text-gold transition-colors"
                >
                  +55 (11) 99999-9999
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span className="font-body text-primary-foreground/70">
                  São Paulo, SP - Brasil
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-primary-foreground/10">
          <p className="font-body text-sm text-primary-foreground/50 text-center">
            © {currentYear} Bizmix Sourcing. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

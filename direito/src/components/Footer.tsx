import { MapPin, Phone, Mail, ArrowRight, Scale, Building2, Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-white pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Coluna 1: Identidade e Credenciais */}
          <div>
            <h3 className="text-2xl font-display font-bold mb-6 text-white">
              Henrique <span className="text-primary">Advocacia & Negócios</span>
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Unindo a segurança jurídica à visão de negócios. Tecnologia e experiência de 30 anos a favor do seu patrimônio.
            </p>
            
            <div className="flex flex-col gap-2 bg-gray-900 p-4 rounded-lg border border-gray-800">
              <div className="flex items-center gap-3 text-sm font-medium text-gray-300">
                <Scale className="w-4 h-4 text-primary" />
                <span>OAB/GO: <strong className="text-white">41.660</strong></span>
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-gray-300">
                <Building2 className="w-4 h-4 text-secondary" />
                <span>CRECI/GO: <strong className="text-white">23.479</strong></span>
              </div>
            </div>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Acesso Rápido</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  Início
                </Link>
              </li>
              <li>
                <Link to="/analise-risco" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  Análise de Risco (Due Diligence)
                </Link>
              </li>
              <li>
                <a href="/#services" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  Nossas Soluções
                </a>
              </li>
              <li>
                <a href="/#sobre" className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  Sobre os Especialistas
                </a>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Contato e Localização */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Fale Conosco</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                <span>
                  Anápolis - Goiás<br />
                  <span className="text-sm text-gray-500">Atendimento em todo o Brasil (Digital)</span>
                </span>
              </li>
              <li>
                <a 
                  href="https://wa.me/5562992475080" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors"
                >
                  <Phone className="w-5 h-5 shrink-0" />
                  <span>(62) 99247-5080</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:henrique@bizmix.com.br" 
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5 shrink-0" />
                  <span>henrique@bizmix.com.br</span>
                </a>
              </li>
            </ul>

            <div className="flex gap-4 mt-8">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} Henrique Advocacia & Negócios. Todos os direitos reservados.
          </p>
          <p className="text-gray-600 text-xs">
            Desenvolvido com Tecnologia & Sabedoria.
          </p>
        </div>
      </div>
    </footer>
  );
}

import { X, MessageCircle, User } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string; // O nome do serviço muda dinamicamente
}

const lawyers = [
  {
    name: "Dr. Henrique",
    role: "Sócio Fundador",
    phone: "5562992475080",
  },
  {
    name: "Dr. Pedro Emilio",
    role: "Advogado Associado",
    phone: "5562991040066",
  },
  {
    name: "Dr. Gabriel Gomes",
    role: "Advogado Associado",
    phone: "351934231913",
  }
];

export function ContactModal({ isOpen, onClose, serviceName }: ContactModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full relative shadow-2xl animate-scale-in">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
            <MessageCircle className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 font-display">
            Interesse em: <br/>
            <span className="text-primary">{serviceName}</span>
          </h3>
          <p className="text-gray-500 mt-2 text-sm">Escolha um especialista para iniciar o atendimento:</p>
        </div>

        <div className="space-y-3">
          {lawyers.map((lawyer, index) => (
            <a
              key={index}
              href={`https://wa.me/${lawyer.phone}?text=Olá ${lawyer.name}, tenho interesse em *${encodeURIComponent(serviceName)}*. Poderia me ajudar?`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-primary/30 hover:bg-gray-50 transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-primary group-hover:text-white transition-colors">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{lawyer.name}</h4>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{lawyer.role}</p>
              </div>
              <MessageCircle className="w-5 h-5 text-gray-300 ml-auto group-hover:text-green-500" />
            </a>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <button 
            onClick={onClose}
            className="text-sm text-gray-400 hover:text-gray-600 underline"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

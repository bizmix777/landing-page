import React from 'react';

const Painel = () => {
  return (
    <div className="min-h-screen bg-red-600 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">PAINEL FUNCIONANDO! 🚀</h1>
      <p className="text-xl">Se você está vendo esta tela vermelha, a configuração deu certo.</p>
      <div className="mt-8 p-4 bg-white text-red-600 rounded shadow-lg">
        <p className="font-bold">Próximo passo:</p>
        <p>Me avise para eu te mandar o código completo do Painel Administrativo.</p>
      </div>
    </div>
  );
};

export default Painel;

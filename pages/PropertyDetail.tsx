
import React, { useState } from 'react';
import { Property } from '../types';

interface PropertyDetailProps {
  property: Property;
  onBack: () => void;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property, onBack }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
  }).format(property.price);

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImage((prev) => (prev + 1) % property.images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImage((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const handleWhatsApp = () => {
    const message = `Olá! Tenho interesse no imóvel: ${property.title} (${property.location.neighborhood}, ${property.location.city}). Link: ${getSharableUrl()}`;
    window.open(`https://wa.me/5594992912256?text=${encodeURIComponent(message)}`, '_blank');
  };

  const getSharableUrl = () => {
    let baseUrl = localStorage.getItem('imoveis_maraba_public_url') || window.location.origin + window.location.pathname;
    
    // Remove parâmetros antigos se houver
    if (baseUrl.includes('?')) {
      baseUrl = baseUrl.split('?')[0];
    }
    
    return `${baseUrl}?property=${property.id}`;
  };

  const handleShare = async () => {
    const url = getSharableUrl();

    // Alerta se for link do editor
    if (url.includes('showAssistant=true')) {
      alert('Atenção: Configure o "Link Público" no Painel Administrativo para compartilhar imóveis profissionalmente.');
      return;
    }

    const shareData = {
      title: property.title,
      text: `Veja este imóvel em Marabá: ${property.title} por ${formattedPrice}`,
      url: url
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(url);
        alert('Link deste imóvel copiado!');
      }
    } catch (err) {
      console.error('Erro ao compartilhar:', err);
    }
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={onBack} className="mb-8 flex items-center text-slate-500 hover:text-blue-600 transition-colors font-medium group">
          <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Voltar para listagem
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200">
              <div className="aspect-[16/9] bg-slate-100 relative group cursor-pointer overflow-hidden">
                <img 
                  src={property.images[activeImage]} 
                  alt={property.title} 
                  className="w-full h-full object-contain bg-slate-200" 
                  onClick={() => setIsLightboxOpen(true)} 
                />
                
                {/* Botões de Navegação Lateral */}
                {property.images.length > 1 && (
                  <>
                    <button 
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white backdrop-blur-md p-3 rounded-full shadow-lg text-slate-800 transition-all opacity-0 group-hover:opacity-100 active:scale-90"
                      title="Imagem anterior"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button 
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white backdrop-blur-md p-3 rounded-full shadow-lg text-slate-800 transition-all opacity-0 group-hover:opacity-100 active:scale-90"
                      title="Próxima imagem"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}

                <div className="absolute top-6 left-6 flex gap-3 pointer-events-none">
                  <span className="px-4 py-1.5 bg-blue-600 text-white rounded-full font-bold text-sm shadow-lg">{property.modality}</span>
                  <span className="px-4 py-1.5 bg-white text-blue-600 rounded-full font-bold text-sm shadow-lg border border-slate-100">{property.type}</span>
                </div>

                <div className="absolute bottom-6 right-6 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold">
                  {activeImage + 1} / {property.images.length}
                </div>
              </div>
              
              <div className="p-4 flex gap-4 overflow-x-auto scrollbar-hide">
                {property.images.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setActiveImage(idx)} 
                    className={`flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-blue-600 scale-105 shadow-md' : 'border-transparent opacity-60'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Descrição</h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line text-lg">{property.description}</p>
              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-slate-100">
                <div className="text-center">
                  <span className="block text-slate-400 text-xs font-bold uppercase mb-2">Quartos</span>
                  <p className="text-2xl font-bold text-slate-900">{property.features.bedrooms}</p>
                </div>
                <div className="text-center border-l border-slate-100">
                  <span className="block text-slate-400 text-xs font-bold uppercase mb-2">Banheiros</span>
                  <p className="text-2xl font-bold text-slate-900">{property.features.bathrooms}</p>
                </div>
                <div className="text-center border-l border-slate-100">
                  <span className="block text-slate-400 text-xs font-bold uppercase mb-2">Vagas</span>
                  <p className="text-2xl font-bold text-slate-900">{property.features.parkingSpaces}</p>
                </div>
                <div className="text-center border-l border-slate-100">
                  <span className="block text-slate-400 text-xs font-bold uppercase mb-2">Área M²</span>
                  <p className="text-2xl font-bold text-slate-900">{property.features.area}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200 sticky top-24 text-center lg:text-left">
              <h1 className="text-2xl font-extrabold text-slate-900 mb-2 leading-tight">{property.title}</h1>
              <p className="text-slate-500 mb-6 flex items-center justify-center lg:justify-start">
                <svg className="w-5 h-5 mr-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.828a2 2 0 01-2.828 0L7.586 16.657m0 0A8 8 0 1120.343 2.143M11 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {property.location.neighborhood}, {property.location.city}
              </p>
              <div className="mb-8">
                <span className="text-slate-400 text-xs font-bold uppercase block mb-1">Valor</span>
                <div className="flex items-baseline justify-center lg:justify-start gap-2">
                  <span className="text-4xl font-extrabold text-blue-600">{formattedPrice}</span>
                  {property.modality === 'Aluguel' && <span className="text-slate-400 font-bold">/ mês</span>}
                </div>
              </div>
              <div className="space-y-4">
                <button onClick={handleWhatsApp} className="w-full bg-[#25D366] text-white py-4 rounded-2xl font-bold flex items-center justify-center transition-all active:scale-95 shadow-lg">
                  Conversar no WhatsApp
                </button>
                <button onClick={handleShare} className="w-full bg-slate-100 text-slate-700 py-4 rounded-2xl font-bold flex items-center justify-center transition-all active:scale-95">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                  Compartilhar Imóvel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isLightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4" onClick={() => setIsLightboxOpen(false)}>
           <img src={property.images[activeImage]} className="max-w-full max-h-full object-contain" alt="" />
           <button className="absolute top-8 right-8 text-white p-2 hover:bg-white/10 rounded-full transition-colors">
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
           </button>
           
           {/* Setas no Lightbox também */}
           {property.images.length > 1 && (
             <>
               <button 
                onClick={handlePrevImage}
                className="absolute left-8 top-1/2 -translate-y-1/2 text-white p-4 hover:bg-white/10 rounded-full transition-colors"
               >
                 <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
               </button>
               <button 
                onClick={handleNextImage}
                className="absolute right-8 top-1/2 -translate-y-1/2 text-white p-4 hover:bg-white/10 rounded-full transition-colors"
               >
                 <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
               </button>
             </>
           )}
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;

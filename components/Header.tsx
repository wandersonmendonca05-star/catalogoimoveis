
import React, { useState } from 'react';

interface HeaderProps {
  onNavigate: (page: 'home' | 'listings' | 'admin' | 'property', propertyId?: string) => void;
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getCleanPublicUrl = () => {
    try {
      const url = new URL(window.location.href);
      // Forçamos os parâmetros que escondem o editor do AI Studio
      url.searchParams.set('showPreview', 'true');
      url.searchParams.set('fullscreenApplet', 'true');
      url.searchParams.delete('showAssistant'); // Remove o assistente lateral
      return url.toString();
    } catch (e) {
      return window.location.href;
    }
  };

  const handleShare = async () => {
    const cleanUrl = getCleanPublicUrl();
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Imóveis Marabá',
          text: 'Confira nosso catálogo de imóveis atualizado!',
          url: cleanUrl
        });
      } catch (err) {
        console.error('Erro ao compartilhar:', err);
      }
    } else {
      await navigator.clipboard.writeText(cleanUrl);
      alert('Link profissional copiado! Agora é só colar no WhatsApp do seu cliente.');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center cursor-pointer group" onClick={() => onNavigate('home')}>
            <div className="bg-blue-600 p-2.5 rounded-xl group-hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div className="ml-3">
              <span className="block text-xl font-black text-slate-900 leading-none">Imóveis Marabá</span>
              <span className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">Consultoria Imobiliária</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => onNavigate('home')}
              className={`text-sm font-bold px-3 py-2 rounded-lg transition-all ${currentPage === 'home' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              Início
            </button>
            <button 
              onClick={() => onNavigate('listings')}
              className={`text-sm font-bold px-3 py-2 rounded-lg transition-all ${currentPage === 'listings' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              Imóveis
            </button>
            
            <button 
              onClick={handleShare}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-200 active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Enviar Catálogo
            </button>
          </nav>

          {/* Mobile buttons */}
          <div className="flex items-center gap-2 md:hidden">
            <button onClick={handleShare} className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-3 text-slate-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 py-4 px-4 space-y-2 shadow-2xl animate-in slide-in-from-top duration-300">
          <button onClick={() => { onNavigate('home'); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-3 text-slate-700 font-bold hover:bg-slate-50 rounded-xl">Início</button>
          <button onClick={() => { onNavigate('listings'); setIsMenuOpen(false); }} className="block w-full text-left px-4 py-3 text-slate-700 font-bold hover:bg-slate-50 rounded-xl">Imóveis</button>
        </div>
      )}
    </header>
  );
};

export default Header;

import React from 'react';
import { Property, SearchFilters } from '../types';
import PropertyCard from '../components/PropertyCard';
import FilterBar from '../components/SearchFilters';

interface HomeProps {
  properties: Property[];
  onNavigate: (page: any, id?: string) => void;
  filters: SearchFilters;
  onFilterChange: (f: SearchFilters) => void;
}

const Home: React.FC<HomeProps> = ({ properties, onNavigate, filters, onFilterChange }) => {
  const featuredProperties = properties.filter(p => p.isActive).slice(0, 3);

  const scrollToBenefits = () => {
    const element = document.getElementById('benefits-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-2xl animate-in fade-in slide-in-from-left-8 duration-700">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              Encontre o lugar onde sua <span className="text-blue-400">história continua.</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Curadoria exclusiva dos melhores imóveis para venda e aluguel com a segurança e transparência que você merece em Marabá.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => onNavigate('listings')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-blue-600/30 transition-all hover:-translate-y-1 active:scale-95"
              >
                Ver Catálogo Completo
              </button>
              <button 
                onClick={scrollToBenefits}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-bold text-lg transition-all active:scale-95 hover:-translate-y-1"
              >
                Saiba Mais
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Quick Access */}
      <div className="px-4 -mt-10 relative z-20">
        <FilterBar filters={filters} onChange={onFilterChange} isCompact />
      </div>

      {/* Stats/Benefits */}
      <section id="benefits-section" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="p-6">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Segurança Total</h3>
            <p className="text-slate-500">Transações documentadas e verificadas juridicamente para sua tranquilidade em cada contrato.</p>
          </div>
          <div className="p-6">
            <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Agilidade Marabá</h3>
            <p className="text-slate-500">Processo de compra e locação simplificado para você não perder as melhores oportunidades da região.</p>
          </div>
          <div className="p-6">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.828a2 2 0 01-2.828 0L7.586 16.657m0 0A8 8 0 1120.343 2.143M11 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Localizações Diversas</h3>
            <p className="text-slate-500">Imóveis localizados em diversos núcleos, desde o baixo ao alto padrão para atender todos os tipos de público.</p>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">Oportunidades</span>
              <h2 className="text-4xl font-bold text-slate-900 mt-2">Destaques da Semana</h2>
            </div>
            <button 
              onClick={() => onNavigate('listings')}
              className="text-blue-600 font-bold flex items-center hover:translate-x-1 transition-transform"
            >
              Ver todos 
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map(prop => (
              <PropertyCard 
                key={prop.id} 
                property={prop} 
                onClick={(id) => onNavigate('property', id)} 
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

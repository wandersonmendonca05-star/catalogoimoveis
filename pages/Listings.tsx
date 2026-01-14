
import React from 'react';
import { Property, SearchFilters } from '../types';
import PropertyCard from '../components/PropertyCard';
import FilterBar from '../components/SearchFilters';

interface ListingsProps {
  properties: Property[];
  onNavigate: (page: any, id?: string) => void;
  filters: SearchFilters;
  onFilterChange: (f: SearchFilters) => void;
}

const Listings: React.FC<ListingsProps> = ({ properties, onNavigate, filters, onFilterChange }) => {
  const filteredProperties = properties.filter(prop => {
    if (!prop.isActive) return false;
    
    if (filters.city && !prop.location.city.toLowerCase().includes(filters.city.toLowerCase())) return false;
    if (filters.type && prop.type !== filters.type) return false;
    if (filters.modality && prop.modality !== filters.modality) return false;
    if (filters.minPrice && prop.price < filters.minPrice) return false;
    if (filters.maxPrice && prop.price > filters.maxPrice) return false;
    
    return true;
  });

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Explore Nosso Catálogo</h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Utilize os filtros abaixo para encontrar exatamente o que você procura. Temos opções para todos os perfis e necessidades.
          </p>
        </div>

        <div className="mb-12">
          <FilterBar filters={filters} onChange={onFilterChange} />
        </div>

        <div className="flex justify-between items-center mb-8">
          <p className="text-slate-500 font-medium">
            Mostrando <span className="text-slate-900 font-bold">{filteredProperties.length}</span> imóveis encontrados
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ordenar por:</span>
            <select className="bg-transparent text-sm font-bold text-slate-900 border-none focus:ring-0 cursor-pointer">
              <option>Mais recentes</option>
              <option>Menor preço</option>
              <option>Maior preço</option>
            </select>
          </div>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map(prop => (
              <PropertyCard 
                key={prop.id} 
                property={prop} 
                onClick={(id) => onNavigate('property', id)} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 border-dashed">
            <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Nenhum imóvel encontrado</h3>
            <p className="text-slate-500 mb-8">Tente ajustar seus filtros para encontrar outros resultados.</p>
            <button 
              onClick={() => onFilterChange({ query: '', city: '', type: '', modality: '', minPrice: '', maxPrice: '' })}
              className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold"
            >
              Limpar Todos os Filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Listings;

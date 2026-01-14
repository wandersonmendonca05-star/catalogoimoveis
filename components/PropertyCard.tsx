
import React from 'react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  onClick: (id: string) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick }) => {
  const formattedPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
  }).format(property.price);

  return (
    <div 
      className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col h-full"
      onClick={() => onClick(property.id)}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={property.images[0] || 'https://picsum.photos/400/300'} 
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-blue-700 text-xs font-bold rounded-full shadow-sm">
            {property.modality}
          </span>
          <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full shadow-sm">
            {property.type}
          </span>
        </div>
        {property.status !== 'Disponível' && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg shadow-lg rotate-[-10deg]">
              {property.status.toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-2">
          <p className="text-blue-600 font-bold text-lg">{formattedPrice}{property.modality === 'Aluguel' ? '/mês' : ''}</p>
        </div>
        
        <h3 className="text-slate-900 font-bold text-xl mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {property.title}
        </h3>
        
        <div className="flex items-center text-slate-500 text-sm mb-4">
          <svg className="w-4 h-4 mr-1 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.828a2 2 0 01-2.828 0L7.586 16.657m0 0A8 8 0 1120.343 2.143M11 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {property.location.neighborhood}, {property.location.city}
        </div>

        {/* Features */}
        <div className="mt-auto pt-4 border-t border-slate-100 grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center">
            <span className="text-xs text-slate-400">Quartos</span>
            <span className="font-semibold text-slate-700">{property.features.bedrooms}</span>
          </div>
          <div className="flex flex-col items-center border-x border-slate-100">
            <span className="text-xs text-slate-400">Banheiros</span>
            <span className="font-semibold text-slate-700">{property.features.bathrooms}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs text-slate-400">Área</span>
            <span className="font-semibold text-slate-700">{property.features.area}m²</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;

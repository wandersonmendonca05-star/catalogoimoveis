
import React from 'react';
import { SearchFilters, PropertyType, PropertyModality } from '../types';
import { PROPERTY_TYPES, PROPERTY_MODALITIES } from '../constants';

interface SearchFiltersProps {
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
  isCompact?: boolean;
}

const FilterBar: React.FC<SearchFiltersProps> = ({ filters, onChange, isCompact = false }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({
      ...filters,
      [name]: value === '' ? '' : (name.includes('Price') ? Number(value) : value)
    });
  };

  const containerClasses = isCompact 
    ? "bg-white p-4 rounded-2xl shadow-xl flex flex-col md:flex-row items-end gap-4 -mt-12 mx-auto max-w-5xl border border-slate-200"
    : "bg-white p-6 rounded-2xl shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4";

  return (
    <div className={containerClasses}>
      <div className="flex-grow w-full">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Localização</label>
        <div className="relative">
          <input
            type="text"
            name="city"
            placeholder="Ex: Florianópolis"
            value={filters.city}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
          />
        </div>
      </div>

      <div className="w-full">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Tipo</label>
        <select
          name="type"
          value={filters.type}
          onChange={handleChange}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
        >
          <option value="">Todos</option>
          {PROPERTY_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
        </select>
      </div>

      <div className="w-full">
        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Modalidade</label>
        <select
          name="modality"
          value={filters.modality}
          onChange={handleChange}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
        >
          <option value="">Ambos</option>
          {PROPERTY_MODALITIES.map(mod => <option key={mod} value={mod}>{mod}</option>)}
        </select>
      </div>

      {!isCompact && (
        <>
          <div className="w-full">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Preço Min.</label>
            <input
              type="number"
              name="minPrice"
              placeholder="R$"
              value={filters.minPrice}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <div className="w-full">
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Preço Max.</label>
            <input
              type="number"
              name="maxPrice"
              placeholder="R$"
              value={filters.maxPrice}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
            />
          </div>
        </>
      )}

      <div className={isCompact ? "w-full md:w-auto" : "flex items-end"}>
        <button 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95 flex items-center justify-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Buscar
        </button>
      </div>
    </div>
  );
};

export default FilterBar;

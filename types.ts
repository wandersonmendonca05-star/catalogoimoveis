
export type PropertyType = 'Casa' | 'Apartamento' | 'Terreno' | 'Comercial' | 'Fazenda' | 'Chácara' | 'Sítio';
export type PropertyStatus = 'Disponível' | 'Vendido' | 'Alugado';
export type PropertyModality = 'Venda' | 'Aluguel';

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  type: PropertyType;
  modality: PropertyModality;
  status: PropertyStatus;
  location: {
    city: string;
    neighborhood: string;
    address?: string;
  };
  features: {
    bedrooms: number;
    bathrooms: number;
    area: number;
    parkingSpaces: number;
  };
  images: string[];
  isActive: boolean;
  createdAt: string;
}

export interface SearchFilters {
  query: string;
  city: string;
  type: PropertyType | '';
  modality: PropertyModality | '';
  minPrice: number | '';
  maxPrice: number | '';
}

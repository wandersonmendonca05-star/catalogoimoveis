
import { Property } from './types';

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Cobertura Duplex de Luxo',
    description: 'Espetacular cobertura duplex com vista para o mar. Acabamento de altíssimo padrão, varanda gourmet integrada e automação residencial completa. Ideal para quem busca exclusividade e conforto.',
    price: 2500000,
    type: 'Apartamento',
    modality: 'Venda',
    status: 'Disponível',
    location: {
      city: 'Florianópolis',
      neighborhood: 'Beira Mar Norte'
    },
    features: {
      bedrooms: 4,
      bathrooms: 5,
      area: 320,
      parkingSpaces: 3
    },
    images: [
      'https://picsum.photos/id/101/1200/800',
      'https://picsum.photos/id/102/1200/800',
      'https://picsum.photos/id/103/1200/800'
    ],
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Casa Contemporânea em Condomínio',
    description: 'Casa recém construída com conceito aberto, muita luz natural e integração com a natureza. Condomínio fechado com segurança 24h e infraestrutura completa de lazer.',
    price: 1800000,
    type: 'Casa',
    modality: 'Venda',
    status: 'Disponível',
    location: {
      city: 'São José',
      neighborhood: 'Kobrasol'
    },
    features: {
      bedrooms: 3,
      bathrooms: 4,
      area: 250,
      parkingSpaces: 2
    },
    images: [
      'https://picsum.photos/id/104/1200/800',
      'https://picsum.photos/id/106/1200/800',
      'https://picsum.photos/id/107/1200/800'
    ],
    isActive: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Apartamento Studio Moderno',
    description: 'Studio compacto e funcional, totalmente mobiliado e decorado. Excelente opção para investimento ou para quem busca praticidade no dia a dia urbano.',
    price: 3500,
    type: 'Apartamento',
    modality: 'Aluguel',
    status: 'Disponível',
    location: {
      city: 'Florianópolis',
      neighborhood: 'Trindade'
    },
    features: {
      bedrooms: 1,
      bathrooms: 1,
      area: 45,
      parkingSpaces: 1
    },
    images: [
      'https://picsum.photos/id/108/1200/800',
      'https://picsum.photos/id/109/1200/800'
    ],
    isActive: true,
    createdAt: new Date().toISOString()
  }
];

export const PROPERTY_TYPES = ['Casa', 'Apartamento', 'Terreno', 'Comercial', 'Fazenda', 'Chácara', 'Sítio'];
export const PROPERTY_MODALITIES = ['Venda', 'Aluguel'];
export const PROPERTY_STATUSES = ['Disponível', 'Vendido', 'Alugado'];

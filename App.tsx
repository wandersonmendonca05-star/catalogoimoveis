
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Listings from './pages/Listings';
import PropertyDetail from './pages/PropertyDetail';
import Admin from './pages/Admin';
import { Property, SearchFilters } from './types';
import { propertyService } from './services/propertyService';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'listings' | 'admin' | 'property'>('home');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | undefined>();
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<{message: string, type: 'key' | 'table' | 'generic'} | null>(null);

  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    city: '',
    type: '',
    modality: '',
    minPrice: '',
    maxPrice: ''
  });

  // Resetar scroll para o topo em cada mudança de página ou imóvel
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, selectedPropertyId]);

  // Carrega configurações e verifica parâmetros de URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const propId = params.get('property');
    
    fetchProperties().then((loadedProps) => {
      if (propId && loadedProps) {
        const found = loadedProps.find(p => p.id === propId);
        if (found) {
          setSelectedPropertyId(propId);
          setCurrentPage('property');
        }
      }
    });
  }, []);

  const fetchProperties = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await propertyService.getAll();
      setProperties(data);
      return data;
    } catch (err: any) {
      console.error('Erro de conexão:', err);
      let errorType: 'key' | 'table' | 'generic' = 'generic';
      let message = 'Erro ao carregar dados. Verifique sua conexão.';
      if (err?.code === '42P01') {
        errorType = 'table';
        message = 'A tabela "properties" não foi encontrada. Você executou o comando SQL no Supabase?';
      } else if (err?.message?.includes('JWT') || err?.status === 401 || err?.code === 'PGRST301') {
        errorType = 'key';
        message = 'A Chave API (Anon Key) está incorreta.';
      }
      setError({ message, type: errorType });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigate = (page: any, id?: string) => {
    setCurrentPage(page);
    setSelectedPropertyId(id);
    
    // Atualiza a URL sem recarregar a página para refletir o imóvel atual
    const url = new URL(window.location.href);
    if (id && page === 'property') {
      url.searchParams.set('property', id);
    } else {
      url.searchParams.delete('property');
    }
    window.history.pushState({}, '', url);
  };

  const handleAddProperty = async (newProp: Omit<Property, 'id' | 'createdAt'>) => {
    try {
      const created = await propertyService.create(newProp);
      setProperties([created, ...properties]);
      alert('Imóvel cadastrado com sucesso!');
    } catch (err) {
      alert('Erro ao salvar.');
    }
  };

  const handleUpdateProperty = async (id: string, updates: Partial<Property>) => {
    try {
      const updated = await propertyService.update(id, updates);
      setProperties(properties.map(p => p.id === id ? updated : p));
      alert('Imóvel atualizado!');
    } catch (err) {
      alert('Erro ao atualizar imóvel.');
    }
  };

  const handleDeleteProperty = async (id: string) => {
    if (confirm('Deseja remover este imóvel definitivamente?')) {
      try {
        await propertyService.delete(id);
        setProperties(properties.filter(p => p.id !== id));
      } catch (err) {
        alert('Erro ao deletar imóvel.');
      }
    }
  };

  const renderPage = () => {
    if (isLoading && currentPage !== 'admin') {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-slate-400">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="font-medium animate-pulse text-slate-600">Carregando catálogo...</p>
        </div>
      );
    }

    if (error && currentPage !== 'admin') {
      return (
        <div className="p-10 md:p-20 flex justify-center">
          <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-slate-100 max-w-xl text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Conectando ao banco de dados...</h3>
            <p className="text-slate-600 mb-8">{error.message}</p>
            <button onClick={fetchProperties} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold">Tentar Novamente</button>
          </div>
        </div>
      );
    }

    switch (currentPage) {
      case 'home':
        return <Home properties={properties} onNavigate={handleNavigate} filters={filters} onFilterChange={setFilters} />;
      case 'listings':
        return <Listings properties={properties} onNavigate={handleNavigate} filters={filters} onFilterChange={setFilters} />;
      case 'property':
        const property = properties.find(p => p.id === selectedPropertyId);
        if (!property) return <div className="p-20 text-center font-bold">Imóvel não encontrado. <button onClick={() => handleNavigate('home')} className="text-blue-600 underline">Voltar</button></div>;
        return <PropertyDetail property={property} onBack={() => handleNavigate('listings')} />;
      case 'admin':
        return <Admin properties={properties} onAdd={handleAddProperty} onUpdate={handleUpdateProperty} onDelete={handleDeleteProperty} />;
      default:
        return <Home properties={properties} onNavigate={handleNavigate} filters={filters} onFilterChange={setFilters} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onNavigate={handleNavigate} currentPage={currentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      
      <footer className="bg-slate-900 text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-blue-600 p-2 rounded-lg text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                </div>
                <span className="ml-3 text-xl font-bold text-white">Imóveis Marabá</span>
              </div>
              <p className="text-sm">O melhor catálogo de imóveis de Marabá e região.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Contato</h4>
              <p className="text-sm">WhatsApp: (94) 99291-2256</p>
              <p className="text-sm">Marabá, Pará</p>
            </div>
            <div className="flex items-end md:justify-end">
              <button onClick={() => handleNavigate('admin')} className="text-xs hover:text-white transition-colors">Acesso Administrativo</button>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 text-center text-xs">
            <p>© 2024 Imóveis Marabá. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

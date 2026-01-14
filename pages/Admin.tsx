
import React, { useState } from 'react';
import { Property, PropertyType, PropertyModality, PropertyStatus } from '../types';
import { PROPERTY_TYPES } from '../constants';

interface AdminProps {
  properties: Property[];
  onAdd: (p: Omit<Property, 'id' | 'createdAt'>) => void;
  onUpdate: (id: string, p: Partial<Property>) => void;
  onDelete: (id: string) => void;
}

const Admin: React.FC<AdminProps> = ({ properties, onAdd, onUpdate, onDelete }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [loginPass, setLoginPass] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginPass === 'admin') {
      setIsLoggedIn(true);
    } else {
      alert('Senha incorreta! Use: admin');
    }
  };

  const [formData, setFormData] = useState({
    title: '', description: '', price: '' as string | number,
    type: 'Casa' as PropertyType, modality: 'Venda' as PropertyModality, 
    status: 'Disponível' as PropertyStatus, city: 'Marabá', neighborhood: '', 
    bedrooms: 0, bathrooms: 0, area: 0, parkingSpaces: 0, 
    images: [] as string[], isActive: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: Number(formData.price),
      location: { city: formData.city, neighborhood: formData.neighborhood },
      features: { 
        bedrooms: Number(formData.bedrooms), bathrooms: Number(formData.bathrooms), 
        area: Number(formData.area), parkingSpaces: Number(formData.parkingSpaces) 
      }
    };
    if (editingProperty) onUpdate(editingProperty.id, payload as any);
    else onAdd(payload as any);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '', description: '', price: '', type: 'Casa', modality: 'Venda', status: 'Disponível', 
      city: 'Marabá', neighborhood: '', bedrooms: 0, bathrooms: 0, area: 0, parkingSpaces: 0, images: [], isActive: true
    });
    setEditingProperty(null);
    setShowForm(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6 bg-slate-50">
        <form onSubmit={handleLogin} className="bg-white p-10 rounded-[40px] shadow-2xl w-full max-w-md border border-slate-200 text-center">
          <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 text-white shadow-xl shadow-blue-200">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
          <h2 className="text-3xl font-black mb-2 text-slate-900">Acesso Restrito</h2>
          <p className="text-slate-500 mb-8 font-medium">Digite a senha para gerenciar o catálogo</p>
          <input 
            type="password" 
            required 
            autoFocus
            value={loginPass} 
            onChange={e => setLoginPass(e.target.value)} 
            className="w-full bg-slate-50 border-2 border-slate-100 p-5 rounded-2xl outline-none focus:border-blue-600 transition-all mb-6 text-center text-xl font-bold tracking-widest" 
            placeholder="••••••" 
          />
          <button type="submit" className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95">Entrar no Painel</button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto pb-32">
      {/* Aviso de Publicação */}
      <div className="bg-amber-50 border-2 border-amber-200 p-6 rounded-3xl mb-12 flex flex-col md:flex-row items-center gap-6">
        <div className="bg-amber-200 p-4 rounded-2xl text-amber-700">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <div className="flex-grow">
          <h3 className="text-amber-900 font-black text-lg">Como compartilhar com clientes?</h3>
          <p className="text-amber-800 text-sm">Para que o seu cliente veja o site sem as barras do editor do Google, clique no botão azul <strong>"Enviar Catálogo"</strong> lá no topo do site. O sistema gera automaticamente um link que esconde as ferramentas de edição.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900">Gerenciar Imóveis</h1>
          <p className="text-slate-500 font-medium">Você tem {properties.length} imóveis cadastrados</p>
        </div>
        <button 
          onClick={() => setShowForm(true)} 
          className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-blue-200 hover:bg-blue-700 flex items-center transition-all active:scale-95"
        >
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
          Cadastrar Novo
        </button>
      </div>

      <div className="bg-white rounded-[40px] border-2 border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b-2 border-slate-100">
            <tr>
              <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Imóvel</th>
              <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Preço</th>
              <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {properties.map(p => (
              <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-6 flex items-center">
                  <img src={p.images[0]} className="w-16 h-16 rounded-2xl object-cover mr-6 shadow-md" alt="" />
                  <div>
                    <span className="font-black text-slate-900 block text-lg">{p.title}</span>
                    <span className="text-slate-400 text-sm font-bold">{p.location.neighborhood}</span>
                  </div>
                </td>
                <td className="px-8 py-6 font-black text-blue-600 text-xl">R$ {p.price.toLocaleString()}</td>
                <td className="px-8 py-6">
                  <div className="flex justify-end gap-3">
                    <button onClick={() => { setEditingProperty(p); setFormData({...p, price: p.price, city: p.location.city, neighborhood: p.location.neighborhood, ...p.features} as any); setShowForm(true); }} className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                    <button onClick={() => onDelete(p.id)} className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md">
          <div className="bg-white w-full max-w-3xl rounded-[40px] p-10 overflow-y-auto max-h-[90vh] shadow-2xl">
            <h2 className="text-3xl font-black mb-8 text-slate-900">{editingProperty ? 'Editar Imóvel' : 'Novo Cadastro'}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-400 ml-2">Título do Imóvel</label>
                  <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl outline-none focus:border-blue-600 transition-all font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-400 ml-2">Preço (R$)</label>
                  <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl outline-none focus:border-blue-600 transition-all font-bold" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-400 ml-2">Bairro</label>
                  <input required type="text" value={formData.neighborhood} onChange={e => setFormData({...formData, neighborhood: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl outline-none focus:border-blue-600 transition-all font-bold" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-400 ml-2">Tipo</label>
                  <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as any})} className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl outline-none focus:border-blue-600 transition-all font-bold">
                    {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-400 ml-2">Descrição Completa</label>
                <textarea rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl outline-none focus:border-blue-600 transition-all font-bold" />
              </div>

              <div className="flex justify-end gap-6 pt-6 border-t border-slate-100">
                <button type="button" onClick={resetForm} className="px-8 font-black text-slate-400 hover:text-slate-600 transition-colors">Cancelar</button>
                <button type="submit" className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95">Salvar Imóvel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
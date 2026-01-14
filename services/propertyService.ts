
import { supabase } from '../lib/supabase';
import { Property } from '../types';

export const propertyService = {
  async getAll(): Promise<Property[]> {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('createdAt', { ascending: false });

      if (error) {
        console.error('Erro detalhado do Supabase:', error);
        throw error;
      }
      return data || [];
    } catch (err) {
      console.error('Falha ao buscar imóveis:', err);
      throw err;
    }
  },

  async create(property: Omit<Property, 'id' | 'createdAt'>): Promise<Property> {
    const { data, error } = await supabase
      .from('properties')
      .insert([property])
      .select()
      .single();

    if (error) {
      console.error('Erro ao criar imóvel:', error);
      throw error;
    }
    return data;
  },

  async update(id: string, updates: Partial<Property>): Promise<Property> {
    const { data, error } = await supabase
      .from('properties')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Erro ao atualizar imóvel:', error);
      throw error;
    }
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erro ao deletar imóvel:', error);
      throw error;
    }
  }
};


import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';

/* 
  CONFIGURAÇÃO PROFISSIONAL
  Em hospedagens como Vercel, você deve configurar estas chaves no painel do site (Environment Variables).
  Isso evita que sua chave de banco de dados fique exposta publicamente.
*/

// Se estiver rodando local ou em produção, ele tenta pegar das variáveis do sistema
const SUPABASE_URL = (window as any)._env_?.SUPABASE_URL || 'https://ufaqisroqfdtnauaokbp.supabase.co'; 
const SUPABASE_ANON_KEY = (window as any)._env_?.SUPABASE_ANON_KEY || 'sb_publishable_q-cZ1Gokny9F6curWzKd9Q_Twn6pTdn';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

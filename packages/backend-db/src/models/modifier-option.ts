import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';
import { BaseModel } from './base';

export class ModifierOption extends BaseModel<'modifier_options'> {
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, 'modifier_options');
  }

  async findByModifier(modifierId: string) {
    const { data, error } = await this.supabase
      .from('modifier_options')
      .select('*')
      .eq('modifier_id', modifierId);

    if (error) throw error;
    return data;
  }

  async findWithModifier(id: string) {
    const { data, error } = await this.supabase
      .from('modifier_options')
      .select(
        `
        *,
        modifier (*)
      `
      )
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }
}

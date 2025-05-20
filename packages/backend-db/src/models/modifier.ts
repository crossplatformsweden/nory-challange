import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';
import { BaseModel } from './base';

export class Modifier extends BaseModel<'modifiers'> {
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, 'modifiers');
  }

  async findByName(name: string) {
    const { data, error } = await this.supabase
      .from('modifiers')
      .select('*')
      .eq('name', name)
      .single();

    if (error) throw error;
    return data;
  }

  async findWithOptions(id: string) {
    const { data, error } = await this.supabase
      .from('modifiers')
      .select(
        `
        *,
        modifier_options (*)
      `
      )
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async findWithMenuItems(id: string) {
    const { data, error } = await this.supabase
      .from('modifiers')
      .select(
        `
        *,
        location_menu_items!enabled_modifier_ids (
          *,
          location (*),
          recipe (*)
        )
      `
      )
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }
}

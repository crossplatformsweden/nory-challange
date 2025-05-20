import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';
import { BaseModel } from './base';

export class Recipe extends BaseModel<'recipes'> {
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, 'recipes');
  }

  async findByName(name: string) {
    const { data, error } = await this.supabase
      .from('recipes')
      .select('*')
      .eq('name', name)
      .single();

    if (error) throw error;
    return data;
  }

  async findWithIngredients(id: string) {
    const { data, error } = await this.supabase
      .from('recipes')
      .select(
        `
        *,
        recipe_ingredient_links (
          *,
          ingredient (*)
        )
      `
      )
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async findWithLocations(id: string) {
    const { data, error } = await this.supabase
      .from('recipes')
      .select(
        `
        *,
        location_menu_items (
          *,
          location (*)
        )
      `
      )
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }
}

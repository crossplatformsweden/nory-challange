import { SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';
import { BaseModel } from './base';

export class LocationMenuItem extends BaseModel<'location_menu_items'> {
  constructor(supabase: SupabaseClient<Database>) {
    super(supabase, 'location_menu_items');
  }

  async findByLocation(locationId: string) {
    const { data, error } = await this.supabase
      .from('location_menu_items')
      .select(
        `
        *,
        recipe (*)
      `
      )
      .eq('location_id', locationId);

    if (error) throw error;
    return data;
  }

  async findByRecipe(recipeId: string) {
    const { data, error } = await this.supabase
      .from('location_menu_items')
      .select(
        `
        *,
        location (*)
      `
      )
      .eq('recipe_id', recipeId);

    if (error) throw error;
    return data;
  }

  async findWithDetails(id: string) {
    const { data, error } = await this.supabase
      .from('location_menu_items')
      .select(
        `
        *,
        location (*),
        recipe (
          *,
          recipe_ingredient_links (
            *,
            ingredient (*)
          )
        ),
        modifiers!enabled_modifier_ids (
          *,
          modifier_options (*)
        )
      `
      )
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }
}
